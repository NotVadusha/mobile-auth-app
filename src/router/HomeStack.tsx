import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomePageView } from 'app/src/views/HomePageView';

import { HomeStackParamList } from './router.types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: '',
        }}
        component={HomePageView}
        name={'Home'}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
