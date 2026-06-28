import { useState, type FC, type FormEvent } from "react";
import { useTodo } from "../../context/TodoContext";
import { Tooltip } from "../../components/Tooltip";

export const TodoWidget: FC = () => {
  const { todayItems, addTodo, toggleTodo, removeTodo } = useTodo();
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
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

      <ul className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 [scrollbar-width:thin] [scrollbar-color:#D1D5DB_transparent] dark:[scrollbar-color:#4B5563_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
        {todayItems.length === 0 && (
          <li className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
            No tasks yet — add one below!
          </li>
        )}
        {todayItems.map((item) => (
          <li key={item.id} className="flex items-start gap-2 group">
            <button
              onClick={() => toggleTodo(item.id)}
              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                item.completed
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
              }`}
            >
              {item.completed && (
                <span className="text-xs leading-none">✓</span>
              )}
            </button>

            <Tooltip
              content={item.text}
              delay={1000}
              className="flex-1 min-w-0"
            >
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
              onClick={() => removeTodo(item.id)}
              className="mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs transition-opacity"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

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
