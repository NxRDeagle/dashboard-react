import type { FC } from "react";

interface FallbackProps {
  message?: string;
}

export const Fallback: FC<FallbackProps> = ({
  message = "Something went wrong",
}) => (
  <div className="flex items-center justify-center p-6 rounded-2xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
    <div className="text-center">
      <p className="text-2xl mb-2">⚠️</p>
      <p className="font-semibold text-red-700 dark:text-red-400">{message}</p>
    </div>
  </div>
);

export const LoadingFallback: FC = () => (
  <div className="flex items-center justify-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);
