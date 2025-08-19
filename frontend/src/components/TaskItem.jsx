import { motion } from "framer-motion";
import { completeTask, deleteTask } from "../utils/api";
import { CheckCircle, Trash } from "lucide-react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const handleComplete = async () => {
    const updated = await completeTask(task.tid);
    onUpdate(updated);
  };

  const handleDelete = async () => {
    await deleteTask(task.tid);
    onDelete(task.tid);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md"
    >
      <div className="flex items-center gap-3">
        <button onClick={handleComplete}>
          <CheckCircle
            className={`w-6 h-6 ${
              task.completed ? "text-green-500" : "text-gray-400"
            }`}
          />
        </button>
        <span
          className={`text-lg ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </span>
      </div>
      <button onClick={handleDelete}>
        <Trash className="w-5 h-5 text-red-500 hover:text-red-600" />
      </button>
    </motion.div>
  );
}
