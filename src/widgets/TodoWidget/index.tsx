import { useState, type FC } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTodo } from "../../context/TodoContext";
import { SortableTodoItem } from "../../components/SortableTodoItem";

export const TodoWidget: FC = () => {
  const { todayItems, addTodo, toggleTodo, removeTodo, reorderTodos } =
    useTodo();
  const [input, setInput] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderTodos(active.id?.toString(), over.id?.toString());
    }
  };

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    addTodo(text);
    setInput("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col overflow-hidden">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 flex-shrink-0">
        Today's Tasks
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todayItems.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 [scrollbar-width:thin] [scrollbar-color:#D1D5DB_transparent] dark:[scrollbar-color:#4B5563_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
            {todayItems.length === 0 && (
              <li className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                No tasks yet — add one below!
              </li>
            )}
            {todayItems.map((item) => (
              <SortableTodoItem
                key={item.id}
                item={item}
                onToggle={toggleTodo}
                onRemove={removeTodo}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4 flex-shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
};
