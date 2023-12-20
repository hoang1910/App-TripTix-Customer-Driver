import React, {useContext, useEffect, useMemo, useState} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from '@rneui/base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import {ConfigContext} from '@navigation';
import {Image} from 'react-native';
import {Images} from '@assets/images';
import {ButtonApp} from '@components/Button';
import {useStore} from '@store/index';
import {formatPrice} from '@utils/price';
import {useToast} from 'react-native-toast-notifications';
import {TAppRoute} from 'navigation/AppNavigator.type';

const SeatStatus = {
  Available: 'AVAILABLE',
  UnAvailable: 'UNAVAILABLE',
};

export const SelectSeat: React.FC = () => {
  const navigation = useNavigation<TAppNavigation<'SelectSeat'>>();
  const {
    route: {
      routeInfo: route,
      setSeatSelected,
      setUserInformation,
      routeRoundInfo,
      seatSelected,
      seatSelectedRound,
    },
    authentication: {userInfo, config},
  } = useStore();
  const maxSeat = config?.maxSeat ?? 5;

  const {fromId, toId, isRound} =
    useRoute<TAppRoute<'SelectSeat'>>().params || {};
  const routeInfo = isRound ? routeRoundInfo : route;
  const [listSelectSeat, setListSelectSeat] = useState([]);
  const [showError, setShowError] = useState(false);
  const toast = useToast();
  console.log(routeInfo);

  useEffect(() => {
    setListSelectSeat((isRound ? seatSelectedRound : seatSelected) ?? []);
  }, [isRound]);

  const onActiveSeat = seat => {
    const seatId = seat.seatName;
    if (listSelectSeat.includes(seatId)) {
      setListSelectSeat(listSelectSeat.filter(item => item !== seatId));
      return;
    }

    if (listSelectSeat.length >= maxSeat) {
      toast.show(`Bạn chỉ được đặt tối đa ${maxSeat} vé`, {
        type: 'danger',
      });
      return;
    }

    setListSelectSeat([...listSelectSeat, seatId]);
  };

  const onDepartureInfo = () => {
    setSeatSelected(listSelectSeat, {isRound});
    const pickUp = routeInfo.listtripStopDTO.find(item => item.index === 0);
    const dropOff = routeInfo.listtripStopDTO.find(item => item.index === 1);
    setUserInformation({
      pickUpId: pickUp.id,
      dropOffId: dropOff.id,
      name: userInfo.fullName,
      phone: userInfo.phone,
    });
    navigation.navigate('DepartureInformation', {
      fromId: isRound ? toId : fromId,
      toId: isRound ? fromId : toId,
    });
  };

  const selectedSeatsText = listSelectSeat?.join(', ');

  const numberFloor = routeInfo.busDTO?.floor;

  const map = useMemo(() => {
    if (numberFloor === 1) {
      return [routeInfo.seatNameBooking];
    }

    const indexCenter = Math.floor(routeInfo.seatNameBooking.length / 2);

    return [
      routeInfo.seatNameBooking.slice(0, indexCenter),
      routeInfo.seatNameBooking.slice(indexCenter),
    ];
  }, [numberFloor]);

  const chunkArray = (array, chunkSize) => {
    return Array.from({length: Math.ceil(array.length / chunkSize)}, (v, i) =>
      array.slice(i * chunkSize, i * chunkSize + chunkSize),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          borderWidth: 1,
          marginHorizontal: 24,
          padding: 16,
          borderRadius: 16,
        }}>
        {map.map((item, index) => (
          <ScrollView
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              marginHorizontal: 4,
              paddingHorizontal: 16,
              paddingVertical: 16,
            }}>
            <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>{`Tầng ${index + 1}`}</Text>
            {chunkArray(item, 2).map((row, index2) => (
              <View
                key={index2}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {row.map((seat, index3) => (
                  <SeatItem
                    key={index3}
                    seatName={seat.seatName}
                    seatAvailable={seat.status == SeatStatus.Available}
                    selected={listSelectSeat?.includes(seat.seatName)}
                    onSeatPress={() => onActiveSeat(seat)}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        ))}
      </View>
      {showError && (
        <Text
          style={{
            color: 'red',
            paddingHorizontal: 15,
          }}>
          Bạn không thể chọn ghế đã được đặt
        </Text>
      )}

      <View
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            backgroundColor: '#DCDCDC',
            borderWidth: 1,
            borderColor: '#A9A9A9',
            borderRadius: 15,
            padding: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'stretch',
            }}>
            <Text style={{marginBottom: 10,fontFamily:'SVN-Gilroy-Medium'}}>Ghế đang chọn</Text>
            <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>Giá vé dự kiến</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Text style={{marginBottom: 10, color: 'orange',fontFamily:'SVN-Gilroy-Medium'}}>
              {selectedSeatsText}
            </Text>
            <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>{formatPrice(listSelectSeat?.length * routeInfo.fare)}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              borderWidth: 1,
              borderColor: 'green',
              backgroundColor: 'white',
              marginRight: 5,
            }}></View>
          <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>Trống</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              borderWidth: 1,
              borderColor: 'green',
              backgroundColor: 'green',
              marginRight: 5,
            }}></View>
          <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>Đang chọn</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              borderWidth: 1,
              borderColor: 'gray',
              backgroundColor: 'black',
              marginRight: 5,
            }}></View>
          <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>Đã đặt</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 15,
          marginBottom: 15,
        }}>
        <ButtonApp
          title="Tiếp tục"
          onPress={onDepartureInfo}
          disabled={listSelectSeat.length === 0}
          color="orange"
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
  },

  buttonContinue: {
    backgroundColor: 'red',
  },
});

const SeatItem = ({
  seatAvailable,
  onSeatPress,
  selected,
  seatName,
}: {
  seatAvailable: boolean;
  onSeatPress: () => void;
  selected: boolean;
  seatName: string;
}) => {
  if (seatAvailable) {
    return (
      <TouchableOpacity onPress={onSeatPress}>
        <View
          style={{
            marginRight: 10,
            maxHeight: 50,
            maxWidth: 50,
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
            borderColor: `${selected ? 'green' : 'white'}`,
            backgroundColor: `${selected ? 'green' : 'transparent'}`,
          }}>
          <Text
            style={{
              color: `${selected ? 'white' : 'green'}`,
            }}>
            {seatName}
          </Text>
          {selected ? (
            <Image
              source={Images.SeatSelected}
              style={{width: 22, height: 20}}
            />
          ) : (
            <Image
              source={Images.SeatAvaiable}
              style={{
                width: 22,
                height: 20,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity disabled>
      <View
        style={{
          marginRight: 10,
          maxHeight: 50,
          maxWidth: 50,
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 10,
          padding: 5,
          borderColor: 'gray',
        }}>
        <Text
          style={{
            color: 'gray',
          }}>
          {seatName}
        </Text>
        <Image source={Images.SeatDisable} style={{width: 22, height: 20}} />
      </View>
    </TouchableOpacity>
  );
};
