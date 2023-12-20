import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type TAppStackParamList = {
  BottomTabNavigator: undefined;
  TopUp: undefined;
  Home: undefined;
  Settings: undefined;
  Point: undefined;
  Info: undefined;
  SelectRoute: {
    fromId: string;
    toId: string;
    isRound?: boolean;
    dateDefault?: number;
    priceDefault?: any;
    typeDefault?: any;
  };
  SelectSeat: undefined;
  SearchRoute: undefined;
  DepartureInformation: undefined;
  TicketInformation: undefined;
  HomeDriver: undefined;
  HistoryDriver: undefined;
  DetailRoute: undefined;
  TransactionHistory: undefined;
  News: undefined;
  SelectRouteRoundTrip: {
    fromId: string;
    toId: string;
    isRound?: boolean;
    dateDefault?: number;
    priceDefault?: any;
    typeDefault?: any;
  };
  SelectSeatRoundTrip: undefined;
};

type TAppNavigation<T extends keyof TAppStackParamList> =
  NativeStackNavigationProp<TAppStackParamList, T>;

type TAppRoute<T extends keyof TAppStackParamList> = RouteProp<
  TAppStackParamList,
  T
>;

export type {TAppStackParamList, TAppNavigation, TAppRoute};
