import ReactNativeModal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, TextInput, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatPrice} from '@utils/price';
import {Button} from '@rneui/themed';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useToast} from 'react-native-toast-notifications';
import {putCheckin} from '@httpClient/trip.api';
import {StatusApiCall} from '@constants/global';

export const Checkin = ({
  onClose = () => {},
  show,
  idTrip,
  onCheckinSuccess = () => {},
  defaultBooking,
  setGetting,
}: {
  onClose: () => void;
  show: boolean;
  idTrip: number;
  onCheckinSuccess: () => void;
  defaultBooking?: string;
  setGetting?: any;
}) => {
  const [showQRScan, setShowQRScan] = useState(false);
  const [acceptCamera, setAcceptCamera] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [customer, setCustomer] = useState();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    checkPermission();
  }, []);

  // useEffect(() => {
  //   if (defaultBooking) {
  //     setBookingCode(defaultBooking);
  //     setTimeout(() => {
  //       handleCheckin(defaultBooking);
  //     }, 1000);
  //   }
  // }, [defaultBooking]);

  const checkPermission = async () => {
    const status = await BarCodeScanner.getPermissionsAsync();
    setAcceptCamera(status.granted);
  };

  const handlePressQR = async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    if (status === 'granted') {
      setAcceptCamera(status === 'granted');
      setShowQRScan(true);
      return;
    }

    toast.show('Bạn không có quyền truy cập camera', {type: 'error'});
  };

  const handleCheckin = async (defaultCode?: string) => {
    try {
      setLoading(true);
      setGetting(pre => [...pre, defaultBooking]);
      const {data} = await putCheckin(idTrip, bookingCode);
      if (data.status === StatusApiCall.Success) {
        let seats = '';
        data.data?.listTicket.map(item => {
          seats = seats + item.seatName + ', ';
        });
        setCustomer({...data.data, seats});
        onCheckinSuccess();
        return;
      }

      setMessage('Mã đặt vé không chính xác!');
    } catch {
      toast.show('Có lỗi xảy ra', {type: 'error'});
    } finally {
      setGetting(pre => pre.filter(item => item !== defaultBooking));
      setLoading(false);
    }
  };

  const handleScanCodeSuccess = value => {
    setBookingCode(value.data);
    setShowQRScan(false);
    setCustomer(null);
    setMessage('');
  };

  return (
    <ReactNativeModal
      isVisible={show}
      style={{
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        maxHeight: '80%',
      }}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              padding: 4,
              position: 'absolute',
              right: 0,
              top: 0,
              zIndex: 10,
            }}>
            <Icon name="close-circle" size={24} color={'#ccc'} />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: '800', textAlign: 'center'}}>
            Checkin
          </Text>

          <View
            style={{
              marginVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 4,
                flex: 1,
              }}
              placeholder="Nhập mã đặt vé"
              value={bookingCode}
              onChangeText={(value: string) => {
                setBookingCode(value);
                setCustomer(null);
                setMessage('');
              }}
            />
            <TouchableOpacity
              style={{marginLeft: 16}}
              onPress={() => {
                setBookingCode('');
                setMessage('');
                setCustomer(null);
              }}>
              <Icon name="backspace-outline" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 16}} onPress={handlePressQR}>
              <Icon name="qrcode-scan" size={30} />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'red', marginBottom: 16}}>{message}</Text>
          <Button title={'Checkin'} onPress={handleCheckin} loading={loading} />
          <View style={{marginVertical: 16}}>
            <Text style={{fontSize: 18, fontWeight: '800', marginBottom: 16}}>
              Thông tin khách hàng
            </Text>
            <InfoItem label="Họ tên" value={customer?.userSystemDTO.fullName} />
            <InfoItem label="Điểm lên" value={customer?.pickUpPoint} />
            <InfoItem label="Điểm xuống" value={customer?.dropOffPoint} />
            <InfoItem label="Trạng thái" value={customer?.bookingStatus} />
            <InfoItem label="Số lượng vé" value={customer?.numberOfTickets} />
            <InfoItem label="Số ghế ngồi" value={customer?.seats} />
            <InfoItem
              label="Tổng thanh toán"
              value={formatPrice(customer?.totalPrice ?? 0)}
            />
          </View>
        </ScrollView>

        {showQRScan && acceptCamera && (
          <BarCodeScanner
            onBarCodeScanned={handleScanCodeSuccess}
            style={{
              backgroundColor: 'black',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}>
            <TouchableOpacity
              onPress={() => setShowQRScan(false)}
              style={{
                padding: 4,
                position: 'absolute',
                right: 12,
                top: 12,
                zIndex: 10,
              }}>
              <Icon name="close-circle" size={24} color={'#ccc'} />
            </TouchableOpacity>
          </BarCodeScanner>
        )}
      </SafeAreaView>
    </ReactNativeModal>
  );
};

const InfoItem = ({label, value}: {label: string; value: string | number}) => {
  return (
    <View style={{flexDirection: 'row', marginBottom: 4}}>
      <Text style={{flex: 1}}>{label}</Text>
      <Text style={{flex: 2, fontWeight: '600'}}>{value}</Text>
    </View>
  );
};
