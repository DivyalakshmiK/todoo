import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
    >
      ✨ My Todo List
    </motion.h1>
  );
}
