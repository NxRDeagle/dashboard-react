import type { FC } from "react";
import { useAuth } from "../../context/AuthContext";
import logoUrl from "../../assets/logo.svg";

export const Header: FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Dashboard logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            {user?.email}
          </span>
          <button
            onClick={logout}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};
