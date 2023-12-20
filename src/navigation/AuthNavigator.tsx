import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Home,
  Welcome,
  LoginOrRegisterForm,
  Role,
  SignIn,
  OTP,
} from "@screens";
import { TAuthStackParamList } from "./AuthNavigator.type";
import { SignUp } from "@screens/SignUp";

const Stack = createNativeStackNavigator<TAuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Welcome"}
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"Home"} component={Home} />
      <Stack.Screen
        name={"SignIn"}
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"OTP"}
        component={OTP}
        options={{ title: "Xác thực OTP" }}
      />
      <Stack.Screen
        name={"LoginOrRegisterForm"}
        component={LoginOrRegisterForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Role"}
        component={Role}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Đăng ký",
        }}
      />
    </Stack.Navigator>
  );
}
