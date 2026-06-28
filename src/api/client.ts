import { API_BASE_URL } from "../constants/api";
import { STORAGE_KEYS } from "../constants/storage";
import type { RequestOptions } from "../types/client.types";

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { authenticated = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string> | undefined),
  };

  if (authenticated) {
    const token = localStorage.getItem(STORAGE_KEYS.accessToken);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorBody = (await response
      .json()
      .catch(() => ({ message: "Network error" }))) as { message?: string };
    throw new Error(errorBody.message ?? `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string, authenticated = false) =>
    request<T>(endpoint, { method: "GET", authenticated }),

  post: <T, B extends object = Record<string, string>>(
    endpoint: string,
    body: B,
    authenticated = false,
  ) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      authenticated,
    }),
};
