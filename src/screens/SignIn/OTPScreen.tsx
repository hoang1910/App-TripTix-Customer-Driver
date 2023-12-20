import React, {useEffect, useState} from 'react';
import {Text} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Image} from 'react-native';
import {Images} from '@assets/images';
import {ButtonApp} from '@components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TAuthNavigation, TAuthRoute} from '@navigation/AuthNavigator.type';
import {useStore} from '@store/index';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {
  postSendOtp,
  postConfirmOtp,
  postRegister,
} from '@httpClient/authentication.api';
import {StatusApiCall} from '@constants/global';
import {useToast} from 'react-native-toast-notifications';
import {EAccountType} from '@enums';
import {KeyboardAwareScrollView} from '@pietile-native-kit/keyboard-aware-scrollview';

export const OTP = () => {
  const navigation = useNavigation<TAuthNavigation<'OTP'>>();
  const params = useRoute<TAuthRoute<'OTP'>>().params || {};

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    authentication: {setIsLogin},
  } = useStore();
  const toast = useToast();
  const [time, setTime] = useState(0);

  useEffect(() => {
    sendOtp();
  }, []);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => setTime(preview => preview - 1), 1000);
      return;
    }
  }, [time]);

  useEffect(() => {
    if (otp.length === 6) {
      Keyboard.dismiss();
    }
  }, [otp]);

  const sendOtp = async () => {
    setTime(60);
    const {data} = await postSendOtp(params.phone);
    if (data.status === StatusApiCall.Success) {
      toast.show('Mã OTP đã được gửi đi', {type: 'success'});
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const {data} = await postConfirmOtp(params.phone, otp);
      if (data.status === StatusApiCall.Success) {
        await handleRegister();
        return;
      }
    } catch (error) {
      toast.show(
        error?.data?.data ??
          error?.data?.message ??
          'Có lỗi xảy ra. Vui lòng thử lại',
        {
          type: 'danger',
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const {data} = await postRegister({...params, role: 'CUSTOMER'});
      if (data.status === StatusApiCall.Success) {
        Alert.alert(
          'Thông báo',
          'Bạn đã đăng ký thành công. Vui lòng đăng nhập tài khoản',
          [
            {
              text: 'Đăng nhập',
              onPress: () =>
                navigation.replace('SignIn', {rule: EAccountType.Customer}),
            },
          ],
        );
        return Promise.resolve();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.imageWrapper}>
            <Image source={Images.Otp} style={styles.image} />
          </View>
          <View style={styles.contentWrapper}>
            <Text h4 h4Style={styles.titleContent}>
              Nhập mã OTP
            </Text>
            <Text h4 h4Style={styles.titleDes}>
              Mã bao gồm 6 ký tự đã được gửi đến {'\n'} {params.phone}
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            <CodeField
              value={otp}
              onChangeText={value => setOtp(value)}
              cellCount={6}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderColor: isFocused ? 'orange' : '#ccc',
                    borderRadius: 12,
                    fontSize: 28,
                    fontWeight: '800',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    paddingTop: 4,
                  }}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <ButtonApp
            onPress={handleVerify}
            title="Verify"
            buttonStyle={styles.buttonVertify}
            containerStyle={styles.buttonVertifyContainer}
            titleStyle={styles.titleButtonVertify}
            disabled={otp.length !== 6 || loading}
          />
          <TouchableOpacity onPress={sendOtp} disabled={!!time}>
            <Text
              h4
              h4Style={[styles.footerText, {color: time ? '#ccc' : 'orange'}]}>
              Gửi lại {time > 0 ? `(${time}s)` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 32,
    justifyContent: 'space-between',
    fontSize: 16,
    height: '100%',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    display: 'flex',
    justifyContent: 'flex-start',
    width: '70%',
    marginBottom: 0,
  },
  imageWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 'auto',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
    backgroundColor: '#fff',
  },
  image: {
    width: 171,
    height: 169,
    resizeMode: 'contain',
  },
  contentWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  titleContent: {
    fontWeight: '700',
    fontSize: 24,
    display: 'flex',
    justifyContent: 'flex-start',
    width: '70%',
    marginBottom: 5,
  },
  titleDes: {
    color: '#595959',
    fontSize: 14,
    fontWeight: '500',
  },
  arrayNumberWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 30,
  },
  inputWrapper: {
    borderRadius: 10,
    width: 45,
    height: 50,
    marginTop: 15,
    overflow: 'hidden',
    backgroundColor: '#EDEDED',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: 'gray',
  },
  inputStyle: {
    width: 45,
    height: 50,
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
  },
  footer: {
    marginTop: 30,
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonVertify: {
    backgroundColor: 'orange',
    borderColor: 'white',
  },
  buttonVertifyContainer: {
    width: '100%',
    marginBottom: 16,
  },
  titleButtonVertify: {fontWeight: '600', color: '#FFF', fontSize: 14},
  footerText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
  },
});
