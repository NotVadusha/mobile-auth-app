import axios, { AxiosError } from "axios";
import { CheckingResponse, LoginResponse, ValidationResponse } from "./types";
import { API_URL } from "@env";
import Toast from "react-native-toast-message";

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
    console.log(error);
    Toast.show({
      type: "error",
      text1:
        error instanceof Error || error instanceof AxiosError
          ? error.message
          : "An error occurred",
    });
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
    console.log(error);
    Toast.show({
      type: "error",
      text1:
        error instanceof Error || error instanceof AxiosError
          ? error.message
          : "An error occurred",
    });
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
    console.log(error);
    Toast.show({
      type: "error",
      text1:
        error instanceof Error || error instanceof AxiosError
          ? error.message
          : "An error occurred",
    });
    return null;
  }
};

export const receiveMail = async (email: string) => {
  try {
    const response = await apiInstance.get(`/update-password/${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
    Toast.show({
      type: "error",
      text1:
        error instanceof Error || error instanceof AxiosError
          ? error.message
          : "An error occurred",
    });
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
    console.log(error);
    Toast.show({
      type: "error",
      text1:
        error instanceof Error || error instanceof AxiosError
          ? error.message
          : "An error occurred",
    });
    return null;
  }
};

export const checkEmail = async (email: string) => {
  try {
    const response = await apiInstance.get<CheckingResponse>(
      `/auth/check/email/${email}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const checkName = async (name: string) => {
  try {
    const response = await apiInstance.get<CheckingResponse>(
      `/auth/check/name/${name}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
