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
      
      {/* Peaceful Calming Background */}
      <div className="fixed inset-0">
        {/* Soft gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
        
        {/* Gentle floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 left-16 w-64 h-64 bg-gradient-to-r from-emerald-100/60 to-teal-100/60 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute top-64 right-32 w-80 h-80 bg-gradient-to-r from-sky-100/50 to-cyan-100/50 rounded-full filter blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-r from-violet-100/40 to-purple-100/40 rounded-full filter blur-3xl animate-float animation-delay-1000"></div>
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
        <div className="max-w-4xl mx-auto space-y-8">
          <Header />
          
          {/* Peaceful Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="soft-card p-8"
          >
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <motion.div 
                  className="text-4xl font-light text-slate-700 mb-2 soft-glow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ fontFamily: 'Comfortaa, sans-serif' }}
                >
                  {totalTasks}
                </motion.div>
                <div className="text-sm text-slate-500 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Total Tasks
                </div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-4xl font-light text-emerald-600 mb-2 soft-glow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{ fontFamily: 'Comfortaa, sans-serif' }}
                >
                  {completedTasks}
                </motion.div>
                <div className="text-sm text-slate-500 font-medium" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Completed
                </div>
              </div>
            </div>
            {totalTasks > 0 && (
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="w-full bg-slate-200/50 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-emerald-300 to-teal-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                    transition={{ duration: 1.2, delay: 1 }}
                  ></motion.div>
                </div>
                <div className="text-sm text-slate-600 mt-3 font-medium text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {Math.round((totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0))}% Complete
                </div>
              </motion.div>
            )}
          </motion.div>

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
                    className="w-12 h-12 border-3 border-slate-300 border-t-emerald-400 rounded-full mx-auto"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                    Loading your peaceful workspace...
                  </h3>
                  <p className="text-slate-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
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
  );
}
