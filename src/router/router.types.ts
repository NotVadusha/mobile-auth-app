import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  Home: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  ConfirmResetCode: undefined;
  ForgotPassword: undefined;
};

export type RootStackParamList = {
  HomeStackScreen: undefined;
  AuthStackScreen: undefined;
};

export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
