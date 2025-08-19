import { useState } from "react";
import { motion } from "framer-motion";
import { createTask } from "../utils/api";
import { Plus, Sparkles } from "lucide-react";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!title.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const newTask = await createTask({ title: title.trim(), completed: false });
      onAdd(newTask);
      setTitle("");
      
      // Success animation
      const input = document.querySelector('.task-input');
      if (input) {
        input.classList.add('animate-pulse');
        setTimeout(() => input.classList.remove('animate-pulse'), 1000);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
      setError('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
    if (error) setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={title}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="What would you like to accomplish today?"
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={isSubmitting}
            />
            

          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            disabled={!title.trim() || isSubmitting}
            className={`
              px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200
              ${title.trim() && !isSubmitting 
                ? 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md' 
                : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Plus size={20} className="inline mr-2" />
                Add Task
              </>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 dark:text-red-400 text-sm px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/30"
          >
            {error}
          </motion.div>
        )}

        {/* Character count */}
        {title.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center text-sm"
          >
            <span className={`${title.length > 100 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
              {title.length}/100 characters
            </span>
            {title.length > 80 && (
              <span className="text-orange-500">
                {title.length > 100 ? 'Too long!' : 'Getting long...'}
              </span>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
