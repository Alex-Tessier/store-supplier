import { axiosInstance } from "api/axiosInstance";
import type { LoginResponse } from "../types/auth";
import axios from "axios";

export interface AuthentificationDto {
  userNameOrEmail: string;
  password: string;
}

export const loginUser = (data: AuthentificationDto) =>
    axios.post<LoginResponse>(`${import.meta.env.VITE_API_URL}/auth/login`, data, { withCredentials: true});


export const logoutUser = () =>
    axiosInstance.post<string>('/auth/logout',);
