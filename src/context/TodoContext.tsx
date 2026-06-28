import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
import type { TodoItem, TodoContextValue } from "../types/todo.types";
import { STORAGE_KEYS } from "../constants/storage";

const TodoContext = createContext<TodoContextValue | null>(null);

function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadTodos(): TodoItem[] {
  const raw = localStorage.getItem(STORAGE_KEYS.todos);
  if (!raw) return [];
  return JSON.parse(raw) as TodoItem[];
}

function saveTodos(items: TodoItem[]): void {
  localStorage.setItem(STORAGE_KEYS.todos, JSON.stringify(items));
}

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<TodoItem[]>(loadTodos);

  const updateItems = useCallback((updated: TodoItem[]) => {
    setItems(updated);
    saveTodos(updated);
  }, []);

  const addTodo = useCallback(
    (text: string) => {
      const newItem: TodoItem = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        date: getTodayDate(),
        createdAt: new Date().toISOString(),
        priority: "medium",
      };
      updateItems([...items, newItem]);
    },
    [items, updateItems],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      updateItems(
        items.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item,
        ),
      );
    },
    [items, updateItems],
  );

  const removeTodo = useCallback(
    (id: string) => {
      updateItems(items.filter((item) => item.id !== id));
    },
    [items, updateItems],
  );

  const todayItems = useMemo(
    () => items.filter((item) => item.date === getTodayDate()),
    [items],
  );

  const todayProgress = useMemo(() => {
    if (todayItems.length === 0) return 0;
    return Math.round(
      (todayItems.filter((item) => item.completed).length / todayItems.length) *
        100,
    );
  }, [todayItems]);

  return (
    <TodoContext.Provider
      value={{
        items,
        todayItems,
        todayProgress,
        addTodo,
        toggleTodo,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextValue => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used within TodoProvider");
  return ctx;
};
