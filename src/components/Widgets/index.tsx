import { useState, useCallback, type FC } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import type { WidgetConfig } from "../../types/widget.types";
import { WIDGET_CONFIGS, DEFAULT_WIDGET_ORDER } from "../../constants/widgets";
import { SortableWidget } from "../SortableWidget";
import { STORAGE_KEYS } from "../../constants/storage";

const loadOrder = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.widgetOrder);
    if (!raw) return DEFAULT_WIDGET_ORDER;
    const parsed = JSON.parse(raw) as string[];
    if (DEFAULT_WIDGET_ORDER.every((id) => parsed.includes(id))) return parsed;
    return DEFAULT_WIDGET_ORDER;
  } catch {
    return DEFAULT_WIDGET_ORDER;
  }
};

const saveOrder = (order: string[]): void => {
  localStorage.setItem(STORAGE_KEYS.widgetOrder, JSON.stringify(order));
};

export const Widgets: FC = () => {
  const [order, setOrder] = useState<string[]>(loadOrder);
  const [isEditMode, setIsEditMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrder((prev) => {
        const next = arrayMove(
          prev,
          prev.indexOf(active.id?.toString()),
          prev.indexOf(over.id?.toString()),
        );
        saveOrder(next);
        return next;
      });
    }
  }, []);

  const orderedWidgets = order
    .map((id) => WIDGET_CONFIGS.find((widget) => widget.id === id))
    .filter((widget): widget is WidgetConfig => widget !== undefined);

  return (
    <div>
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setIsEditMode((v) => !v)}
          className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
            isEditMode
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
          }`}
        >
          {isEditMode ? "Done" : "Edit"}
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
            {orderedWidgets.map((widget, index) => (
              <SortableWidget
                key={widget.id}
                config={widget}
                isEditMode={isEditMode}
                index={index}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
