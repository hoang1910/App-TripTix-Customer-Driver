import {Button, CheckBox, Chip, Divider, Input, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useStore} from '@store/index';
import {formatPrice} from '@utils/price';
import {topUp} from '@httpClient/payment.api';
import {StatusApiCall} from '@constants/global';
import {useToast} from 'react-native-toast-notifications';
import ReactNativeModal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import {PopupStatus} from './components/PopupStatus';

const MoneySuggest = [100000, 200000, 300000];
const Types = [
  // { id: "momo", title: "MoMo", icon: "" },
  // { id: "zalo", title: "ZaloPay", icon: "" },
  {id: 'vnpay', title: 'VN Pay', icon: ''},
];
const schema = yup.object().shape({
  money: yup
    .number()
    .required('Vui lòng nhập số tiền cần nạp')
    .min(100000, 'vui lòng nạp tối thiểu 50.000 đ')
    .max(5000000, 'Số tiền tối đa có thể nạp là 5.000.000đ')
    .nullable(),
  method: yup.string(),
});

export const TopUP: React.FC = () => {
  const {
    control,
    setValue,
    formState: {isValid, errors},
    handleSubmit,
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      money: 0,
      method: 'vnpay',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const toast = useToast();
  const {
    authentication: {synchUserInfo},
  } = useStore();

  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'fail' | 'pending'>(
    'pending',
  );

  const {
    authentication: {userInfo},
  } = useStore();

  const onChooseSuggest = (value: number) => {
    setValue('money', value);
    trigger();
  };

  const handleTopUp = async dataForm => {
    try {
      setIsLoading(true);
      const {data} = await topUp(userInfo.idUserSystem, dataForm.money);
      if (data.status === StatusApiCall.Success) {
        setLink(data.data);
        return;
      }

      throw new Error();
    } catch (e) {
      toast.show('Không thể khởi động thanh toán', {type: 'error'});
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigationStateChange = navState => {
    if (
      navState.url ===
      'http://btbs.ap-southeast-1.elasticbeanstalk.com/payment/result?status=success'
    ) {
      synchUserInfo();
      setLink('');
      setStatus('success');
      return;
    }
    if (
      navState.url ===
      'http://btbs.ap-southeast-1.elasticbeanstalk.com/payment/result?status=fail'
    ) {
      setLink('');
      setStatus('fail');
      return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.walletText}>
              <Text>Số dư trong ví:&nbsp;</Text>
              <Text style={styles.walletNumber}>
                {formatPrice(userInfo.coins)}
              </Text>
            </Text>
            <Controller
              control={control}
              name="money"
              render={({field: {value, onChange}}) => (
                <Input
                  placeholder="Số tiền muốn nạp"
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(value)}
                  onChangeText={text => {
                    onChange(text ? Number(text) : 0);
                  }}
                  errorMessage={errors.money?.message}
                />
              )}
            />
            <View style={styles.suggestWrap}>
              {MoneySuggest.map((item, index) => (
                <Chip
                  key={index}
                  title={item.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                  color={'#eff1f2'}
                  titleStyle={{color: '#4b4b4b'}}
                  containerStyle={{marginRight: 8}}
                  onPress={() => onChooseSuggest(item)}
                />
              ))}
            </View>
            <View style={styles.noteWrap}>
              <View style={styles.noteDot} />
              <Text >
                Giới hạn giao dịch: trong khoảng 100,000đ đến 5,000,000đ
              </Text>
            </View>
            <View style={styles.methodTitleWrap}>
              <Text style={{fontWeight: '800'}}>Chọn hình thức nạp</Text>
            </View>
            <Controller
              control={control}
              name="method"
              render={({field: {value, onChange}}) => (
                <>
                  {Types.map((item, index) => (
                    <CheckBox
                      key={index}
                      title={item.title}
                      checkedIcon="check-circle"
                      uncheckedIcon="circle-thin"
                      checkedColor="#ef5222"
                      checked={value === item.id}
                      onPress={() => onChange(item.id)}
                    />
                  ))}
                </>
              )}
            />
            <Text style={{color: 'red'}}>{errors.method?.message}</Text>
          </View>
          <Button
            title={'Xác nhận'}
            buttonStyle={{borderRadius: 20}}
            disabled={!isValid}
            onPress={handleSubmit(handleTopUp)}
            loading={isLoading}
            color='#ff9434'
          />
        </View>
        {!!link && (
          <ReactNativeModal isVisible style={{margin: 0}}>
            <WebView
              style={{flex: 1}}
              source={{uri: link}}
              onNavigationStateChange={handleNavigationStateChange}
            />
          </ReactNativeModal>
        )}
        {status !== 'pending' && (
          <PopupStatus
            status={status}
            money={getValues('money')}
            onClose={() => {
              setStatus('pending');
            }}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
