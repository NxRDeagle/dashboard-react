import type { FC, ReactNode } from "react";
import { ThemeProvider } from "../../context/ThemeContext";
import { AuthProvider } from "../../context/AuthContext";
import { LocationProvider } from "../../context/LocationContext";
import { TodoProvider } from "../../context/TodoContext";

export const AppProviders: FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <LocationProvider>
        <TodoProvider>{children}</TodoProvider>
      </LocationProvider>
    </AuthProvider>
  </ThemeProvider>
);
