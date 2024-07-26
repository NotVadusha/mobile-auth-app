import axios from "axios";
import { LoginResponse, ValidationResponse } from "./types";
import { API_URL } from "@env";

const apiInstance = axios.create({
  baseURL: API_URL,
});

export const login = async (username: string, password: string) => {
  try {
    const response = await apiInstance.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await apiInstance.post<LoginResponse>("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const validateCode = async (email: string, otp: number) => {
  try {
    const response = await apiInstance.post<ValidationResponse>(
      `/update-password/${email}`,
      {
        otp,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const receiveMail = async (email: string) => {
  try {
    const response = await apiInstance.get(`/update-password/${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updatePassword = async (
  email: string,
  newPassword: string,
  updatePasswordToken: string,
) => {
  try {
    const response = await apiInstance.post(`/update-password/${email}`, {
      newPassword,
      updatePasswordToken,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
