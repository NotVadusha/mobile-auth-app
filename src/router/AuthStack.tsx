import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ValidatePasswordChangeView } from "../views/auth/ValidatePasswordChangeView";
import { ForgotPasswordView } from "../views/auth/ForgotPasswordView";
import { ResetPasswordView } from "../views/auth/ResetPasswordView";
import { SignUpView } from "../views/auth/RegisterView";
import { AuthStackParamList } from "./router.types";
import { LoginView } from "../views/auth/LoginView";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: "",
        }}
        component={LoginView}
        name={"Login"}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitle: "" }}
        component={SignUpView}
        name={"Register"}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitle: "" }}
        component={ForgotPasswordView}
        name={"ForgotPassword"}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitle: "" }}
        component={ValidatePasswordChangeView}
        name={"ConfirmResetCode"}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitle: "" }}
        component={ResetPasswordView}
        name={"ResetPassword"}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
