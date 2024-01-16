import {ButtonApp} from '@components/Button';
import {ChooseProvince} from '@components/ChooseProvince';
import {Steps} from '@components/Steps';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import {KeyboardAwareScrollView} from '@pietile-native-kit/keyboard-aware-scrollview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Chip, Input, Text} from '@rneui/themed';
import {useStore} from '@store/index';
import {formatPrice} from '@utils/price';
import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {CarTypes} from '@constants/route';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {TAppRoute} from '@navigation/AppNavigator.type';
import {EAccountType} from '@enums';
import {timeStampToUtc} from '@utils/time';
import {observer} from 'mobx-react-lite';

const schema = yup.object().shape({
  // isRound: yup.boolean(),
  // pickUpId: yup.string().required('Vui lòng chọn điểm đón'),
  // dropOffId: yup.string().required('Vui lòng chọn điểm đến'),
  // pickUpIdRound: yup.string().when('isRound', (value, scheme) => {
  //   return value[0] ? scheme.required('Vui lòng chọn điểm đón') : scheme;
  // }),
  // dropOffIdRound: yup.string().when('isRound', (value, scheme) => {
  //   return value[0] ? scheme.required('Vui lòng chọn điểm đến') : scheme;
  // }),
  name: yup
    .string()
    .required('Vui lòng nhập họ tên')
    .min(4, 'Họ tên tối thiểu 4 ký tự'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại phải chứa 10 ký tự')
    .max(10, 'Số điện thoại phải chứa 10 ký tự'),
  datas: yup.array().of(
    yup.object().shape({
      pickUpId: yup.string().required('Vui lòng chọn điểm đón'),
      dropOffId: yup.string().required('Vui lòng chọn điểm đến'),
      seats: yup.array().required('Vui lòng chọn ghế').min(1),
    }),
  ),
});

export const DepartureInformation: React.FC = observer(() => {
  const navigation = useNavigation<TAppNavigation<'DepartureInformation'>>();
  const {
    authentication: {userInfo, config},
    route: {
      routeInfo,
      seatSelected,
      setUserInformation,
      routeRoundInfo,
      seatSelectedRound,
      clearRound,
      setSeatSelected,
    },
  } = useStore();

  const maxSeat = config?.maxSeat ?? 5;

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
      // pickUpId: '',
      // dropOffId: '',
      name: userInfo.fullName,
      phone: userInfo.phone,
      // pickUpIdRound: '',
      // dropOffIdRound: '',
      // isRound: false,
      datas: [{pickUpId: '', dropOffId: '', seats: []}],
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {fields, append, remove, update} = useFieldArray({
    control,
    name: 'datas',
  });

  const [pickUpId, setPickUpId] = useState('');
  const [dropOffId, setDropOffId] = useState('');
  const [pickUpIdRound, setPickUpIdRound] = useState('');
  const [dropOffIdRound, setDropOffIdRound] = useState('');

  useEffect(() => {
    setSeatSelected([], {isRound: false});
  }, [pickUpId, dropOffId]);
  useEffect(() => {
    setSeatSelected([], {isRound: true});
  }, [pickUpIdRound, dropOffIdRound]);

  const handleConfirm = dataForm => {
    setUserInformation(dataForm);
    navigation.navigate('TicketInformation', {fromId, toId});
  };

  const isSubTrip = routeInfo.subTrip;
  const listLength = routeInfo.listtripStopDTO.length;
  const isSubTripRound = routeRoundInfo?.subTrip;
  const listLengthRound = routeRoundInfo?.listtripStopDTO.length;
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
      dateDefault: routeInfo.endDateLT,
    });
  };

  const handleCancelRound = () => {
    setValue('isRound', false);
    setValue('dropOffIdRound', '');
    setValue('dropOffIdRound', '');
    clearRound();
  };

  const handleChooseSeat = () => {
    navigation.navigate('SelectSeat', {
      fromId: pickUpId,
      toId: dropOffId,
      isRound: false,
    });
  };
  const handleChooseSeatRound = () => {
    navigation.navigate('SelectSeatRoundTrip', {
      fromId: pickUpIdRound,
      toId: dropOffIdRound,
      isRound: true,
    });
  };
  const totalSeat = fields.reduce((total, currentItem) => {
    return total + currentItem.seats?.length;
  }, 0);
  const handleChooseSeat1 = (
    index: number,
    pickUpId: string,
    dropOffId: string,
    seats: any,
  ) => {
    console.log('kkk', pickUpId, dropOffId);

    navigation.navigate('SelectSeat', {
      fromId: pickUpId,
      toId: dropOffId,
      isRound: false,
      comboSeatStations: fields
        .map(item => ({
          codePickUpPoint: item.pickUpId,
          codeDropOffPoint: item.dropOffId,
          seatName: item.seats,
        }))
        .filter((_, _index) => index !== _index),
      onChoose: (value: string[], price) =>
        update(index, {pickUpId, dropOffId, seats: value, price}),
      seats,
    });
  };
  console.log('isValid', isValid);
  console.log('errors', errors);

  const disableSubmit = !isValid;
  // const disableSubmit =
  //   !isValid ||
  //   seatSelected?.length < 1 ||
  //   !seatSelected ||
  //   (!!routeRoundInfo
  //     ? seatSelectedRound?.length < 1 || !seatSelectedRound
  //     : false);

  const _listPickup = (_dropoffId: string) => {
    const indexDropOff = routeInfo.listtripStopDTO.findIndex(
      item => item.id === _dropoffId,
    );
    const conditionIndex = indexDropOff >= 0 ? indexDropOff : listLength - 1;

    return routeInfo.listtripStopDTO.filter(item =>
      isSubTrip || true ? item.index < conditionIndex : item.type === 'PICKUP',
    );
  };

  const _listDropOff = (_pickUpId: string) => {
    console.log('aaa', _pickUpId);

    const indexPickup =
      routeInfo.listtripStopDTO.findIndex(item => item.id === _pickUpId) || 0;

    const conditionIndex = indexPickup >= 0 ? indexPickup : 0;

    return routeInfo.listtripStopDTO.filter(item =>
      isSubTrip || true ? item.index > conditionIndex : item.type === 'DROPOFF',
    );
  };

  console.log(fields);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f7f7f7'}}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={{backgroundColor: '#fff', marginBottom: 12}}>
          <Text
            style={{
              fontFamily: 'SVN-Gilroy-Medium',
              marginTop: 24,
              marginLeft: 16,
            }}>
            Lộ trình
          </Text>
          <Steps data={routeInfo.listtripStopDTO} showPrice />
          <View
            style={{
              flex: 1,
              marginRight: 4,
              paddingHorizontal: 16,
              paddingBottom: 16,
            }}>
            <Text style={{fontFamily: 'SVN-Gilroy-Medium'}}>Thời gian</Text>
            <Text style={styles.value}>
              {timeStampToUtc(routeInfo?.departureDateLT).format(
                'HH:mm - DD/MM/YYYY',
              )}
            </Text>
          </View>
        </View>
        {/* <Box
          title="Chiều đi"
          time={timeStampToUtc(routeInfo?.departureDateLT).format(
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
          disableChooseSeat={!pickUpId || !dropOffId}
        /> */}
        {fields.map((field, index) => {
          console.log('bbb', field);

          return (
            <Box
              key={field.id}
              title={`Cặp điểm trạm ${index + 1}`}
              time={timeStampToUtc(0).format('HH:mm - DD/MM/YYYY')}
              seats={field.seats?.join(', ')}
              control={control}
              listPickup={_listPickup(field.dropOffId)}
              onCallbackSelectPickup={(value: string) => {
                // setPickUpIdRound(value)
                update(index, {
                  pickUpId: value,
                  dropOffId: field.dropOffId,
                  seats: [],
                });
              }}
              onCallbackSelectDropOff={(value: string) => {
                // setDropOffIdRound(value)
                update(index, {
                  pickUpId: field.pickUpId,
                  dropOffId: value,
                  seats: [],
                });
              }}
              listDropOff={_listDropOff(field.pickUpId)}
              pickupName={`datas.${index}.pickUpId`}
              dropOffName={`datas.${index}.dropOffId`}
              onCancel={fields.length > 1 ? () => remove(index) : undefined}
              steps={[]}
              onChooseAgain={() =>
                handleChooseSeat1(
                  index,
                  field.pickUpId,
                  field.dropOffId,
                  field.seats,
                )
              }
              disableChooseSeat={!field.dropOffId || !field.pickUpId}
            />
          );
        })}
        {totalSeat < maxSeat && (
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
              onPress={() => append({pickUpId: '', dropOffId: '', seats: []})}>
              <Icon name="plus" color={'#fff'} size={20} />
              <Text style={{color: '#fff', fontWeight: '800'}}>Thêm</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* {!!routeRoundInfo ? (
          <Box
            title="Chiều về"
            time={timeStampToUtc(routeRoundInfo?.departureDateLT).format(
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
            disableChooseSeat={!pickUpIdRound || !dropOffIdRound}
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
        )} */}
        <View style={styles.box}>
          <Controller
            control={control}
            name="name"
            render={({field: {value, onChange}}) => (
              <Input
                label={
                  <Text style={{fontFamily: 'SVN-Gilroy-SemiBold'}}>
                    Thông tin khách
                  </Text>
                }
                value={value}
                onChangeText={onChange}
                inputStyle={{fontSize: 16, fontFamily: 'SVN-Gilroy-Bold'}}
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
                style={{fontFamily: 'SVN-Gilroy-Bold'}}
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
        titleStyle={{color: 'black'}}
        disabled={disableSubmit}
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
  disableChooseSeat: boolean;
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
  disableChooseSeat,
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
          <Text style={{color: 'red'}}>Xoá</Text>
        </TouchableOpacity>
      )}
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            // width: 120,
            backgroundColor: '#DEDEDE',
            paddingVertical: 6,
            borderRadius: 20,
            paddingHorizontal: 12,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'SVN-Gilroy-SemiBold',
              fontSize: 15,
            }}>
            {title}
          </Text>
        </View>
      </View>
      {/* <Steps data={steps} showPrice /> */}
      <View style={{flexDirection: 'row', marginTop: 12}}>
        {/* <View style={{flex: 1, marginRight: 4}}>
          <Text style={{fontFamily: 'SVN-Gilroy-Medium'}}>Thời gian</Text>
          <Text style={styles.value}>{time}</Text>
        </View> */}
        <View style={{flex: 1, marginLeft: 4}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: 'SVN-Gilroy-Medium'}}>
              Số ghế đã chọn (*)
            </Text>
            <TouchableOpacity
              disabled={disableChooseSeat}
              onPress={onChooseAgain}>
              <Text
                style={{
                  fontSize: 10,
                  color: disableChooseSeat ? '#ccc' : 'orange',
                }}>
                Chọn ghế
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.value}>{seats}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 12}}>
        <View style={{flex: 1, marginRight: 4}}>
          <Text style={{fontFamily: 'SVN-Gilroy-Medium'}}>Điểm đón: (*)</Text>
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
          <Text style={{fontFamily: 'SVN-Gilroy-Medium'}}>Điểm đến: (*)</Text>
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
