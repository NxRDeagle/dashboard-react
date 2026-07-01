export type TodoPriority = "low" | "medium" | "high";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  createdAt: string;
  priority: TodoPriority;
}

export interface TodoContextValue {
  items: TodoItem[];
  todayItems: TodoItem[];
  todayProgress: number;
  addTodo: (text: string, priority?: TodoPriority) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  reorderTodos: (activeId: string, overId: string) => void;
}

export interface SortableTodoItemProps {
  item: TodoItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}
