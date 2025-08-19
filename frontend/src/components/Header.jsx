import { motion } from "framer-motion";
import { Sparkles, CheckSquare } from "lucide-react";

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center space-y-4"
    >
      {/* Main Title */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
        >
          Todo App
        </motion.h1>
        

      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-md mx-auto"
      >
        Organize your life, one task at a time
      </motion.p>


    </motion.div>
  );
}
