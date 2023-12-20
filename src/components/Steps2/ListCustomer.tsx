import React, {useEffect, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';
import {BookingStatusId} from '@constants/route';

export const ListCustomer: React.FC<{
  show: boolean;
  onClose: () => void;
  totalSeats: number;
  listCustomer: Record<string, any>[];
  listSeat: Record<string, any>[];
}> = ({show, onClose, totalSeats, listCustomer, listSeat}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const l = listSeat.map(seat => {
      const seatName = seat.seatName;
      const customer = listCustomer.find(item => {
        return item.idBooking === seat.idBooking;
      });

      return [
        seatName,
        {name: customer?.userSystemDTO.fullName, id: seat.idBooking},
        customer?.userSystemDTO.phone,
        customer
          ? customer.bookingStatus === BookingStatusId.Checkin
            ? true
            : false
          : null,
      ];
    });

    setList(l);
  }, [listCustomer]);

  const alert = (id: any) => {
    const customer = listCustomer.find(item => {
      return item.idBooking === id;
    });

    Alert.alert(
      customer?.userSystemDTO.fullName,
      `Trạm đón: ${customer.pickUpPoint}\nTrạm xuống: ${customer.dropOffPoint}`,
    );
  };

  const element = (data: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          alert(data?.id);
        }}>
        <View
          style={{
            width: '100%',
          }}>
          <Text>{data?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const flex = (index: number) => {
    switch (index) {
      case 0:
        return 1;
      case 1:
        return 3;
      case 2:
        return 3;
      case 3:
        return 2;
    }
  };

  const getCellValue = (index: number, value: any) => {
    if (value === null) {
      return '';
    }
    switch (index) {
      case 1:
        return element(value);
      case 3:
        return value ? 'v' : 'x';
      default:
        return value;
    }
  };

  return (
    <ReactNativeModal isVisible={show} style={{margin: 0}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, padding: 16}}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              padding: 4,
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 10,
            }}>
            <Icon name="close-circle" size={24} color={'#ccc'} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '900',
              textAlign: 'center',
              marginBottom: 24,
            }}>
            Danh sách khách hàng
          </Text>
          <Table
            borderStyle={{
              borderWidth: 2,
              borderColor: '#c8e1ff',
            }}>
            <Row
              data={['Ghế', 'Khách hàng', 'SDT', 'Checkin']}
              flexArr={[1, 3, 3, 2]}
              style={{height: 40, backgroundColor: '#f1f8ff'}}
              textStyle={{textAlign: 'center'}}
            />
          </Table>
          <ScrollView style={{flex: 1}}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              {list.map((item: any[], index) => (
                <TableWrapper
                  key={index}
                  flexArr={[1, 3, 3, 2]}
                  style={{
                    flexDirection: 'row',
                    backgroundColor:
                      item[3] === null
                        ? '#fff'
                        : item[3]
                        ? '#baf084'
                        : '#f0a484',
                  }}>
                  {item.map((cellData, cellIndex) => (
                    <Cell
                      style={{flex: flex(cellIndex)}}
                      key={cellIndex}
                      data={getCellValue(cellIndex, cellData)}
                      textStyle={{margin: 6}}
                    />
                  ))}
                </TableWrapper>
              ))}
            </Table>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ReactNativeModal>
  );
};
