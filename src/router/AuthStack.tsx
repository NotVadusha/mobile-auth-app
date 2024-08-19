import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForgotPasswordView } from 'app/src/views/auth/ForgotPasswordView';
import { LoginView } from 'app/src/views/auth/LoginView';
import { SignUpView } from 'app/src/views/auth/RegisterView';

import { AuthStackParamList } from './router.types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: '',
        }}
        component={LoginView}
        name={'Login'}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitle: '' }}
        component={SignUpView}
        name={'Register'}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitle: '' }}
        component={ForgotPasswordView}
        name={'ForgotPassword'}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
