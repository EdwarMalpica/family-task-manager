// "use client";

// import {
//   createContext,
//   useContext,
//   ReactNode,
//   useState,
//   useCallback,
// } from "react";
// import { Task, TaskStatus } from "../types/task";
// import { v4 as uuidv4 } from "uuid";

// interface TasksContextType {
//   tasks: Task[];
//   addTask: (
//     title: string,
//     description: string | undefined,
//     assignee: string
//   ) => void;
//   updateTask: (
//     id: string,
//     updates: Partial<Omit<Task, "id" | "createdAt">>
//   ) => void;
//   deleteTask: (id: string) => void;
//   updateTaskStatus: (id: string, status: TaskStatus) => void;
//   updateTaskAssignee: (id: string, assignee: string) => void;
//   getTasksByAssignee: (assignee: string) => Task[];
//   getTasksByStatus: (status: TaskStatus) => Task[];
// }

// // Create the context with a default undefined value
// const TasksContext = createContext<TasksContextType | undefined>(undefined);

// // Create the Provider component
// export function TasksProvider({
//   children,
//   initialTasks = [],
// }: {
//   children: ReactNode;
//   initialTasks?: Task[];
// }) {
//   const [tasks, setTasks] = useState<Task[]>(initialTasks);

//   const addTask = useCallback(
//     (title: string, description: string | undefined, assignee: string) => {
//       const newTask: Task = {
//         id: uuidv4(),
//         title,
//         description,
//         assignee,
//         status: "pending",
//         createdAt: new Date(),
//       };

//       setTasks((prevTasks) => [...prevTasks, newTask]);
//     },
//     []
//   );

//   const updateTask = useCallback(
//     (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
//         )
//       );
//     },
//     []
//   );

//   const deleteTask = useCallback((id: string) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//   }, []);

//   const updateTaskStatus = useCallback(
//     (id: string, status: TaskStatus) => {
//       updateTask(id, { status });
//     },
//     [updateTask]
//   );

//   const updateTaskAssignee = useCallback(
//     (id: string, assignee: string) => {
//       updateTask(id, { assignee });
//     },
//     [updateTask]
//   );

//   const getTasksByAssignee = useCallback(
//     (assignee: string) => {
//       return tasks.filter((task) => task.assignee === assignee);
//     },
//     [tasks]
//   );

//   const getTasksByStatus = useCallback(
//     (status: TaskStatus) => {
//       return tasks.filter((task) => task.status === status);
//     },
//     [tasks]
//   );

//   const value = {
//     tasks,
//     addTask,
//     updateTask,
//     deleteTask,
//     updateTaskStatus,
//     updateTaskAssignee,
//     getTasksByAssignee,
//     getTasksByStatus,
//   };

//   return (
//     <TasksContext.Provider value={value} > {children} </TasksContext.Provider>
//   );
// }

// export function useTasks() {
//   const context = useContext(TasksContext);
//   if (context === undefined) {
//     throw new Error("useTasks must be used within a TasksProvider");
//   }
//   return context;
// }
