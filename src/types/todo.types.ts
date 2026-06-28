export type TodoPriority = "low" | "medium" | "high"; // TODO: приоритеты задач?

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
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}
