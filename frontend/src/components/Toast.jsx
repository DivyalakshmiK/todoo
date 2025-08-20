import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

const toastTypes = {
  success: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
  error: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" },
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
};

export default function Toast({ message, type = "info", isVisible, onClose, duration = 3000 }) {
  const toastConfig = toastTypes[type] || toastTypes.info;
  const Icon = toastConfig.icon;

  // Auto-hide after duration
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-24 right-6 z-50 max-w-sm"
        >
          <div className={`soft-card p-4 ${toastConfig.bg}`}>
            <div className="flex items-start gap-3">
              <Icon size={20} className={`${toastConfig.color} mt-0.5 flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {message}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/30 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 