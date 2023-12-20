import {ButtonApp} from '@components/Button';
import {ChooseProvince} from '@components/ChooseProvince';
import {Steps} from '@components/Steps';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import {KeyboardAwareScrollView} from '@pietile-native-kit/keyboard-aware-scrollview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Chip, Input, Text} from '@rneui/themed';
import {useStore} from '@store/index';
import {formatPrice} from '@utils/price';
import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useForm, Controller} from 'react-hook-form';
import {CarTypes} from '@constants/route';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {TAppRoute} from '@navigation/AppNavigator.type';
import {EAccountType} from '@enums';
import {timeStampToUtc} from '@utils/time';
import {observer} from 'mobx-react-lite';

const schema = yup.object().shape({
  isRound: yup.boolean(),
  pickUpId: yup.string().required('Vui lòng chọn điểm đón'),
  dropOffId: yup.string().required('Vui lòng chọn điểm đến'),
  pickUpIdRound: yup.string().when('isRound', (value, scheme) => {
    console.log('000', value);

    return value[0] ? scheme.required('Vui lòng chọn điểm đón') : scheme;
  }),
  dropOffIdRound: yup.string().when('isRound', (value, scheme) => {
    return value[0] ? scheme.required('Vui lòng chọn điểm đến') : scheme;
  }),
  name: yup
    .string()
    .required('Vui lòng nhập họ tên')
    .min(4, 'Họ tên tối thiểu 4 ký tự'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại phải chứa 10 ký tự')
    .max(10, 'Số điện thoại phải chứa 10 ký tự'),
});

export const DepartureInformation: React.FC = observer(() => {
  const navigation = useNavigation<TAppNavigation<'DepartureInformation'>>();
  const {
    authentication: {userInfo},
    route: {
      routeInfo,
      seatSelected,
      setUserInformation,
      routeRoundInfo,
      seatSelectedRound,
      clearRound,
    },
  } = useStore();

  const {fromId, toId} =
    useRoute<TAppRoute<'DepartureInformation'>>().params ?? {};
  const {
    control,
    formState: {isValid, errors},
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      pickUpId: '',
      dropOffId: '',
      name: userInfo.fullName,
      phone: userInfo.phone,
      pickUpIdRound: '',
      dropOffIdRound: '',
      isRound: false,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [pickUpId, setPickUpId] = useState('');
  const [dropOffId, setDropOffId] = useState('');
  const [pickUpIdRound, setPickUpIdRound] = useState('');
  const [dropOffIdRound, setDropOffIdRound] = useState('');

  const handleConfirm = dataForm => {
    setUserInformation(dataForm);
    navigation.navigate('TicketInformation', {fromId, toId});
  };

  const isSubTrip = routeInfo.subTrip;
  const listLength = routeInfo.listtripStopDTO.length;
  const isSubTripRound = routeRoundInfo?.subTrip;
  const listLengthRound = routeRoundInfo?.listtripStopDTO.length;
  console.log("hahaha",listLength);
  const listPickup = useMemo(() => {
    const indexDropOff = routeInfo.listtripStopDTO.findIndex(
      item => item.id === dropOffId,
    );
    const conditionIndex = indexDropOff >= 0 ? indexDropOff : listLength - 1;

    return routeInfo.listtripStopDTO.filter(item =>
      isSubTrip || true ? item.index < conditionIndex : item.type === 'PICKUP',
    );
  }, [dropOffId]);
  const listPickupRound = useMemo(() => {
    if (routeRoundInfo) {
      const indexDropOff = routeRoundInfo.listtripStopDTO.findIndex(
        item => item.id === dropOffIdRound,
      );
      const conditionIndex =
        indexDropOff >= 0 ? indexDropOff : listLengthRound - 1;

      return routeRoundInfo.listtripStopDTO.filter(item =>
        isSubTripRound || true
          ? item.index < conditionIndex
          : item.type === 'PICKUP',
      );
    }

    return [];
  }, [dropOffIdRound, routeRoundInfo]);

  const listDropOff = useMemo(() => {
    const indexPickup =
      routeInfo.listtripStopDTO.findIndex(item => item.id === pickUpId) || 0;

    const conditionIndex = indexPickup >= 0 ? indexPickup : 0;

    return routeInfo.listtripStopDTO.filter(item =>
      isSubTrip || true ? item.index > conditionIndex : item.type === 'DROPOFF',
    );
  }, [pickUpId]);
  const listDropOffRound = useMemo(() => {
    if (routeRoundInfo) {
      const indexPickup =
        routeRoundInfo.listtripStopDTO.findIndex(
          item => item.id === pickUpIdRound,
        ) || 0;

      const conditionIndex = indexPickup >= 0 ? indexPickup : 0;

      return routeRoundInfo.listtripStopDTO.filter(item =>
        isSubTripRound || true
          ? item.index > conditionIndex
          : item.type === 'DROPOFF',
      );
    }

    return [];
  }, [pickUpIdRound, routeRoundInfo]);

  const handleRoundPress = () => {
    setValue('isRound', true);
    navigation.navigate('SelectRouteRoundTrip', {
      fromId: toId,
      toId: fromId,
      isRound: true,
      dateDefault: routeInfo.endTimee,
    });
  };

  const handleCancelRound = () => {
    setValue('isRound', false);
    setValue('dropOffIdRound', '');
    setValue('dropOffIdRound', '');
    clearRound();
  };

  const handleChooseSeat = () => {
    navigation.navigate('SelectSeat', {fromId, toId, isRound: false});
  };
  const handleChooseSeatRound = () => {
    navigation.navigate('SelectSeatRoundTrip', {
      fromId: toId,
      toId: fromId,
      isRound: true,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f7f7f7'}}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        {/* <View style={styles.box}>
          <Chip
            title={`${formatPrice(routeInfo.fare)} - ${
              CarTypes[routeInfo.busDTO.type]
            }`}
            containerStyle={{flexDirection: 'row'}}
            buttonStyle={{backgroundColor: 'black'}}
            titleStyle={{fontFamily: 'SVN-Gilroy-Bold', color: 'orange'}}
          />
        </View> */}
        <Box
          title="Chiều đi"
          time={timeStampToUtc(routeInfo?.startTimee).format(
            'HH:mm - DD/MM/YYYY',
          )}
          seats={seatSelected.join(', ')}
          control={control}
          listPickup={listPickup}
          onCallbackSelectPickup={(value: string) => setPickUpId(value)}
          onCallbackSelectDropOff={(value: string) => setDropOffId(value)}
          listDropOff={listDropOff}
          pickupName={'pickUpId'}
          dropOffName={'dropOffId'}
          steps={routeInfo.listtripStopDTO}
          onChooseAgain={handleChooseSeat}
        />
        {!!routeRoundInfo ? (
          <Box
            title="Chiều về"
            time={timeStampToUtc(routeRoundInfo?.startTimee).format(
              'HH:mm - DD/MM/YYYY',
            )}
            seats={seatSelectedRound?.join(', ')}
            control={control}
            listPickup={listPickupRound}
            onCallbackSelectPickup={(value: string) => setPickUpIdRound(value)}
            onCallbackSelectDropOff={(value: string) =>
              setDropOffIdRound(value)
            }
            listDropOff={listDropOffRound}
            pickupName={'pickUpIdRound'}
            dropOffName={'dropOffIdRound'}
            onCancel={handleCancelRound}
            steps={routeRoundInfo.listtripStopDTO}
            onChooseAgain={handleChooseSeatRound}
          />
        ) : (
          <View style={styles.box}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                backgroundColor: 'orange',
                paddingVertical: 6,
                borderRadius: 12,
              }}
              onPress={handleRoundPress}>
              <Icon name="plus" color={'#fff'} size={20} />
              <Text style={{color: '#fff', fontWeight: '800'}}>Khứ hồi</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.box}>
          <Controller
            control={control}
            name="name"
            render={({field: {value, onChange}}) => (
              <Input
                label={<Text style={{fontFamily: 'SVN-Gilroy-SemiBold'}}>Thông tin khách</Text>} 
                value={value}
                onChangeText={onChange}
                inputStyle={{fontSize: 16,fontFamily:'SVN-Gilroy-Bold'}}
                editable={userInfo.role === EAccountType.Staff}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                inputStyle={{fontSize: 16}}
                editable={userInfo.role === EAccountType.Staff}
                style={{fontFamily:'SVN-Gilroy-Bold'}}
              />
            )}
          />
        </View>
        <View style={[styles.box, {flex: 1}]} />
      </KeyboardAwareScrollView>
      <ButtonApp
        title="Tiếp tục"
        onPress={handleSubmit(handleConfirm)}
        buttonStyle={{
          backgroundColor: 'orange',
          margin: 10,
        }}
        titleStyle={{color:'black'}}
        disabled={!isValid}
      />
    </SafeAreaView>
  );
});

type TBox = {
  title: string;
  time: string;
  seats: string;
  control: any;
  listPickup: any;
  onCallbackSelectPickup: (value: string) => void;
  onCallbackSelectDropOff: (value: string) => void;
  listDropOff: any;
  pickupName: string;
  dropOffName: string;
  onCancel?: () => void;
  steps: any[];
  onChooseAgain: () => void;
};
const Box: React.FC<TBox> = ({
  title,
  time,
  seats,
  control,
  listDropOff,
  listPickup,
  onCallbackSelectDropOff,
  onCallbackSelectPickup,
  pickupName,
  dropOffName,
  onCancel,
  steps = [],
  onChooseAgain,
}) => {
  return (
    <View style={styles.box}>
      {!!onCancel && (
        <TouchableOpacity
          onPress={onCancel}
          style={{
            position: 'absolute',
            right: 24,
            top: 12,
            padding: 4,
            zIndex: 10,
          }}>
          <Text style={{color: 'red'}}>Huỷ</Text>
        </TouchableOpacity>
      )}
       <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                backgroundColor: '#DEDEDE',
                paddingVertical: 6,
                borderRadius: 20,
              }}>
              <Text style={{color: 'black', fontFamily: 'SVN-Gilroy-SemiBold',fontSize:15}}>{title}</Text>
            </View>
          </View>
      <Steps data={steps} showPrice />
      <View style={{flexDirection: 'row', marginTop: 12}}>
        <View style={{flex: 1, marginRight: 4}}>
          <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>Thời gian</Text>
          <Text style={styles.value}>{time}</Text>
        </View>
        <View style={{flex: 1, marginLeft: 4}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>Số ghế đã chọn</Text>
            <TouchableOpacity onPress={onChooseAgain}>
              <Text style={{fontSize: 10, color: 'orange'}}>Chọn lại</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.value}>{seats}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 12}}>
        <View style={{flex: 1, marginRight: 4}}>
          <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>Điểm đón: (*)</Text>
          <Controller
            control={control}
            name={pickupName}
            render={({field: {value, onChange}}) => (
              <ChooseProvince
                title="Chọn điểm đón"
                placeholder="Vui lòng chọn điểm đón"
                data={listPickup}
                onChange={(value: string) => {
                  onChange(value);
                  onCallbackSelectPickup(value);
                }}
                value={value}
                renderButton={(title, onPress) => (
                  <TouchableOpacity
                    onPress={onPress}
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      padding: 12,
                      marginTop: 8,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{flex: 1, color: title ? 'black' : '#ccc'}}
                      numberOfLines={1}>
                      {title ?? 'Vui lòng chọn điểm đón'}
                    </Text>
                    <Icon name="chevron-down" size={20} />
                  </TouchableOpacity>
                )}
              />
            )}
          />
        </View>
        <View style={{flex: 1, marginLeft: 4}}>
          <Text style={{fontFamily:'SVN-Gilroy-Medium'}}>Điểm đến: (*)</Text>
          <Controller
            control={control}
            name={dropOffName}
            render={({field: {value, onChange}}) => (
              <ChooseProvince
                title="Chọn điểm đến"
                placeholder="Vui lòng chọn điểm đến"
                data={listDropOff}
                onChange={(value: string) => {
                  onChange(value);
                  onCallbackSelectDropOff(value);
                }}
                value={value}
                renderButton={(title, onPress) => (
                  <TouchableOpacity
                    onPress={onPress}
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      padding: 12,
                      marginTop: 8,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{flex: 1, color: title ? 'black' : '#ccc'}}
                      numberOfLines={1}>
                      {title ?? 'Vui lòng chọn điểm đến'}
                    </Text>
                    <Icon name="chevron-down" size={20} />
                  </TouchableOpacity>
                )}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {padding: 16, backgroundColor: '#fff', marginBottom: 16},
  value: {fontSize: 16, fontFamily: 'SVN-Gilroy-Bold', lineHeight: 24},
});
