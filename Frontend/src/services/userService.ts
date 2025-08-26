// src/api/userApi.ts
import { axiosInstance } from "api/axiosInstance";

export interface RegisterUserDto {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const registerUser = (data: RegisterUserDto) =>
  axiosInstance.post(`/user/register`, data);

export const getUserProfile = () =>
  axiosInstance.get(`/user/profile`);