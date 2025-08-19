import { useEffect, useState } from "react";
import { getTasks } from "./utils/api";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleAdd = (newTask) => setTasks((prev) => [...prev, newTask]);
  const handleUpdate = (updated) =>
    setTasks((prev) =>
      prev.map((task) => (task.tid === updated.tid ? updated : task))
    );
  const handleDelete = (tid) =>
    setTasks((prev) => prev.filter((task) => task.tid !== tid));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Header />
        <TaskInput onAdd={handleAdd} />
        <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  );
}
