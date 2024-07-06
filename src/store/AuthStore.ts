import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type Store = {
  userName: string | null;
  access_token: string | null;
  isLoading: boolean;
  isUserLoggedIn: boolean;
  setDetailsFromStore: () => void;
  login: () => void;
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
      isUserLoggedIn: !!access_token && !!userName,
      isLoading: false,
    });
  },
  login: () => {
    set(() => ({}));
  },
  logout: () => {
    set({
      userName: undefined,
      access_token: undefined,
    });
  },
}));

export default useAuthStore;
