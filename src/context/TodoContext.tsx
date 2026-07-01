import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
import type {
  TodoItem,
  TodoContextValue,
  TodoPriority,
} from "../types/todo.types";
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
    (text: string, priority: TodoPriority = "medium") => {
      const newItem: TodoItem = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        date: getTodayDate(),
        createdAt: new Date().toISOString(),
        priority,
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

  const reorderTodos = useCallback((activeId: string, overId: string) => {
    setItems((prev: TodoItem[]) => {
      const oldIndex = prev.findIndex((item: TodoItem) => item.id === activeId);
      const newIndex = prev.findIndex((item: TodoItem) => item.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const next = [...prev];
      const [removed] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, removed);
      saveTodos(next);
      return next;
    });
  }, []);

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
        reorderTodos,
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
