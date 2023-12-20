import {Images} from '@assets/images';
import {ButtonApp} from '@components/Button';
import {Avatar, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {View, SafeAreaView, LogBox} from 'react-native';
import {StyleSheet, TextInput} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAwareScrollView} from '@pietile-native-kit/keyboard-aware-scrollview';

import {DatePicker} from '../../components/DatePicker';
import {Controller, useForm} from 'react-hook-form';
import {TAuthNavigation} from '@navigation/AuthNavigator.type';
import {useNavigation} from '@react-navigation/native';
import {SelectGender} from './components/SelectGender';
import {EAccountType} from '@enums';
import dayjs from 'dayjs';

LogBox.ignoreAllLogs();
const regexUsername = '^[a-zA-Z0-9_-]{3,16}$';

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Họ tên tối thiểu 5 ký tự')
    .min(5, 'Họ tên tối thiểu 5 ký tự'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  dateOfBirth: yup.date().required('Vui lòng chọn ngày sinh'),
  email: yup
    .string()
    .required('vui lòng nhập email')
    .email('Địa chỉ email không hợp lệ'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại tối thiểu 10 ký tự'),
  gender: yup.string().required('Vui lòng chọn giới tinh'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  userName: yup
    .string()
    .required('Vui lòng nhập username')
    .min(6, 'Vui lòng nhập trên 6 ký tự')
    .matches(regexUsername, 'Username không hợp lệ'),
});

export const SignUp: React.FC = () => {
  const navigation = useNavigation<TAuthNavigation<'SignIn'>>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullName: '',
      address: '',
      dateOfBirth: new Date(),
      email: '',
      phone: '',
      gender: '',
      password: '',
      userName: '',
    },
    resolver: yupResolver(schema),
  });

  const handleContinue = handleSubmit(async (dataForm: any) => {
    navigation.navigate('OTP', {
      ...dataForm,
      birthdayTimeStamp: dayjs(dataForm.dayOfBirth, {utc: true}).unix(),
      role: EAccountType.Customer,
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <KeyboardAwareScrollView style={styles.body}>
          <View style={styles.avatar}>
            <Avatar size={120} rounded source={Images.Bus}>
              <Avatar.Accessory size={24} />
            </Avatar>
          </View>
          <Controller
            control={control}
            name="fullName"
            render={({field: {value, onChange}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Họ tên"
                placeholderTextColor={'#ccc'}
              />
            )}
          />
          <ErrorMessage message={errors.fullName?.message} />
          <Controller
            control={control}
            name="address"
            render={({field: {value, onChange}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Địa chỉ"
                placeholderTextColor={'#ccc'}
              />
            )}
          />
          <ErrorMessage message={errors.address?.message} />
          <Controller
            control={control}
            name="dateOfBirth"
            render={({field: {value, onChange}}) => (
              <DatePicker
                value={value}
                onConfirm={onChange}
                placeholder="Ngày sinh"
                maximumDate={new Date()}
              />
            )}
          />
          <ErrorMessage message={errors.dateOfBirth?.message} />
          <Controller
            control={control}
            name="email"
            render={({field: {value, onChange}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={'#ccc'}
              />
            )}
          />
          <ErrorMessage message={errors.email?.message} />
          <Controller
            control={control}
            name="phone"
            render={({field: {value, onChange}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Số điện thoại"
                placeholderTextColor={'#ccc'}
                keyboardType="phone-pad"
              />
            )}
          />
          <ErrorMessage message={errors.phone?.message} />
          <Controller
            control={control}
            name="userName"
            render={({field: {value, onChange}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={'#ccc'}
              />
            )}
          />
          <ErrorMessage message={errors.userName?.message} />
          <Controller
            control={control}
            name="password"
            render={({field: {value, onChange}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Mật khẩu"
                placeholderTextColor={'#ccc'}
                secureTextEntry
              />
            )}
          />
          <ErrorMessage message={errors.password?.message} />
          <Controller
            control={control}
            name="gender"
            render={({field: {value, onChange}}) => (
              <SelectGender value={value} onChange={onChange} />
            )}
          />
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <ButtonApp
            title="Tiếp tục"
            buttonStyle={styles.buttonContinue}
            onPress={handleContinue}
            loading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const ErrorMessage = ({message}: {message?: string}) => {
  return (
    <View>
      <Text style={{fontSize: 12, color: 'red', paddingLeft: 16}}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    padding: 24,
  },
  avatar: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footer: {},
  body: {flex: 1},
  buttonContinue: {
    backgroundColor: 'green',
  },
  input: {
    padding: 16,
    backgroundColor: '#fafafa',
    marginVertical: 12,
    borderRadius: 8,
  },
});
