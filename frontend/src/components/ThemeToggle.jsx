import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Monitor } from "lucide-react";

export default function ThemeToggle() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const savedBackground = localStorage.getItem('backgroundIndex') || '0';
    setBackgroundIndex(parseInt(savedBackground));
    applyBackground(parseInt(savedBackground));
    
    // Always set dark mode
    document.documentElement.classList.add('dark');
  }, []);

  const applyBackground = (index) => {
    const body = document.body;
    const backgroundName = `bg${index + 1}`;
    body.setAttribute('data-background', backgroundName);
  };

  const handleBackgroundChange = () => {
    const newIndex = (backgroundIndex + 1) % 3;
    setBackgroundIndex(newIndex);
    localStorage.setItem('backgroundIndex', newIndex.toString());
    applyBackground(newIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-700/50 p-2">
        <motion.button
          onClick={handleBackgroundChange}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3 rounded-xl transition-all duration-300 ease-out group"
          title="Background: Cycle backgrounds"
        >
          <Monitor size={20} className="text-gray-300" />
          
          {/* Background indicator */}
          <motion.div
            layoutId="activeBackground"
            className={`absolute inset-0 rounded-xl -z-10 ${
              backgroundIndex === 0 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
              backgroundIndex === 1 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
              'bg-gradient-to-r from-purple-400 to-pink-500'
            }`}
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
} 