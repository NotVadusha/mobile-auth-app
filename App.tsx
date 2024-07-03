import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginView } from "./src/views/auth/LoginView";
import { HomePageView } from "./src/views/HomePageView";
import { SignUpView } from "./src/views/auth/RegisterView";
import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Text, View } from "react-native";
import { useAuth } from "./src/hooks/useAuth";
import { ResetPasswordView } from "./src/views/auth/ResetPasswordView";
import { ValidatePasswordChangeView } from "./src/views/auth/ValidatePasswordChangeView";
import { ForgotPasswordView } from "./src/views/auth/ForgotPasswordView";

const queryClient = new QueryClient();

const Wrapper = () => {
  const Stack = createNativeStackNavigator();

  const { userToken } = useAuth();
  console.log(userToken);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userToken ? (
          <>
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Register" component={SignUpView} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordView} />
            <Stack.Screen
              name="ValidateReset"
              component={ValidatePasswordChangeView}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordView}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomePageView} />
            {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper />
    </QueryClientProvider>
  );
}
