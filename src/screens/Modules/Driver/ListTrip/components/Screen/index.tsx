import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, RefreshControl, Image} from 'react-native';
import {InfoItem} from '@screens/History/components/TicketItem';
import {
  getHistoryTripDriver,
  getHistoryRoleDriver,
  getReadyRoleDriver,
} from '@httpClient/trip.api';
import {useStore} from '@store';
import {BookingStatusId} from '@constants/route';
import {StatusApiCall} from '@constants/global';
import dayjs from 'dayjs';
import {BookingStatusLabel} from '@constants/route';
import {getColorStatus} from '@screens/History/components/TichketHistory';
import {ScreenLoading} from '@components/Loading';
import {timeStampToUtc} from '@utils/time';

type TScreenProps = {type: string};

type TConfig = {
  page?: number;
  totalPage?: number;
  pageSize?: number;
  time?: number | null;
  status?: string | null;
};

export const Screen: React.FC<TScreenProps> = ({type}) => {
  const {
    authentication: {userInfo},
  } = useStore();
  const [configs, setConfigs] = useState<TConfig>({
    page: 1,
    totalPage: 1,
    pageSize: 10,
    time: null,
    status: null,
  });
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const dataShow = useMemo(() => {
    const list = groupByDay(data);
    const hihi = list.sort((a, b) => {
      const timeStampA = a.timestamp;
      const timeStampB = b.timestamp;
      return type === 'finished'
        ? timeStampB - timeStampA
        : timeStampA - timeStampB;
    });
    return hihi;
  }, [data]);

  useEffect(() => {
    getData();
  }, [configs.page]);

  const changeConfig = (value: TConfig) => {
    setConfigs(oldValue => ({...oldValue, ...value}));
  };

  const getData = async () => {
    try {
      setLoading(true);
      const {data} =
        type === 'finished'
          ? await getHistoryRoleDriver(
              userInfo.idUserSystem,
              configs.page,
              configs.pageSize,
            )
          : await getReadyRoleDriver(
              userInfo.idUserSystem,
              configs.page,
              configs.pageSize,
            );

      if (data.status === StatusApiCall.Success) {
        changeConfig({totalPage: data.totalPage});

        const list = data.data.map(item => ({
          ...item,
          day: timeStampToUtc(item.startTimee).format('DD/MM/YYYY'),
          timestamp: timeStampToUtc(item.startTimee)
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .unix(),
        }));

        setData(pre => [...pre, ...list]);
      }
    } catch {
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  function groupByDay(arr: any[]) {
    const object = arr.reduce((acc, obj) => {
      const key = obj.day;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);

      return acc;
    }, {});

    const data = Object.keys(object).map(item => ({
      day: item,
      data: object[item],
      timestamp: object[item][0]?.timestamp,
    }));

    return data;
  }

  const handleEndReached = () => {
    // Khi người dùng vuốt đến cuối cùng, tăng trang lên 1
    if (!loading && !refresh && configs.page < configs.totalPage) {
      changeConfig({page: (configs.page ?? 0) + 1});
    }
  };

  const handleRefresh = () => {
    setRefresh(true);
    changeConfig({page: 1});
    setData([]);

    setTimeout(() => {
      getData();
    }, 500);
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={{marginBottom: 24}}>
        <Text style={{fontWeight: '800', marginLeft: 16, marginBottom: 8}}>
          {item.day}
        </Text>
        <View style={{backgroundColor: '#fff'}}>
          {item.data?.map((item, index) => (
            <View
              key={index}
              style={{
                borderBottomWidth: 1,
                borderColor: '#ccc',
                padding: 16,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderStyle: 'dotted',
                  alignItems: 'center',
                }}>
                <Text>Giờ xuất bến</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
                  {timeStampToUtc(item.startTimee).format('HH:mm')}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    marginTop: 8,
                    color: getColorStatus(item.status),
                  }}>
                  {BookingStatusLabel[item.status]}
                </Text>
              </View>
              <View style={{flex: 2, paddingLeft: 8}}>
                <InfoItem label="Xe" value={item.busDTO.name} />
                <InfoItem
                  icon={{name: 'my-location', color: 'green'}}
                  value={item.routeDTO.departurePoint}
                />
                <InfoItem
                  icon={{name: 'location-on', color: 'orange'}}
                  value={item.routeDTO.destination}
                />
                <InfoItem
                  label="Tổng số khách"
                  value={`${item.listBooking.length}/${item.busDTO.capacity}`}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, paddingTop: 16}}>
      <FlatList
        data={dataShow}
        keyExtractor={item => item.day}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={() =>
          refresh ? (
            <ScreenLoading />
          ) : (
            <View style={{marginTop: 100}}>
              <Image
                source={require('@assets/images/empty-bus.png')}
                style={{width: '100%', height: 150, resizeMode: 'contain'}}
              />
              <Text style={{marginTop: 24, textAlign: 'center'}}>
                {type === 'finished'
                  ? 'Bạn chưa có chuyến đi nào đã hoàn thành'
                  : 'Bạn không có chuyến đi nào sắp tới'}
              </Text>
            </View>
          )
        }
      />
      {loading && (
        <View
          style={{position: 'absolute', bottom: 0, backgroundColor: '#ccc'}}>
          <Text>Đang tải thêm...</Text>
        </View>
      )}
    </View>
  );
};
