import type { FC } from "react";
import type { IGreetingWidgetProps } from "../types";
import { getGreeting } from "../utils";

const GreetingWidget: FC<IGreetingWidgetProps> = ({ userName }) => {
  const greeting = getGreeting();

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-sm text-white h-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-3">
        Greeting · Remote MFE ✦
      </p>
      <p className="text-3xl font-bold leading-tight">{greeting},</p>
      <p className="text-3xl font-bold leading-tight">{userName}! 👋</p>
      <p className="text-sm text-blue-200 mt-3">Ready to conquer the day?</p>
    </div>
  );
};

export default GreetingWidget;
