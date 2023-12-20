import RootNavigation from '@navigation';
import {rootStore} from '@store/store';
import {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {getProvinces, getConfig} from '@httpClient/global.api';
import {storage} from '@storage/index';
import {Keys} from '@constants/storage';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider, useStore} from '@store/index';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {StorageKeys, StatusApiCall} from '@constants/global';
import React from 'react';

const Config = [
  {id: 16, name: 'max_seat'},
  {id: 14, name: 'hourCanNotCancel'},
  {id: 18, name: 'percentRefundOver1Hour'},
  {id: 17, name: 'percentRefundUnder1Hour'},
  {id: 13, name: 'timeRefund'},
];

export default function App() {
  useEffect(() => {
    getListProvince();
    getConfigApp();
    getTokenFCM();
  }, []);

  const getListProvince = async () => {
    try {
      const {data} = await getProvinces();
      storage.setItem(Keys.Provinces, JSON.stringify(data.data));
    } catch (e) {
      console.error(e);
    }
  };

  const getConfigApp = async () => {
    const {data} = await getConfig();
    if (data.status === StatusApiCall.Success) {
      const config: Record<string, any> = {};
      Config.forEach(item => {
        const configItem = data.data.find(
          (_item: any) => _item.idConfigSystem === item.id,
        );
        config[item.name] = configItem.value;
      });

      storage.setItem(Keys.Config, JSON.stringify(config));
    }
  };

  const getTokenFCM = async () => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      const fcmToken = await messaging().getToken();
      storage.setItem(StorageKeys.notificationToken, fcmToken);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <Provider value={rootStore}>
      <ToastProvider>
        <SafeAreaProvider>
          <RootNavigation />
        </SafeAreaProvider>
      </ToastProvider>
    </Provider>
  );
}
