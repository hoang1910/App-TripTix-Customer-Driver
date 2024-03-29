import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/MaterialIcons';
import {Text} from '@rneui/base';
import dayjs from 'dayjs';
import {DeviceSize, StatusApiCall} from '@constants/global';
import {TicketDetail} from './TicketDetail';
import {
  BookingStatusId,
  BookingStatusLabel,
  CanCancelStatus,
  CompletedStatus,
  PriceTypeArray,
  StatusArray,
  StatusCustomerArray,
  UnfinishedStatus,
} from '@constants/route';
import {ActivityIndicator} from 'react-native';
import {putCancelBooking, putFeedback} from '@httpClient/trip.api';
import {useStore} from '@store/index';
import {useToast} from 'react-native-toast-notifications';
import {formatPrice} from '@utils/price';
import {PopupCancel} from './PopupCancel';
import {PopupFeedback} from './PopupFeedback';
import {set} from 'mobx';
import {TicketItem} from './TicketItem';
import {Select} from '@components/Select';
import {ConfigContext} from '@navigation';
import {ScreenLoading} from '@components/Loading';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export const getColorStatus = (status: string) => {
  switch (status) {
    case BookingStatusId.Cancel:
      return '#EE0000';
    case BookingStatusId.Paid:
    case BookingStatusId.Ready:
    case BookingStatusId.Checkin:
    case BookingStatusId.Ready:
      return 'orange';
    case BookingStatusId.NoCheckin:
      return 'blue';
    case BookingStatusId.Run:
      return 'blue';
    case BookingStatusId.Finish:
      return 'green';
    default:
      return 'black';
  }
};

export const getStatusLabel = (status: string) => {
  const info = StatusArray.find(item => item.value === status);

  return info.label;
};

export default function TichketHistory({
  listTicket,
  type,
  onRefresh,
  isLoading,
}) {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState<Record<string, any> | null>(null);
  const [canceling, setCanceling] = useState<string | null>(null);
  const [cancel, setCancel] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const {
    authentication: {userInfo, synchUserInfo, config},
  } = useStore();
  const {hourCanNotCancel} = {hourCanNotCancel: config?.hourCanNotCancel ?? 1};
  const toast = useToast();
  const dataFilter = useMemo(() => {
    return data.filter(item => {
      return statusFilter ? item.status === statusFilter : true;
    });
  }, [data, statusFilter]);
  console.log(dataFilter);
  useEffect(() => {
    if (listTicket) {
      if (type == 'history') {
        const history = listTicket.filter(item => {
          return CompletedStatus.includes(item.status);
        });
        // .sort((a, b) => {
        //   return b.updatedDate - a.updatedDate;
        // });
        setData(history);
      }
      if (type == 'perpare') {
        const perpare = listTicket.filter(item =>
          UnfinishedStatus.includes(item.status),
        );
        // .sort((a, b) => {
        //   return a.trip?.departureDate - b.trip?.departureDate;
        // });
        setData(perpare);
      }
    }
  }, [listTicket]);

  const handleCancelBooking = async (booking: any) => {
    try {
      setCancel(null);
      setCanceling(booking.bookingCode);
      const now = dayjs().add(7, 'hour').utc().format();
      const diff = dayjs(booking.trip?.departureDate * 1000).diff(now, 'hour');
      console.log(diff < hourCanNotCancel);

      if (diff < hourCanNotCancel) {
        toast.show(
          `Xin lỗi, bạn không thể huỷ chuyến đi này do thời điểm đến khi xe chạy chỉ còn dưới ${hourCanNotCancel} tiếng`,
          {type: 'error'},
        );
        return;
      }
      const {data} = await putCancelBooking(booking.idTicket);

      if (data.status === StatusApiCall.Success) {
        onRefresh();
        synchUserInfo();
      }
    } catch (e) {
    } finally {
      setCanceling(null);
    }
  };

  const handleFeedback = async (idTicket: number, star: number) => {
    setFeedback(null);
    const {data} = await putFeedback(idTicket, star);

    if (data.status === StatusApiCall.Success) {
      toast.show(
        `đánh giá sao thành công`,
      );
      onRefresh();
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        width: DeviceSize.width,
        flexDirection: 'column',
        padding: 10,
        flex: 1,
      }}>
      {type === 'history' && (
        <Select
          placeholder="Lọc theo trạng thái"
          items={StatusCustomerArray}
          value={statusFilter}
          onSelectItem={e => setStatusFilter(e.value)}
        />
      )}
      {dataFilter.length === 0 ? (
        isLoading ? (
          <ScreenLoading />
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Icon
              name={`${
                type == 'history' ? 'ticket-confirmation-outline' : 'ticket'
              }`}
              size={80}
              style={{color: 'red'}}
            />
            <Text style={{color: 'orange'}}>
              {statusFilter ? (
                <Text style={{color: 'orange'}}>
                  Bạn không có chuyến đi nào ở trạng thái{' '}
                  <Text style={{color: 'red'}}>
                    {BookingStatusLabel[statusFilter]}
                  </Text>
                </Text>
              ) : (
                'Lịch sử vé trống'
              )}
            </Text>
          </View>
        )
      ) : (
        <ScrollView style={{flex: 1, paddingBottom: 120, width: '100%'}}>
          {dataFilter &&
            dataFilter.map((ticket, index) => (
              <TicketItem
                key={index}
                ticket={ticket}
                onPressCancel={(t: any) => setCancel(t)}
                onPressFeedback={(t: any) => setFeedback(t)}
                onPressInfo={(t: any) => setDetail(t)}
                canceling={canceling}
                timeStart={ticket.trip.departureDate}
                departurePoint={ticket.onStation.name}
                destination={ticket.offStation.name}
                status={ticket.status}
              />
            ))}
        </ScrollView>
      )}
      {!!detail && (
        <TicketDetail booking={detail} show onClose={() => setDetail(null)} />
      )}
      {!!cancel && (
        <PopupCancel
          ticket={cancel}
          show
          onConfirm={() => handleCancelBooking(cancel)}
          onClose={() => setCancel(null)}
        />
      )}
      {feedback && (
        <PopupFeedback
          show={true}
          onConfirm={handleFeedback}
          onClose={() => setFeedback(false)}
          ticket={feedback}
          defaultVa={feedback.star}
        />
      )}
    </View>
  );
}
