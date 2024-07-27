export interface LoginResponse {
  access_token: string;
}

export interface ValidationResponse {
  updatePasswordToken: string;
}

export interface CheckingResponse {
  isExist: boolean;
}
