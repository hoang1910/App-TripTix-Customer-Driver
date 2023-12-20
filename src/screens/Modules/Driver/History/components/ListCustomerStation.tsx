import ReactNativeModal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatPrice} from '@utils/price';
import {Button} from '@rneui/themed';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useToast} from 'react-native-toast-notifications';
import {putCheckin} from '@httpClient/trip.api';
import {StatusApiCall} from '@constants/global';
import {BookingStatusLabel, BookingStatusId} from '@constants/route';
// import { BookingStatusId } from 'constants/route';

export const ListCustomerStation = ({
  onClose = () => {},
  show,
  stationName,
  customers = [],
  onPressCheckin,
  onPressCheckout,
  loading,
}: {
  onClose: () => void;
  show: boolean;
  stationName: string;
  customers?: any[];
  onPressCheckin: (bookingId: number) => void;
  onPressCheckout: (bookingId: number) => void;
  loading: number[];
}) => {
  const pickup = customers.filter(item => item.type === 'pickup');
  const dropOff = customers.filter(item => item.type === 'dropOff');

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
          {stationName}
        </Text>
        <ScrollView style={{flex: 1}}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 12}}>
              Lên trạm
            </Text>
            {pickup?.map((item, index) => (
              <InfoItem
                key={index}
                name={item.userSystemDTO.fullName}
                desc={`${
                  item.userSystemDTO.phone ?? item.userSystemDTO.email
                } - ${item.seats}`}
                status={item.bookingStatus}
                type="pickup"
                onPressCheckin={onPressCheckin}
                bookingCode={item.bookingCode}
                loading={loading.includes(item.idBooking)}
                bookingId={item.idBooking}
                onPressCheckout={() => {}}
              />
            ))}
            {pickup.length < 1 && (
              <Text style={{color: 'red'}}>Không có khách nào lên trạm</Text>
            )}
          </View>
          <View style={{marginTop: 24}}>
            <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 12}}>
              Xuống trạm
            </Text>
            {dropOff?.map((item, index) => (
              <InfoItem
                key={index}
                name={item.userSystemDTO.fullName}
                desc={`${
                  item.userSystemDTO.phone ?? item.userSystemDTO.email
                } - ${item.seats}`}
                status={item.bookingStatus}
                bookingCode={item.bookingCode}
                onPressCheckout={onPressCheckout}
                bookingId={item.idBooking}
                type="dropOff"
                loading={loading.includes(item.idBooking)}
                onPressCheckin={() => {}}
              />
            ))}
            {dropOff.length < 1 && (
              <Text style={{color: 'red'}}>Không có khách nào xuống trạm</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

const InfoItem = ({
  name,
  desc,
  status,
  onPressCheckin,
  bookingCode,
  type,
  onPressCheckout,
  bookingId,
  loading,
}: {
  name: string;
  desc: string;
  status: string;
  onPressCheckin: (bookingId: number) => void;
  onPressCheckout: (bookingId: number) => void;
  bookingCode: string;
  bookingId: number;
  type: string;
  loading: boolean;
}) => {
  console.log(bookingCode);

  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        marginBottom: 8,
        borderRadius: 6,
        padding: 4,
        borderColor: '#ccc',
      }}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 14, fontWeight: '600'}}>{name}</Text>
        <Text
          style={{
            fontSize: 12,
          }}>
          {desc}
        </Text>
      </View>

      <View>
        {status === BookingStatusId.NoCheckin && type === 'pickup' && (
          <TouchableOpacity
            disabled={loading}
            onPress={() => onPressCheckin(bookingId)}
            style={{
              padding: 6,
              borderRadius: 6,
              backgroundColor: 'orange',
              width: 80,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{color: 'blue'}} numberOfLines={1}>
                Check-in
              </Text>
            )}
          </TouchableOpacity>
        )}
        {status === BookingStatusId.Checkin && type === 'dropOff' && (
          <TouchableOpacity
            disabled={loading}
            onPress={() => onPressCheckout(bookingId)}
            style={{
              padding: 6,
              borderRadius: 6,
              backgroundColor: 'blue',
              width: 80,
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{color: '#fff'}} numberOfLines={1}>
                Check-out
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
