import { useEffect, useState } from "react";
import { getTasks } from "./utils/api";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import EmptyState from "./components/EmptyState";
import ThemeToggle from "./components/ThemeToggle";
import Toast from "./components/Toast";
import { motion } from "framer-motion";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "info", isVisible: false });

  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const showToast = (message, type = "info") => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleAdd = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    showToast("Task added successfully!", "success");
  };

  const handleUpdate = (updated) => {
    setTasks((prev) =>
      prev.map((task) => (task.tid === updated.tid ? updated : task))
    );
    if (updated.completed) {
      showToast("Task completed! Great job!", "success");
    } else {
      showToast("Task updated successfully!", "info");
    }
  };

  const handleDelete = (tid) => {
    setTasks((prev) => prev.filter((task) => task.tid !== tid));
    showToast("Task deleted successfully!", "info");
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={3000}
      />
      
      {/* Clean Background */}
      <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <Header />
          
          {/* Stats Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {totalTasks}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Total Tasks
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {completedTasks}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Completed
                </div>
              </div>
            </div>
            {totalTasks > 0 && (
              <div className="mt-6">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                  {Math.round((totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0))}% Complete
                </div>
              </div>
            )}
          </div>

          <TaskInput onAdd={handleAdd} />
          
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <div className="space-y-4">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Loading tasks...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Please wait a moment
                  </p>
                </div>
              </div>
            </div>
          ) : tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
