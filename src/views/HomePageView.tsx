import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Text, View } from 'react-native';

import Button from 'app/src/components/Button';
import useAuthStore from 'app/src/store/AuthStore';

export const HomePageView = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    AsyncStorage.removeItem('jwtToken');
    logout();
  };
  return (
    <SafeAreaView>
      <Text style={{ textAlign: 'center' }}>HomePageView</Text>
      <Button label="Logout" variant="outlined" onPress={handleLogout} />
    </SafeAreaView>
  );
};
