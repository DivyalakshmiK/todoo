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
      
      {/* Dynamic Background */}
      <div className="fixed inset-0">
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        
        {/* Theme-based gradient overlay */}
        <div className="absolute inset-0">
          {/* Dark mode overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/30 to-purple-900/20"></div>
        </div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(134, 239, 172, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(56, 189, 248, 0.05) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-6">
        {/* Header - Centered Horizontally */}
        <div className="max-w-7xl mx-auto mb-8">
          <Header />
        </div>
        
        <div className="max-w-7xl mx-auto flex gap-8 h-[80vh]">
          {/* Left Sidebar - Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-80 flex-shrink-0"
          >
            <div className="sticky top-52 space-y-6">
              {/* Stats Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="soft-card p-6"
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-light text-slate-700 dark:text-slate-200 mb-2 soft-glow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      style={{ fontFamily: 'Comfortaa, sans-serif' }}
                    >
                      {totalTasks}
                    </motion.div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                      Total Tasks
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-light text-emerald-600 dark:text-emerald-400 mb-2 soft-glow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      style={{ fontFamily: 'Comfortaa, sans-serif' }}
                    >
                      {completedTasks}
                    </motion.div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                      Completed
                    </div>
                  </div>
                  
                  {totalTasks > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                    >
                      <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-emerald-300 to-teal-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                          transition={{ duration: 1.2, delay: 1.2 }}
                        ></motion.div>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-3 font-medium text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {Math.round((totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0))}% Complete
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Main Content */}
          <div className="flex-1 flex flex-col justify-start pt-8">
            <div className="space-y-6">
              <TaskInput onAdd={handleAdd} />
              
              {loading ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="soft-card p-16 text-center"
                >
                  <div className="space-y-6">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-3 border-slate-300 dark:border-slate-600 border-t-emerald-400 dark:border-t-emerald-500 rounded-full mx-auto"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-2" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                        Loading your peaceful workspace...
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        Taking a moment to organize your thoughts
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : tasks.length === 0 ? (
                <EmptyState />
              ) : (
                <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
