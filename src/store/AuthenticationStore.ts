import {observable, action, makeObservable} from 'mobx';
import {getUserInfo} from '@httpClient/authentication.api';
import {storage} from '@storage/index';
import {StorageKeys} from '@constants/global';

class Authentication {
  isLogin = false;
  userInfo: Record<string, any> = {};
  config = {
    maxSeat: 5,
    hourCanNotCancel: 1,
    percentRefundOver1Hour: 0.95,
    percentRefundUnder1Hour: 0.85,
    timeRefund: 24,
    isModeTest: true,
  };

  constructor() {
    makeObservable(this, {
      isLogin: observable,
      userInfo: observable,
      config: observable,
      setIsLogin: action,
      setUserInfo: action,
      setConfig: action,
    });
  }

  setIsLogin = (value: boolean) => {
    this.isLogin = value;
  };

  setUserInfo = (value: any) => {
    this.userInfo = value;
  };

  synchUserInfo = async () => {
    try {
      const userId = this.userInfo.idUserSystem;

      if (!userId) return;

      const {data} = await getUserInfo(userId);
      this.userInfo = data.data;
      await storage.setItem(StorageKeys.userInfo, JSON.stringify(data.data));

      return data.data;
    } catch {}
  };

  setConfig = (configs: any) => {
    this.config = {
      maxSeat: configs.max_seat,
      hourCanNotCancel: configs.hourCanNotCancel,
      percentRefundOver1Hour: configs.percentRefundOver1Hour / 100,
      percentRefundUnder1Hour: configs.percentRefundUnder1Hour / 100,
      timeRefund: configs.timeRefund,
      isModeTest: true,
    };
  };
}

export {Authentication};
