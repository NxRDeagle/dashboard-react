import {
  createContext,
  useContext,
  useState,
  useCallback,
  type FC,
  type ReactNode,
} from "react";
import type { AuthState, AuthContextValue, User } from "../types/auth.types";
import { STORAGE_KEYS } from "../constants/storage";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const token = localStorage.getItem(STORAGE_KEYS.accessToken);
    const userRaw = localStorage.getItem(STORAGE_KEYS.user);
    const user = userRaw ? (JSON.parse(userRaw) as User) : null;
    return {
      user,
      accessToken: token,
      isAuthenticated: !!token && !!user,
    };
  });

  const login = useCallback((user: User, token: string) => {
    localStorage.setItem(STORAGE_KEYS.accessToken, token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    setState({ user, accessToken: token, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.user);
    setState({ user: null, accessToken: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
