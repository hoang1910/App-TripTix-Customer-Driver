import {Header} from '@components/Header';
import {Slider, Text, Icon, Chip, Button} from '@rneui/themed';
import {formatPrice} from '@utils/price';
import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {PopupConfirm} from './components/PopupConfirm';
import {useStore} from '@store/index';
import {putExchangeCoins} from '@httpClient/authentication.api';
import {StatusApiCall} from '@constants/global';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@navigation/AppNavigator.type';
import { color } from '@rneui/base';
// import Icon from "react-native-vector-icons/MaterialIcons";

export const Point: React.FC = () => {
  const {
    authentication: {userInfo, synchUserInfo},
  } = useStore();

  const max = userInfo.voucherCoins;
  const [changeCoin, setChangeCoin] = useState(max);
  const [showConfirm, setShowConfirm] = useState(false);
  const toast = useToast();
  const navigation = useNavigation<TAppNavigation<'Point'>>();
  const [loading, setLoading] = useState(false);

  const handleChangeCoin = async () => {
    try {
      setShowConfirm(false);
      setLoading(true);
      const {data} = await putExchangeCoins(userInfo.idUserSystem, changeCoin);

      if (data.status === StatusApiCall.Success) {
        await synchUserInfo();
        toast.show('Thành công!', {type: 'success'});
        navigation.replace('BottomTabNavigator');
        return;
      }

      throw new Error();
    } catch {
      toast.show('Có lỗi xảy ra!', {type: 'error'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{padding: 24, backgroundColor: '#fff', flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: '900'}}>Xu: {formatPrice(max)}</Text>
        <Text>Vui lòng chọn số xu bạn muốn đổi:</Text>
        <Slider
          value={changeCoin}
          style={{marginTop: 24}}
          onValueChange={setChangeCoin}
          minimumValue={10000}
          minimumTrackTintColor="orange"
          maximumValue={max >= 10000 ? max : 10000}
          disabled={max < 10000}
          thumbProps={{
            children: (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text style={{color: '#fff', fontSize: 12}}>
                  {formatPrice(changeCoin)}
                </Text>
              </View>
            ),
          }}
          thumbStyle={{padding: 4, width: 80}}
          step={1000}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{formatPrice(10000)}</Text>
          <Text>{formatPrice(max)}</Text>
        </View>
        <Text style={{marginTop: 16, fontSize: 12, color: '#ccc'}}>
          Bạn chỉ có thể đổi khi số xu khuyến mại lớn hơn {formatPrice(10000)}
        </Text>
      </View>
      <Button
        title={'Tiếp tục'}
        onPress={() => setShowConfirm(true)}
        loading={loading}
        disabled={max < 10000}
        buttonStyle={{borderRadius:20}}
        color={'orange'}  
      />

      <PopupConfirm
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        coin={changeCoin}
        onConfirm={handleChangeCoin}
      />
    </SafeAreaView>
  );
};
