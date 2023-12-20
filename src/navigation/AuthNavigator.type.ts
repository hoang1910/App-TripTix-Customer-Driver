import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EAccountType } from "@enums";

type TAuthStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Role: undefined;
  LoginOrRegisterForm: { rule: EAccountType };
  SignIn: { rule: EAccountType };
  OTP: {
    fullName: string;
    address: string;
    birthday: number;
    email: string;
    phone: string;
    gender: string;
    password: string;
    role: string;
  };
  SignUp: undefined;
};

type TAuthNavigation<T extends keyof TAuthStackParamList> =
  NativeStackNavigationProp<TAuthStackParamList, T>;

type TAuthRoute<T extends keyof TAuthStackParamList> = RouteProp<
  TAuthStackParamList,
  T
>;

export type { TAuthStackParamList, TAuthNavigation, TAuthRoute };
