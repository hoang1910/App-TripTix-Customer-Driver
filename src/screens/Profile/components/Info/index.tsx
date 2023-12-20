import {ButtonApp} from '@components/Button';
import {Input} from '@rneui/themed';
import {SelectGender} from '@screens/SignUp/components/SelectGender';
import {useStore} from '@store/index';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DatePicker} from '@components/DatePicker';
import {putUpdateUserInfo} from '@httpClient/authentication.api';
import dayjs from 'dayjs';
import {StatusApiCall, StorageKeys} from '@constants/global';
import {useToast} from 'react-native-toast-notifications';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerForPushNotificationsAsync} from '@utils/app';
// import Clipboard from '@react-native-clipboard/clipboard';
import {storage} from '@storage/index';

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Họ tên tối thiểu 5 ký tự')
    .min(5, 'Họ tên tối thiểu 5 ký tự'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  birthday: yup.date().required('Vui lòng chọn ngày sinh'),
  email: yup
    .string()
    .required('vui lòng nhập email')
    .email('Địa chỉ email không hợp lệ'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại tối thiểu 10 ký tự'),
  gender: yup.string().required('Vui lòng chọn giới tinh'),
});

export const Info: React.FC = () => {
  const {
    authentication: {synchUserInfo, userInfo},
  } = useStore();
  const [isUpdate, setIsUpdate] = useState(false);
  const [token, setToken] = useState('');
  const toast = useToast();

  useEffect(() => {
    getTokenNoti();
  });

  const getTokenNoti = async () => {
    const t = await storage.getItem(StorageKeys.notificationToken);
    setToken(t);
  };

  const {
    handleSubmit,
    control,
    formState: {isValid, isDirty, errors},
    reset,
  } = useForm({
    defaultValues: {
      fullName: userInfo.fullName,
      phone: userInfo.phone,
      address: userInfo.address,
      birthday: new Date(userInfo.birthday * 1000),
      gender: userInfo.gender,
      email: userInfo.email,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onClickUpdate = async (dataForm: any) => {
    try {
      setIsUpdate(true);
      const {data} = await putUpdateUserInfo({
        idUserSystem: userInfo.idUserSystem,
        phone: dataForm.phone,
        fullName: dataForm.fullName,
        address: dataForm.address,
        birthdayTimeStamp: dayjs(dataForm.birthday, {utc: true}).unix(),
        gender: dataForm.gender,
        email: dataForm.email,
      });

      if (data.status === StatusApiCall.Success) {
        await synchUserInfo();
        toast.show('Cập nhật thông tin thành công', {type: 'success'});
        reset(dataForm);
        return;
      }

      throw new Error();
    } catch {
      toast.show('Cập nhật thông tin thất bại', {type: 'error'});
    } finally {
      setIsUpdate(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          marginTop: 0,
          backgroundColor: 'white',
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          padding: 0,
          paddingLeft: 20,
          paddingRight: 20
        }}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Avatar
                source={require('@assets/images/bus/bus.png')}
                rounded
                size={60}
                containerStyle={{
                  backgroundColor: '#ccc',
                  position: 'relative',
                }}
              />
            </View>
          </View>
          <View>
            <Controller
              control={control}
              name="fullName"
              render={({field: {value, onChange}}) => (
                <Input
                  label="Họ tên"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.fullName?.message}
                  style={{fontFamily:'SVN-Gilroy-Medium'}}
                  
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({field: {value, onChange}}) => (
                <Input
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                  style={{fontFamily:'SVN-Gilroy-Medium'}}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({field: {value, onChange}}) => (
                <Input
                  label="Số điện thoại"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.phone?.message}
                  style={{fontFamily:'SVN-Gilroy-Medium'}}

                />
              )}
            />
            <Controller
              control={control}
              name="birthday"
              render={({field: {value, onChange}}) => (
                <DatePicker
                  value={value}
                  onConfirm={onChange}
                  placeholder="Birthday"
                  maximumDate={new Date()}
                  label="Ngày sinh"
                  renderButton={(title, onPress) => (
                    <TouchableOpacity
                      onPress={onPress}
                      style={{
                        paddingVertical: 12,
                        marginHorizontal: 12,
                        borderBottomWidth: 2,
                        borderColor: '#ccc',
                        marginBottom: 20,
                      }}>
                      <Text style={{fontSize: 18,fontFamily:'SVN-Gilroy-Medium'}}>{title}</Text>

                    </TouchableOpacity>
                  )}
                />
              )}
            />
            <Controller
              control={control}
              name="gender"
              render={({field: {value, onChange}}) => (
                <SelectGender
                  value={value}
                  onChange={onChange}
                  label="Giới tính"
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({field: {value, onChange}}) => (
                <Input
                  label="Địa chỉ"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.address?.message}
                  style={{fontSize: 18,fontFamily:'SVN-Gilroy-Medium'}}
                />
              )}
            />
            <TouchableOpacity>
              <Text style={{fontSize: 10, color: 'grey'}}>{token}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: 10,
          }}>
          <View style={{width: '100%', marginBottom: 10}}>
            <ButtonApp
              title="Update"
              onPress={handleSubmit(onClickUpdate)}
              loading={isUpdate}
              disabled={isUpdate || !isValid || !isDirty}
              buttonStyle={{
                backgroundColor: 'orange',
                width: '100%',
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
  },
});
