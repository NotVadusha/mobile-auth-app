import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type Store = {
  userName: string | null;
  access_token: string | null;
  isLoading: boolean;
  setDetailsFromStore: () => void;
  login: (username: string, access_token: string) => void;
  logout: () => void;
};

const useAuthStore = create<Store>((set) => ({
  userName: null,
  access_token: null,
  isLoading: false,
  isUserLoggedIn: false,

  setDetailsFromStore: async () => {
    set({ isLoading: true });
    const access_token = await AsyncStorage.getItem("access_token");
    const userName = await AsyncStorage.getItem("username");
    set({
      access_token,
      userName,
      isLoading: false,
    });
  },
  login: (username, access_token) => {
    set(() => ({
      userName: username,
      access_token,
    }));
  },
  logout: () => {
    set({
      userName: undefined,
      access_token: undefined,
    });
  },
}));

export default useAuthStore;
