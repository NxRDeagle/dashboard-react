export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: VoidFunction;
  setTheme: (theme: Theme) => void;
}
