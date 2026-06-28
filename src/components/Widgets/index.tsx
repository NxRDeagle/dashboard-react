import type { FC } from "react";
import { ClockWidget } from "../../widgets/ClockWidget";
import { WeatherWidget } from "../../widgets/WeatherWidget";
import { TodoWidget } from "../../widgets/TodoWidget";
import { ThemeWidget } from "../../widgets/ThemeWidget";
import { DayProgressWidget } from "../../widgets/DayProgressWidget";
import { GreetingWidget } from "../../widgets/GreetingWidget";
import { LocationWidget } from "../../widgets/LocationWidget";
import { ErrorBoundary } from "../ErrorBoundary";

const WIDGETS: FC[] = [
  GreetingWidget,
  ClockWidget,
  WeatherWidget,
  TodoWidget,
  DayProgressWidget,
  ThemeWidget,
  LocationWidget,
];

export const Widgets: FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
    {WIDGETS.map((Widget) => (
      <ErrorBoundary key={Widget.name}>
        <Widget />
      </ErrorBoundary>
    ))}
  </div>
);
