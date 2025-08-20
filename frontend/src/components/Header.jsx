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
          className="text-4xl md:text-5xl font-light text-slate-700 dark:text-slate-200 leading-relaxed text-center"
          style={{ fontFamily: 'Comfortaa, sans-serif' }}
        >
          Todoo
        </motion.h1>
        

      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg text-slate-500 dark:text-slate-400 font-normal max-w-md mx-auto text-center leading-relaxed"
        style={{ fontFamily: 'Nunito, sans-serif' }}
      >
        Nurture your goals with <span className="text-emerald-600 dark:text-emerald-400 font-medium">mindful intention</span> 🌱
      </motion.p>


    </motion.div>
  );
}
