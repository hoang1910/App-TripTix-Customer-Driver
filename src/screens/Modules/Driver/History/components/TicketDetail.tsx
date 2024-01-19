import ReactNativeModal from 'react-native-modal';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, View, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatPrice} from '@utils/price';
import {BookingStatusId} from '@constants/route';
import {Steps} from '@components/Steps';
import dayjs from 'dayjs';
import {Button} from '@rneui/themed';
import {Checkin} from './Checkin';
import {
  putStartTrip,
  getTripDetail,
  putConfirmSuccessTrip,
  putCheckout,
} from '@httpClient/trip.api';
import {StatusApiCall} from '@constants/global';
import {ListCustomer} from './ListCustomer';
import {timeStampToUtc} from '@utils/time';
import {useStore} from '@store';
import {ConfigContext} from '@navigation';
import {ListCustomerStation} from './ListCustomerStation';
import {UnfinishedStatus} from '@constants/route';

const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export const TicketDetail = ({
  onClose = () => {},
  show,
  booking = {},
  onReload,
}: {
  onClose: () => void;
  show: boolean;
  booking: Record<string, any> | null;
  onReload: () => void;
}) => {
  const [trip, setTrip] = useState(booking);
  const [loading, setLoading] = useState(false);
  const [isModeTest, setIsModeTest] = useState(false);
  const [stationInfo, setStationInfo] = useState(null);
  const [getting, setGetting] = useState<number[]>([]);

  const steps = booking?.route?.listStationInRoute?.map((item, index) => {
    const customersA = trip?.tickets?.filter(
      customer =>
        (customer.onStation.idStation === item.idStation ||
          customer.offStation.idStation === item.idStation) &&
        customer.status !== BookingStatusId.Cancel,
    );

    const customers = customersA?.map(customer => {
      const seats = booking.tickets
        .filter(seat => seat.idBooking === customer.idBooking)
        .map(seat => seat.seatName);

      return {
        ...customer,
        seats: seats.join(', '),
        type:
          item.idStation === customer.onStation.idStation
            ? 'pickup'
            : 'dropOff',
      };
    });

    const total = customers?.filter(item => item.type === 'dropOff').length;
    const totalPickup = customers?.filter(
      item => item.type === 'pickup',
    ).length;

    return {
      time: item.timeCome,
      title: item.station.name,
      icon: {
        name:
          index === booking?.route?.listStationInRoute.length - 1
            ? 'location-on'
            : 'location-searching',
        color: 'red',
      },
      desc:
        totalPickup > 0
          ? `Có ${totalPickup} khách hàng lên trạm`
          : 'Không có khách hàng nào lên trạm này',
      desc2:
        total > 0
          ? `Có ${total} khách hàng xuống trạm`
          : 'Không có khách hàng nào xuống trạm này',
      customers,
      ...item,
    };
  });

  const stationInfoDetail = steps?.find(
    item => item.station.idStation === stationInfo,
  );
  console.log('hhhh', trip);
  const listSeats = Array.from(
    {length: trip?.vehicle?.capacity},
    (_, index) => `A${index + 1}`,
  );

  const timeStart = dayjs(booking.departureDateLT * 1000, {utc: true});
  const timeEnd = dayjs(booking.endDateLT * 1000, {utc: true});
  const now = dayjs().add(7, 'hour').utc().format();

  const nowToStart = timeStart.diff(now, 'minute');
  const nowToEnd = timeEnd.diff(now, 'minute');

  const [showCheckin, setShowCheckin] = useState({
    show: false,
    defaultBooking: '',
  });
  const [showListCustomer, setShowListCustomer] = useState(false);

  useEffect(() => {
    getTrip();
  }, []);

  const getTrip = async () => {
    try {
      const {data} = await getTripDetail(booking.idTrip);
      if (data.status === StatusApiCall.Success) {
        setTrip(data.data);
      }
    } catch {
    } finally {
      return Promise.resolve();
    }
  };

  const handleReady = async () => {
    try {
      setLoading(true);
      const {data} = await putStartTrip(booking.idTrip);
      if (data.status === StatusApiCall.Success) {
        onReload();
        await getTrip();
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessTrip = async () => {
    try {
      setLoading(true);
      const {data} = await putConfirmSuccessTrip(booking.idTrip);
      if (data.status === StatusApiCall.Success) {
        onReload();
        await getTrip();
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const showButtonSuccess =
    trip.status === BookingStatusId.Run && (nowToEnd <= 30 || isModeTest);

  const showButtonStart =
    trip.status === BookingStatusId.Ready && (nowToStart <= 30 || isModeTest);

  const handlePressPoint = (item: any) => {
    setStationInfo(item);
  };

  const handlePressCheckin = (bookingId: number) => {
    // setStationInfo(null);

    setShowCheckin({
      show: true,
      defaultBooking: bookingId,
      stationId: stationInfoDetail.idStation,
      stationName: stationInfoDetail.title,
    });
  };

  const handleCheckout = async (bookingId: number) => {
    try {
      setGetting(pre => [...pre, bookingId]);
      const {data} = await putCheckout(booking.idTrip, bookingId);
      if (data.status === StatusApiCall.Success) {
        await getTrip();
        return;
      }

      throw new Error();
    } catch {
    } finally {
      setGetting(pre => pre.filter(item => item !== bookingId));
    }
  };
  const totalPrice = trip.tickets?.reduce(
    (acc, currentValue) =>
      currentValue.status !== BookingStatusId.Cancel
        ? currentValue.price + acc
        : acc,
    0,
  );

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
          Thông tin chuyến đi
        </Text>

        <ScrollView style={{flex: 1}}>
          <View style={{marginVertical: 16}}>
            <InfoItem
              label="Chuyến xe"
              value={
                trip.route?.departurePoint + ' - ' + trip.route?.destination
              }
            />
            <InfoItem
              label="Số xe"
              value={trip.vehicle?.licensePlates + ' - ' + trip.vehicle?.name}
            />
            <InfoItem
              label="Số lượng khách"
              value={`${
                trip.tickets?.map(
                  item => item.status !== BookingStatusId.Cancel,
                ).length
              }`}
            />
            <InfoItem label="Tổng tiền" value={formatPrice(totalPrice)} />
            <Text style={{flex: 1}}>{'Danh sách trạm'}</Text>
            <View style={{marginBottom: 4}}>
              <Steps
                data={steps}
                onPressItem={handlePressPoint}
                disable={trip.status !== BookingStatusId.Run}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{paddingVertical: 8, marginBottom: 4}}
            onPress={() => setShowListCustomer(true)}>
            <Text style={{color: 'blue', fontStyle: 'italic'}}>
              Danh sách khách hàng
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 40,
              height: 20,
              marginBottom: 4,
              backgroundColor: isModeTest ? 'red' : 'green',
              borderRadius: 8,
            }}
            onPress={() => setIsModeTest(!isModeTest)}></TouchableOpacity>
        </View>
        {showButtonStart ? (
          <Button title={'Xuất phát'} onPress={handleReady} loading={loading} />
        ) : (
          <Text>
            {trip.status === BookingStatusId.Ready
              ? `Còn ${Math.floor(nowToStart / (24 * 60))} ngày ${Math.floor(
                  (nowToStart % (24 * 60)) / 60,
                )} giờ ${
                  (nowToStart % (24 * 60)) % 60
                } phút có thể bắt đầu chuyến đi`
              : ''}
          </Text>
        )}
        {/* {trip.status === BookingStatusId.Run && (
          <Button
            title={'Checkin'}
            onPress={() => setShowCheckin({show: true, defaultBooking: ''})}
            loading={loading}
          />
        )} */}
        {showButtonSuccess && (
          <Button
            title={'Hoàn thành chuyến'}
            onPress={handleSuccessTrip}
            buttonStyle={{marginTop: 12, backgroundColor: 'orange'}}
            loading={loading}
          />
        )}

        <ListCustomerStation
          show={!!stationInfoDetail}
          onClose={() => setStationInfo(null)}
          stationName={stationInfoDetail?.title}
          customers={stationInfoDetail?.customers}
          onPressCheckin={handlePressCheckin}
          onPressCheckout={handleCheckout}
          loading={getting}
        />
        <Checkin
          show={showCheckin.show}
          onClose={() => setShowCheckin({show: false, defaultBooking: ''})}
          defaultBooking={showCheckin.defaultBooking}
          idTrip={trip.idTrip}
          onCheckinSuccess={getTrip}
          setGetting={setGetting}
          stationId={showCheckin.stationId}
          stationName={showCheckin.stationName}
        />
        <ListCustomer
          show={showListCustomer}
          onClose={() => setShowListCustomer(false)}
          totalSeats={trip.vehicle?.capacity}
          listCustomer={trip.tickets?.filter(
            item => item.status !== BookingStatusId.Cancel,
          )}
          listSeat={listSeats}
        />
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
