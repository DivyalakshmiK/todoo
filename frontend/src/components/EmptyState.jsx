import { motion } from "framer-motion";
import { ListTodo, Sparkles, ArrowUp } from "lucide-react";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-16 text-center"
    >
      <div>
        {/* Icon */}
        <div className="mb-6">
          <ListTodo size={80} className="text-gray-400 dark:text-gray-500 mx-auto" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          No tasks yet
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add your first task to get started with organizing your work.
        </p>

        {/* Call to action */}
        <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
          <ArrowUp size={20} />
          <span>Start adding tasks above</span>
        </div>
      </div>
    </motion.div>
  );
}
