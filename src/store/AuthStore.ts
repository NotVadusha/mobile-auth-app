import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';
import { create } from 'zustand';

type Store = {
  user: User | null;
  isLoading: boolean;
  setDetailsFromStore: () => void;
  login: (user: User) => void;
  logout: () => void;
};

const useAuthStore = create<Store>((set, get) => ({
  isLoading: false,
  user: null,
  isUserLoggedIn: false,
  forgotPasswordMail: null,
  forgotPasswordToken: null,

  setDetailsFromStore: async () => {
    set({ isLoading: true });
    const userString = await AsyncStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    set({
      user,
      isLoading: false,
    });
  },
  login: (user) => {
    set(() => ({
      user,
    }));
  },
  logout: () => {
    set({
      user: undefined,
    });
  },
}));

export default useAuthStore;
