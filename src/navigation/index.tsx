import React, {useEffect, useState, useCallback, createContext} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {useStore} from '@store/index';
import {observer} from 'mobx-react-lite';
import {storage} from '@storage/index';
// import * as SplashScreen from 'expo-splash-screen';
import SplashScreen from 'react-native-splash-screen';
import {getConfig} from '@httpClient/global.api';
import {StorageKeys, StatusApiCall} from '@constants/global';

// SplashScreen.preventAutoHideAsync();
export const ConfigContext = createContext(null);

const Config = [
  {id: 16, name: 'max_seat'},
  {id: 14, name: 'hourCanNotCancel'},
  {id: 18, name: 'percentRefundOver1Hour'},
  {id: 17, name: 'percentRefundUnder1Hour'},
  {id: 13, name: 'timeRefund'},
];

function RootNavigation() {
  const {
    authentication: {
      isLogin,
      setIsLogin,
      setUserInfo,
      synchUserInfo,
      setConfig,
    },
    // config: {setConfig},
  } = useStore();
  const [isReady, setIsReady] = useState(false);
  const [configs, setConfigs] = useState({
    maxSeat: 5,
    hourCanNotCancel: 1,
    percentRefundOver1Hour: 0.95,
    percentRefundUnder1Hour: 0.85,
    timeRefund: 24,
    isModeTest: true,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await Promise.all([checkAuthentication(), getConfigApp()]);
    } finally {
      setIsReady(true);
    }
  };

  const getConfigApp = async () => {
    try {
      const {data} = await getConfig();
      if (data.status === StatusApiCall.Success) {
        const config: Record<string, any> = {};
        Config.forEach(item => {
          const configItem = data.data.find(
            (_item: any) => _item.idConfigSystem === item.id,
          );
          config[item.name] = configItem.value;
        });

        storage.setItem(StorageKeys.Config, JSON.stringify(config));
        setConfig(config);
      }
    } catch {
      const configsJson = await storage.getItem(StorageKeys.Config);
      const config = JSON.parse(configsJson ?? '{}');
      setConfig(config);
    }
  };

  const checkAuthentication = async () => {
    try {
      const [token, userInfo] = await storage.multiGet([
        StorageKeys.Token,
        StorageKeys.userInfo,
      ]);

      const newInfo = await synchUserInfo();

      setIsLogin(!!token[1]);

      setUserInfo(newInfo ?? JSON.parse(userInfo[1] ?? '{}'));
    } finally {
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <ConfigContext.Provider value={{configs}}>
      <View style={{flex: 1}} onLayout={onLayoutRootView}>
        <NavigationContainer>
          {isLogin ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </View>
    </ConfigContext.Provider>
  );
}

export default observer(RootNavigation);
