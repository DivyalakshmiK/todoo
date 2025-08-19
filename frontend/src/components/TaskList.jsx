import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem";
import { Filter, ListTodo, CheckCircle } from "lucide-react";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.filter(task => !task.completed).length;

  const filterOptions = [
    { value: 'all', label: 'All', count: tasks.length, icon: ListTodo },
    { value: 'active', label: 'Active', count: activeCount, icon: CheckCircle },
    { value: 'completed', label: 'Completed', count: completedCount, icon: CheckCircle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-6"
    >
      {/* Filter Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
            Filter Tasks
          </span>
        </div>
        
        <div className="flex gap-2">
          {filterOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.value}
                onClick={() => setFilter(option.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                  ${filter === option.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                <Icon size={16} />
                {option.label}
                <span className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  ${filter === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }
                `}>
                  {option.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center"
            >
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                {filter === 'all' && (
                  <>
                    <ListTodo size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Start by adding your first task above!
                    </p>
                  </>
                )}
                {filter === 'active' && (
                  <>
                    <CheckCircle size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No active tasks</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      All tasks are completed! Great job!
                    </p>
                  </>
                )}
                {filter === 'completed' && (
                  <>
                    <CheckCircle size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No completed tasks</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Start completing some tasks to see them here!
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.tid}
                task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Summary */}
      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center"
        >
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredTasks.length} of {tasks.length} tasks
            {filter === 'all' && (
              <span className="block mt-1">
                {activeCount} remaining, {completedCount} completed
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
