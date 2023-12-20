import {Header} from '@components/Header';
import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {Input} from '@rneui/themed';
import {ButtonApp} from '@components/Button';
import {putChangePassword} from '@httpClient/authentication.api';
import {useStore} from '@store';
import {useToast} from 'react-native-toast-notifications';
import {StatusApiCall} from '@constants/global';
import {useNavigation} from '@react-navigation/native';

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu cũ')
    .min(5, 'Mật khẩu tối thiểu 6 ký tự'),
  newPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu mới')
    .min(5, 'Mật khẩu tối thiểu 6 ký tự'),
  reNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu nhập lại không khớp')
    .required('Vui lòng nhập lại mật khẩu mới')
    .min(5, 'Mật khẩu tối thiểu 6 ký tự'),
});

export const Settings: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: {isValid, isDirty, errors},
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      reNewPassword: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const {
    authentication: {userInfo},
  } = useStore();
  const toast = useToast();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (forms: any) => {
    try {
      setLoading(true);
      const {data} = await putChangePassword(
        userInfo.idUserSystem,
        forms.oldPassword,
        forms.newPassword,
      );

      if (data.status === StatusApiCall.Success) {
        toast.show('Đổi mật khẩu thành công', {type: 'success'});
        navigation.goBack();

        return;
      }
    } catch (error: any) {
      toast.show(error.data.message, {type: 'danger'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, paddingVertical: 16}}>
        <Controller
          control={control}
          name="oldPassword"
          render={({field: {value, onChange}}) => (
            <Input
              label="Mật khẩu cũ"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.oldPassword?.message}
              secureTextEntry
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({field: {value, onChange}}) => (
            <Input
              label="Mật khẩu mới"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.newPassword?.message}
              secureTextEntry
            />
          )}
        />
        <Controller
          control={control}
          name="reNewPassword"
          render={({field: {value, onChange}}) => (
            <Input
              label="Xác nhận mật khẩu mới"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.reNewPassword?.message}
              secureTextEntry
            />
          )}
        />
      </View>
      <View style={{padding: 16}}>
        <ButtonApp
          title="Cập nhật"
          onPress={handleSubmit(handleChangePassword)}
          loading={loading}
          disabled={loading || !isValid || !isDirty}
          buttonStyle={{
            backgroundColor: 'red',
            width: '100%',
          }}
        />
      </View>
    </SafeAreaView>
  );
};
