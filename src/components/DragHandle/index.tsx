import type { FC } from "react";

export const DragHandle: FC = () => (
  <svg
    width="10"
    height="14"
    viewBox="0 0 10 14"
    fill="currentColor"
    className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors"
  >
    <circle cx="2.5" cy="2.5" r="1.5" />
    <circle cx="7.5" cy="2.5" r="1.5" />
    <circle cx="2.5" cy="7" r="1.5" />
    <circle cx="7.5" cy="7" r="1.5" />
    <circle cx="2.5" cy="11.5" r="1.5" />
    <circle cx="7.5" cy="11.5" r="1.5" />
  </svg>
);
