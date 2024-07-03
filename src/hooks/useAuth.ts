import { useState } from "react";
import * as SecureStore from "expo-secure-store";

export const useAuth = () => {
  const [userToken, setUserToken] = useState<string | null>(
    SecureStore.getItem("token"),
  );

  return { userToken, setUserToken };
};
