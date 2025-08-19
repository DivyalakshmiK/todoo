const API_URL = "http://127.0.0.1:8000";

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const completeTask = async (tid) => {
  const res = await fetch(`${API_URL}/complete/${tid}`, { method: "PUT" });
  return res.json();
};

export const updateTaskTitle = async (tid, title) => {
  const res = await fetch(`${API_URL}/tasks/title/${tid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const deleteTask = async (tid) => {
  const res = await fetch(`${API_URL}/tasks/${tid}`, { method: "DELETE" });
  return res.json();
};
