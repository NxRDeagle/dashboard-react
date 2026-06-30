import type { FC, CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SortableTodoItemProps } from "../../types/todo.types";
import { Tooltip } from "../Tooltip";
import { DragHandle } from "../DragHandle";

export const SortableTodoItem: FC<SortableTodoItemProps> = ({ item, onToggle, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <li ref={setNodeRef} style={style} className="flex items-start gap-2 group">
      <button
        className="mt-0.5 flex-shrink-0 cursor-grab active:cursor-grabbing touch-none opacity-0 group-hover:opacity-100 transition-opacity"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <DragHandle />
      </button>

      <button
        onClick={() => onToggle(item.id)}
        className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          item.completed
            ? "bg-blue-500 border-blue-500 text-white"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
        }`}
      >
        {item.completed && <span className="text-xs leading-none">✓</span>}
      </button>

      <Tooltip content={item.text} delay={1000} className="flex-1 min-w-0">
        <span
          className={`text-sm truncate block ${
            item.completed
              ? "line-through text-gray-400 dark:text-gray-600"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {item.text}
        </span>
      </Tooltip>

      <button
        onClick={() => onRemove(item.id)}
        className="mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs transition-opacity"
      >
        ✕
      </button>
    </li>
  );
};
