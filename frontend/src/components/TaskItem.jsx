import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { completeTask, deleteTask, updateTaskTitle } from "../utils/api";
import { CheckCircle, Trash, Edit3, Save, X, Clock, Check } from "lucide-react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const updated = await completeTask(task.tid);
      onUpdate(updated);
    } catch (error) {
      console.error('Failed to complete task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await deleteTask(task.tid);
      onDelete(task.tid);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleSave = async () => {
    if (!editTitle.trim() || editTitle === task.title) {
      setIsEditing(false);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const updated = await updateTaskTitle(task.tid, editTitle.trim());
      onUpdate(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 group"
    >
      <div className="flex items-center gap-4">
        {/* Complete Button */}
        <motion.button
          onClick={handleComplete}
          disabled={isSubmitting}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            relative p-2 rounded-full transition-all duration-300 ease-out
            ${task.completed 
              ? 'text-green-500 bg-green-100 dark:bg-green-900/30' 
              : 'text-gray-400 hover:text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
            }
          `}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
            />
          ) : task.completed ? (
            <CheckCircle size={24} />
          ) : (
            <Clock size={24} />
          )}
        </motion.button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyPress={handleKeyPress}
                                     className="flex-1 px-3 py-2 bg-transparent border-b-2 border-blue-500 outline-none text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                />
                <motion.button
                  onClick={handleSave}
                  disabled={!editTitle.trim() || isSubmitting}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full transition-colors"
                >
                  <Save size={20} />
                </motion.button>
                <motion.button
                  onClick={handleCancel}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900/30 rounded-full transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3"
              >
                <span
                  className={`
                    text-lg font-medium transition-all duration-300
                    ${task.completed 
                      ? 'line-through text-gray-500 dark:text-gray-400' 
                      : 'text-gray-900 dark:text-gray-100'
                    }
                  `}
                >
                  {task.title}
                </span>
                
                {task.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full"
                  >
                    <Check size={12} />
                    Done
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {!task.completed && (
            <motion.button
              onClick={handleEdit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full transition-colors"
            >
              <Edit3 size={20} />
            </motion.button>
          )}
          
          <motion.button
            onClick={handleDelete}
            disabled={isSubmitting}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              />
            ) : (
              <Trash size={20} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
