import {observable, action, makeObservable} from 'mobx';

class Route {
  seatSelected: string[] = [];
  routeInfo = {};
  userInformation = {};
  routeRoundInfo: undefined | any = undefined;
  seatSelectedRound: undefined | string[] = undefined;
  pricePerSeat: number = 0;
  pricePerSeatRound: number = 0;

  constructor() {
    makeObservable(this, {
      seatSelected: observable,
      routeInfo: observable,
      userInformation: observable,
      routeRoundInfo: observable,
      seatSelectedRound: observable,
      pricePerSeat: observable,
      pricePerSeatRound: observable,
      setSeatSelected: action,
      setRouteInfo: action,
      setUserInformation: action,
      clearRound: action,
      clear: action,
    });
  }

  setPricePerSeat = (value: number, config?: {isRound?: boolean}) => {
    if (config?.isRound) {
      this.pricePerSeatRound = value;
      return;
    }

    this.pricePerSeat = value;
  };

  setSeatSelected = (value: string[], config?: {isRound?: boolean}) => {
    if (config?.isRound) {
      this.seatSelectedRound = value;
      return;
    }

    this.seatSelected = value;
  };

  setRouteInfo = (value: any, config?: {isRound?: boolean}) => {
    if (config?.isRound) {
      this.routeRoundInfo = value;
      return;
    }

    this.routeInfo = value;
  };

  setUserInformation = (value: Record<string, string>) => {
    this.userInformation = value;
  };

  clearRound = () => {
    this.routeRoundInfo = undefined;
    this.seatSelectedRound = undefined;
  };

  clear = () => {
    this.seatSelected = [];
    this.routeInfo = {};
    this.userInformation = {};
    this.routeRoundInfo = undefined;
    this.seatSelectedRound = undefined;
  };
}

export {Route};
