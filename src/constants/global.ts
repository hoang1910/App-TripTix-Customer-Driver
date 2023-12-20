import {Dimensions} from 'react-native';

const StatusApiCall = {
  Success: true,
  Fail: false,
};

const StorageKeys = {
  Token: 'token',
  userInfo: 'user_info',
  notificationToken: 'notification_token',
  Config: 'config',
};

const DeviceSize = Dimensions.get('screen');

export {StatusApiCall, StorageKeys, DeviceSize};
