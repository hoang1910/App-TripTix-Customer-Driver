import {Button} from '@rneui/themed';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {Header} from '@components/Header';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import {Images} from '@assets/images';
import {ScrollView} from 'react-native';
import {useStore} from '@store/index';
import {Image} from 'react-native';

const Seats = [
  {id: 1, name: 'A1', avaiable: 0, selected: false},
  {id: 2, name: 'A2', avaiable: 0, selected: false},
  {id: 3, name: 'A3', avaiable: 0, selected: false},
  {id: 4, name: 'A4', avaiable: 0, selected: false},
  {id: 5, name: 'A5', avaiable: 1, selected: false, price: 1000},
  {id: 6, name: 'A6', avaiable: 1, selected: false, price: 1000},
  {id: 7, name: 'A7', avaiable: 1, selected: false, price: 1000},
  {id: 8, name: 'A8', avaiable: 1, selected: false, price: 1000},
  {id: 9, name: 'A9', avaiable: 1, selected: false, price: 1000},
  {id: 10, name: 'A10', avaiable: 1, selected: false, price: 1000},
  {id: 11, name: 'A11', avaiable: 1, selected: false, price: 1000},
  {id: 12, name: 'A12', avaiable: 1, selected: false, price: 1000},
  {id: 13, name: 'A13', avaiable: 1, selected: false, price: 1000},
];

export const DetailRoute: React.FC = () => {
  const navigation = useNavigation<TAppNavigation<'DetailRoute'>>();
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [data, setData] = useState([]);
  const [listSelectSeat, setListSelectSeat] = useState([]);

  const {
    route: {routeInfo, setSeatSelected},
  } = useStore();
  const [listSeat, setListSeat] = useState(Seats);
  useEffect(() => {
    handleGenSeats();
    setListSeat(Seats);
  }, []);

  const handleGenSeats = () => {
    const array = [...Array(routeInfo?.busDTO?.capacity).keys()];
    const seatBooked = routeInfo?.seatNameBooking;

    // setListSeat();
    //   array.map((_, index) => {
    //     const name = `A${index < 9 ? 0 : ""}${index + 1}`;
    //     return { id: name, name, avaiable: !seatBooked.includes(name) };
    //   })
  };

  const handleTurnBack = () => {
    navigation.navigate('HistoryDriver');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header color="#6495ED">
        <View style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleTurnBack}>
            <Icon
              size={18}
              style={{color: 'white', marginRight: 100}}
              name="arrowleft"
            />
          </TouchableOpacity>

          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            Chi tiết chuyến đi
          </Text>
        </View>
      </Header>

      <ScrollView style={{paddingBottom: 120, width: '100%', padding: 10}}>
        <Text
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Thông tin chuyến xe
        </Text>
        <Text
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: 18,
            marginTop: 20,
          }}>
          Chuyến: SG- Datlat
        </Text>
        <Text
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: 18,
            marginTop: 10,
          }}>
          Số xe: 038888
        </Text>
        <Text
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: 18,
            marginTop: 10,
          }}>
          Danh sách ghế:{' '}
        </Text>
        <View
          style={{
            paddingHorizontal: 10,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            flexDirection: 'row',
            borderBottomColor: 'transparent',
            flex: 1,
          }}>
          {listSeat &&
            listSeat.map(seat => {
              if (seat.avaiable == 1) {
                return (
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
                      borderColor: `${
                        listSelectSeat.includes(seat.id) ? 'green' : 'white'
                      }`,
                      backgroundColor: `${
                        listSelectSeat.includes(seat.id)
                          ? 'green'
                          : 'transparent'
                      }`,
                    }}>
                    <Text
                      style={{
                        color: `${
                          listSelectSeat.includes(seat.id) ? 'white' : 'green'
                        }`,
                      }}>
                      {seat.name}
                    </Text>
                    {listSelectSeat.includes(seat.id) ? (
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
                      {seat.name}
                    </Text>
                    <Image
                      source={Images.SeatDisable}
                      style={{width: 22, height: 20}}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});
