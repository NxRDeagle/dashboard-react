import type { FC } from "react";

export interface WidgetConfig {
  id: string;
  component: FC;
}

export interface SortableWidgetProps {
  config: WidgetConfig;
  isEditMode: boolean;
  index: number;
}
