import type { WidgetConfig } from "../types/widget.types";
import { GreetingWidget } from "../widgets/GreetingWidget";
import { ClockWidget } from "../widgets/ClockWidget";
import { WeatherWidget } from "../widgets/WeatherWidget";
import { TodoWidget } from "../widgets/TodoWidget";
import { DayProgressWidget } from "../widgets/DayProgressWidget";
import { ThemeWidget } from "../widgets/ThemeWidget";
import { LocationWidget } from "../widgets/LocationWidget";

export const WIDGET_CONFIGS: WidgetConfig[] = [
  { id: "greeting", component: GreetingWidget },
  { id: "clock", component: ClockWidget },
  { id: "weather", component: WeatherWidget },
  { id: "todo", component: TodoWidget },
  { id: "progress", component: DayProgressWidget },
  { id: "theme", component: ThemeWidget },
  { id: "location", component: LocationWidget },
];

export const DEFAULT_WIDGET_ORDER = WIDGET_CONFIGS.map(
  (widget: WidgetConfig): string => widget.id,
);
