import type { FC, CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SortableWidgetProps } from "../../types/widget.types";
import { ErrorBoundary } from "../ErrorBoundary";

export const SortableWidget: FC<SortableWidgetProps> = ({
  config,
  isEditMode,
  index,
}) => {
  const { id, component: Widget } = config;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !isEditMode });

  const outerStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.6 : 1,
  };

  const innerStyle: CSSProperties = {
    animationDelay: isEditMode ? `${(index % 4) * 0.06}s` : undefined,
    height: "100%",
  };

  return (
    <div ref={setNodeRef} style={outerStyle} {...attributes} {...listeners}>
      <div
        style={innerStyle}
        className={isEditMode && !isDragging ? "wobbling" : undefined}
      >
        <ErrorBoundary>
          <Widget />
        </ErrorBoundary>
      </div>
    </div>
  );
};
