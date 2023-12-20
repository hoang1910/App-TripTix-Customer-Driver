import React, {useState} from 'react';
import {Text, Input, Button} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {ButtonApp} from '@components/Button';
import {useNavigation} from '@react-navigation/native';
import {TAuthNavigation} from '@navigation/AuthNavigator.type';
import {useStore} from '@store/index';
import {postLogin, putTokenNotification} from '@httpClient/authentication.api';
import {StatusApiCall, StorageKeys} from '@constants/global';
import {RoleCanLogin} from '@constants/user';
import {storage} from '@storage/index';

const schema = yup.object().shape({
  email: yup.string().required('require').min(4, 'min 4'),
  password: yup.string().required('require').min(4, 'min 4'),
});

export const SignIn = () => {
  const navigation = useNavigation<TAuthNavigation<'SignIn'>>();
  const {
    authentication: {setIsLogin, setUserInfo},
  } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm({
    defaultValues: {email: '', password: ''},
    resolver: yupResolver(schema),
  });

  const handleSignIn = handleSubmit(async (dataForm: any) => {
    try {
      setIsLoading(true);
      const {data} = await postLogin(dataForm.email, dataForm.password);
      if (data.status === StatusApiCall.Success) {
        if (!RoleCanLogin.includes(data.data.user.role)) {
          setError('password', {
            message:
              'Bạn không có quyền truy cập ứng dụng. Vui lòng liên hệ Admin để được hỗ trợ',
          });
          return;
        }

        await Promise.all([
          storage.setItem(StorageKeys.Token, data.data.token),
          storage.setItem(StorageKeys.userInfo, JSON.stringify(data.data.user)),
        ]);
        setUserInfo(data.data.user);
        setIsLogin(true);

        const token = await storage.getItem(StorageKeys.notificationToken);
        token && putTokenNotification(data.data.user.idUserSystem, token);
      }
    } catch (e) {
      console.log(e);

      setError('password', {message: 'Đăng nhập thất bại. Vui lòng thử lại'});
    } finally {
      setIsLoading(false);
    }
  });

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text h4 h4Style={styles.title}>
            Đăng nhập
          </Text>
          <Text>Xin chào, mừng bạn quay trở lại</Text>
        </View>
        <View>
          <Controller
            control={control}
            name="email"
            render={({field: {value, onChange}}) => (
              <Input
                errorMessage={errors.email?.message as string}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon name="email-lock" size={20} />}
                placeholder="Tên đăng nhập"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {value, onChange}}) => (
              <Input
                errorMessage={errors.password?.message as string}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon name="shield-key" size={20} />}
                placeholder="Mật khẩu"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />
          <ButtonApp
            title="Đăng nhập"
            containerStyle={styles.btnLoginContainer}
            buttonStyle={styles.btnLogin}
            onPress={handleSignIn}
            loading={isLoading}
          />
        </View>
        <View>
          <View style={styles.footer}>
            <Text>Bạn chưa có tài khoản?</Text>
            <Button
              title="Đăng ký"
              type="clear"
              titleStyle={styles.btnSignUp}
              onPress={handleSignUp}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 32,
    justifyContent: 'space-between',
  },
  title: {fontWeight: '700'},
  inputStyle: {fontSize: 14, marginLeft: 12},
  btnLogin: {
    backgroundColor: 'rgba(127, 220, 103, 1)',
  },
  btnLoginContainer: {margin: 24, marginTop: 40},
  footer: {flexDirection: 'row', alignItems: 'center'},
  btnSignUp: {fontSize: 14, color: '#FF800B'},
});
