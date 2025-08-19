import { useState } from "react";
import { createTask } from "../utils/api";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;
    const newTask = await createTask({ title, completed: false });
    onAdd(newTask);
    setTitle("");
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-white/20 dark:bg-gray-800/40 rounded-2xl shadow-lg backdrop-blur-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 rounded-lg bg-transparent border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
      >
        Add
      </button>
    </div>
  );
}
