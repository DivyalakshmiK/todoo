import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <motion.div className="space-y-3 mt-6">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.tid}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
