import { apiClient } from "./client";
import { API_ENDPOINTS } from "../constants/api";
import type { AuthResponse, LoginCredentials, User } from "../types/auth.types";

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse, LoginCredentials>(
      API_ENDPOINTS.login,
      credentials,
    ),

  getMe: () => apiClient.get<User>(API_ENDPOINTS.me, true),
};
