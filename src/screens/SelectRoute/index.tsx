import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from '@rneui/base';
import {Select} from '@components/Select';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation, TAppRoute} from '@navigation/AppNavigator.type';
import {useRoute} from '@react-navigation/native';
import {getSearchTrips} from '@httpClient/trip.api';
import {useToast} from 'react-native-toast-notifications';
import {StatusApiCall} from '@constants/global';
import {formatPrice} from '@utils/price';
import {
  CarTypeArray,
  CarTypes,
  PriceTypeArray,
  PriceTypeId,
} from '@constants/route';
import {Steps} from '@components/Steps';
import {useStore} from '@store/index';
import {DatePicker} from '@components/DatePicker';
import {timeStampToUtc} from '@utils/time';
import {ScreenLoading} from '@components/Loading';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export const SelectRoute: React.FC = () => {
  const toast = useToast();
  const {
    route: {setRouteInfo, clear},
    authentication: {
      userInfo: {coins},
    },
  } = useStore();
  const {fromId, toId, isRound, dateDefault, priceDefault, typeDefault} =
    useRoute<TAppRoute<'SelectRoute'>>().params;

  const minDate = dateDefault ? new Date(dateDefault * 1000) : new Date();

  const navigation = useNavigation<TAppNavigation<'SelectRoute'>>();
  const [dateSelected, setDateSelected] = useState<Date>(minDate);
  const [dataRoute, setDataRoute] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    price: priceDefault,
    type: typeDefault,
  });

  const dataRouteFilter = useMemo(() => {
    const dataFilterByType = dataRoute.filter(item =>
      filter.type ? item.busDTO.type === filter.type : true,
    );
    if (filter.price) {
      dataFilterByType.sort((a, b) =>
        filter.price === PriceTypeId.Up ? a.fare - b.fare : b.fare - a.fare,
      );
    }

    return dataFilterByType;
  }, [filter, dataRoute]);

  const handleChooseRoute = item => {
    if (!isRound) {
      // clearRound();
      clear();
    }
    setRouteInfo(item, {isRound});

    navigation.navigate(isRound ? 'SelectSeatRoundTrip' : 'SelectSeat', {
      fromId,
      toId,
      isRound,
    });
  };

  useEffect(() => {
    handleGetTrips();
  }, [dateSelected, fromId, toId]);

  const updateFilter = (data: any) => {
    setFilter(pre => ({...pre, ...data}));
  };

  const getIconStep = (length, index) => {
    if (index === 0) {
      return {name: 'my-location', color: 'green'};
    }

    if (index === length - 1) {
      return {name: 'location-on', color: 'orange'};
    }

    return {name: 'location-searching', color: 'orange'};
  };

  const handleGetTrips = async () => {
    try {
      setIsLoading(true);
      const params = {
        fromId,
        toId,
        startTime: dayjs(dateSelected).set('hour', 7).set('minute', 0).unix(),
      };
      const {data} = await getSearchTrips(params);
      if (data.status === StatusApiCall.Success) {
        const routeData = data.data.map((item, index) => {
          return {
            ...item,
            listtripStopDTO: item.listtripStopDTO
              .sort((a, b) => {
                return a.timeComess - b.timeComess;
              })
              .map((stopDTO, index) => {
                return {
                  id: stopDTO.idStation,
                  title: stopDTO.stationDTO.name,
                  type: stopDTO.type,
                  time: timeStampToUtc(stopDTO.timeComess).format('HH:mm'),
                  icon: getIconStep(item.listtripStopDTO.length, index),
                  timeStamp: stopDTO.timeComess,
                  index: index,
                  costsIncurred: stopDTO.costsIncurred,
                  desc: stopDTO.stationDTO.address,
                };
              }),
            unitPrice: item.fare / (item.listtripStopDTO.length - 1),
          };
        });
        setDataRoute(routeData);
        return;
      }

      throw new Error();
    } catch (er) {
      toast.show('Có lỗi xảy ra. Vui lòng thử lại', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.container}></View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingHorizontal: 5,
            
          }}>
          <View style={{width: '30%', marginRight: 5, marginVertical: 12}}>
            <DatePicker
              value={dateSelected}
              onConfirm={date => setDateSelected(date)}
              placeholder="Birthday"
              minimumDate={minDate}
              renderButton={(title, onPress) => (
                <TouchableOpacity
                  onPress={onPress}
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
          <View style={{width: '30%', marginRight: 5}}>
            <Select
              placeholder="Giá"
              items={PriceTypeArray}
              value={filter.price}
              onSelectItem={e => updateFilter({price: e.value})}
            />
          </View>
          <View style={{width: '30%', marginRight: 5}}>
            <Select
              placeholder="Loại xe"
              items={CarTypeArray}
              value={filter.type}
              onSelectItem={e => updateFilter({type: e.value})}
            />
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          flex: 1,
          padding: 0,
          zIndex: -1,
          backgroundColor:'#DEDEDE'
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetTrips} />
        }>
        {dataRouteFilter.map((d, index) => (
          <TouchableOpacity key={index} onPress={() => handleChooseRoute(d)}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                shadowColor: '#000000',
                padding: 10,
                // borderTopWidth: 1,
                borderColor: 'gray',
                backgroundColor: coins >= d.fare ? '#fff' : '#fff7f5',
                borderRadius:20,
                marginBottom:5,
                marginTop:15
                
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontFamily: 'SVN-Gilroy-SemiBold'}}>
                    {`${timeStampToUtc(d.startTimee).format(
                      'HH:mm',
                    )} - ${timeStampToUtc(d.endTimee).format('HH:mm')}`}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    minWidth: 60,
                  }}>
                  <Icon name="battery" size={12} color="gray" />
                  <Icon name="hourglass" size={12} color="gray" />
                  <Icon name="wifi" size={12} color="gray" />
                </View>
              </View>
              {!!d.subTrip && (
                <Text
                  style={{
                    fontStyle: 'italic',
                    color: 'blue',
                    fontSize: 14,
                    marginTop: 4,
                  }}>
                  {d.subTrip}
                </Text>
              )}
              

              <Steps
                data={[
                  d?.listtripStopDTO[0],
                  d?.listtripStopDTO[d?.listtripStopDTO.length - 1],
                ]}
              />
             <View style={{alignItems: 'flex-start'}}>
              <View
                  style={{
                    marginTop: 5,
                    padding: 5,
                    backgroundColor: '#DEDEDE',
                    borderRadius: 15,
                    
                    
                  }}>
                  <Text style={{padding:2, fontSize:15, fontFamily: 'SVN-Gilroy-Medium',color:'black'}}>
                    {formatPrice(d.fare)} - {CarTypes[d.busDTO.type]} - Còn{' '}
                    {d.availableSeat} chỗ trống
                  </Text>
                </View>
              </View>
              {/* <Text
                style={{
                  marginLeft: 35,
                  marginTop: 10,
                  fontSize: 16,
                  color: '#FF8C00',
                }}>
                {d.busDTO.description}
              </Text> */}
            </View>
            {d.fare > coins && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                }}>
                <Text style={{color: 'red'}}>
                  Bạn còn thiếu {formatPrice(d.fare - coins)}
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 4,
                    backgroundColor: 'orange',
                    padding: 4,
                    borderRadius: 4,
                  }}
                  onPress={() => navigation.navigate('TopUp')}>
                  <Text style={{fontWeight: '700', color: '#fff'}}>
                    Nạp tiền
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {dataRouteFilter.length <= 0 ? (
          isLoading ? (
            <ScreenLoading type="searchRoute" />
          ) : (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('@assets/images/notFound1.png')}
                style={{width: 200, height: 200}}
              />
              <Text style={{textAlign: 'center', color: '#ccc'}}>
                Không tìm thấy tuyến đường phù hợp
              </Text>
            </View>
          )
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    flex: 1,
    backgroundColor: '#fff',
  },
});
