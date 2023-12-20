import {observable, action, makeObservable} from 'mobx';

class Config {
  maxSeat = 5;
  hourCanNotCancel = 1;
  percentRefundOver1Hour = 0.95;
  percentRefundUnder1Hour = 0.85;
  timeRefund = 24;
  isModeTest = true;

  constructor() {
    makeObservable(this, {
      maxSeat: observable,
      hourCanNotCancel: observable,
      percentRefundOver1Hour: observable,
      percentRefundUnder1Hour: observable,
      timeRefund: observable,
      isModeTest: observable,

      setConfig: action,
    });
  }

  setConfig = (configs: any) => {
    this.maxSeat = configs.max_seat;
    this.hourCanNotCancel = configs.hourCanNotCancel;
    this.percentRefundOver1Hour = configs.percentRefundOver1Hour / 100;
    this.percentRefundUnder1Hour = configs.percentRefundUnder1Hour / 100;
    this.timeRefund = configs.timeRefund;
  };
}

export {Config};
