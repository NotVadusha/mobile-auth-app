import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type Store = {
  userName: string | null;
  access_token: string | null;
  isLoading: boolean;
  forgotPasswordMail: string | null;
  forgotPasswordToken: string | null;
  setDetailsFromStore: () => void;
  login: (username: string, access_token: string) => void;
  logout: () => void;
  setForgotPasswordMail: (forgotPasswordMail: string | null) => void;
  setForgotPasswordToken: (forgotPasswordToken: string | null) => void;
  getForgotPasswordMail: () => string | null;
  getForgotPasswordToken: () => string | null;
};

const useAuthStore = create<Store>((set, get) => ({
  userName: null,
  access_token: null,
  isLoading: false,
  isUserLoggedIn: false,
  forgotPasswordMail: null,
  forgotPasswordToken: null,

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
  setForgotPasswordMail: (forgotPasswordMail: string | null) => {
    set({ forgotPasswordMail });
  },
  setForgotPasswordToken: (forgotPasswordToken: string | null) => {
    set({ forgotPasswordToken });
  },
  getForgotPasswordMail: () => {
    return get().forgotPasswordMail;
  },
  getForgotPasswordToken: () => {
    return get().forgotPasswordToken;
  },
}));

export default useAuthStore;
