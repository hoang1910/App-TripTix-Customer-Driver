import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, RefreshControl, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {DatePicker} from '@components/DatePicker';
import {StatusArray} from '@constants/route';
import {Select} from '@components/Select';
import {getHistoryDriver} from '@httpClient/trip.api';
import {useStore} from '@store/index';
import {StatusApiCall} from '@constants/global';
import {TicketItem} from '@screens/History/components/TicketItem';
import {TicketDetail} from './components/TicketDetail';
import dayjs from 'dayjs';
import {ScreenLoading} from '@components/Loading';
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

export const HistoryDriver: React.FC = () => {
  const [histories, setHistories] = useState([]);
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [isReload, setReload] = useState(true);
  const [filter, setFilter] = useState({status: null, time: new Date()});
  const {
    authentication: {userInfo},
  } = useStore();

  const data = useMemo(() => {
    if (!filter.status) {
      return histories;
    }

    return histories.filter(item => item.status === filter.status);
  }, [histories, filter.status]);

  useEffect(() => {
    isReload && getHistory();
  }, [isReload]);

  useEffect(() => {
    !isReload && getHistory();
  }, [filter.time]);

  const getHistory = async () => {
    try {
      setLoading(true);
      const time = dayjs(filter.time).set('hour', 7).set('minute', 0).unix();

      const {data} = await getHistoryDriver(userInfo.idUserSystem, time);
      if (data.status === StatusApiCall.Success) {
        setHistories(data.data);
        return;
      }

      throw new Error();
    } catch {
    } finally {
      setLoading(false);
      setReload(false);
    }
  };

  const updateFilter = (data: any) => {
    setFilter(pre => ({...pre, ...data}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '40%', marginRight: 5, marginVertical: 12}}>
          <DatePicker
            value={filter.time}
            onConfirm={date => updateFilter({time: date})}
            placeholder="Ngày"
            renderButton={(title, onPress) => (
              <TouchableOpacity
                onPress={onPress}
                // disabled
                style={{
                  backgroundColor: '#fafafa',
                  borderRadius: 8,
                  paddingVertical: 16,
                }}>
                <Text style={{textAlign: 'center', fontWeight: '700'}}>
                  {title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{width: '40%', marginRight: 5}}>
          <Select
            placeholder="Trạng thái"
            items={StatusArray}
            value={filter.status}
            onSelectItem={e => updateFilter({status: e.value})}
          />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        refreshControl={
          <RefreshControl onRefresh={getHistory} refreshing={loading} />
        }
        renderItem={({item}) => (
          <TicketItem
            ticket={item}
            onPressInfo={(trip: any) => {
              setDetail(trip);
            }}
            timeStart={item.startTimee}
            departurePoint={item.routeDTO.departurePoint}
            destination={item.routeDTO.destination}
            status={item.status}
          />
        )}
        ListEmptyComponent={() =>
          loading ? (
            <ScreenLoading />
          ) : (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('@assets/images/empty.png')}
                style={{width: 200, height: 200}}
              />
              <Text style={{textAlign: 'center'}}>
                Bạn không có chuyến đi nào vào hôm nay
              </Text>
            </View>
          )
        }
      />

      {!!detail && (
        <TicketDetail
          show={!!detail}
          booking={detail}
          onClose={() => setDetail(undefined)}
          onReload={() => setReload(true)}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  ticket: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '100%',
    justifyContent: 'flex-start',
  },
  ticketHeader: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 15,
    borderRightWidth: 1,
    borderStyle: 'dotted',
    paddingRight: 10,
    alignItems: 'center',
    marginRight: 20,
  },
  ticketContent: {
    marginBottom: 10,
  },
  ticketLabel: {
    fontWeight: '400',
    marginBottom: 5,
    color: 'gray',
  },
  ticketValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketValueTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
  },
});
