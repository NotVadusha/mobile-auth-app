import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

import useAuthStore from 'app/src/store/AuthStore';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { RootStackParamList } from './router.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { user, isLoading, setDetailsFromStore } = useAuthStore();

  useEffect(() => {
    setDetailsFromStore();
  }, []);

  return (
    <>
      {isLoading ? (
        <View>
          <Text>loading</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Stack.Navigator>
            {user ? (
              <Stack.Screen
                options={{ headerShown: false }}
                name={'HomeStackScreen'}
                component={HomeStack}
              />
            ) : (
              <Stack.Screen
                options={{ headerShown: false, headerTransparent: true }}
                name={'AuthStackScreen'}
                component={AuthStack}
              />
            )}
          </Stack.Navigator>
        </View>
      )}
    </>
  );
};

export default RootStack;
