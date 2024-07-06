import axios from "axios";
import { LoginResponse } from "./types";
import { API_URL } from "@env";

const authInstance = axios.create({
  baseURL: API_URL,
});

export const login = async (username: string, password: string) => {
  try {
    const response = await authInstance.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
