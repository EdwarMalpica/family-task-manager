"use client";

import { createContext, useContext, useState, ReactNode, useRef } from "react";

// Task Type Definition
type Task = {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: "pending" | "completed";
  recurring: "daily" | "weekly" | "biweekly";
};

// Analytics Type Definition
type AnalyticsData = {
  name: string;
  completed: number;
  total: number;
};

// Context Value Type
type TaskContextType = {
  tasks: Task[];
  analytics: AnalyticsData[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  restoreTask: () => void;
};

// Create Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Initial Data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Take out the trash....",
    assignee: "Dad",
    dueDate: "2023-05-15",
    status: "completed",
    recurring: "weekly",
  },
  {
    id: "2",
    title: "Do the dishes....",
    assignee: "Emma",
    dueDate: "2023-05-14",
    status: "pending",
    recurring: "daily",
  },
  {
    id: "3",
    title: "Vacuum living room....",
    assignee: "Mom",
    dueDate: "2023-05-16",
    status: "pending",
    recurring: "weekly",
  },
  {
    id: "4",
    title: "Mow the lawn....",
    assignee: "Dad",
    dueDate: "2023-05-20",
    status: "pending",
    recurring: "biweekly",
  },
  {
    id: "5",
    title: "Clean bedroom....",
    assignee: "Jack",
    dueDate: "2023-05-13",
    status: "completed",
    recurring: "weekly",
  },
];

const initialAnalytics: AnalyticsData[] = [
  { name: "Mon", completed: 4, total: 6 },
  { name: "Tue", completed: 3, total: 5 },
  { name: "Wed", completed: 5, total: 7 },
  { name: "Thu", completed: 2, total: 4 },
  { name: "Fri", completed: 6, total: 8 },
  { name: "Sat", completed: 4, total: 6 },
  { name: "Sun", completed: 3, total: 5 },
];

// Props Type for Provider
type TaskProviderProps = {
  children: ReactNode;
};

// Provider Component
export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [analytics] = useState<AnalyticsData[]>(initialAnalytics);

  // CRUD Operations
  const addTask = (task: Task) => setTasks((prevTasks) => [...prevTasks, task]);

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  // const deleteTask = (id: string) => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  // };

  // const [tasks, setTasks] = useState<Task[]>([]);

  // ✅ Store the last deleted task for Undo
  const lastDeletedTask = useRef<Task | null>(null);

  // ✅ Delete Task
  const deleteTask = (taskId: string) => {
    lastDeletedTask.current = tasks.find((task) => task.id === taskId) || null;
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // ✅ Restore Task
  const restoreTask = () => {
    if (lastDeletedTask.current) {
      setTasks((prevTasks) => [...prevTasks, lastDeletedTask.current!]);
      lastDeletedTask.current = null;
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, analytics, addTask, updateTask, deleteTask,restoreTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Custom Hook for Consuming Context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
