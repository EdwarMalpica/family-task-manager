"use client"

import { createContext, useContext, useState, type ReactNode, useRef, useEffect } from "react"

type Task = {
  id: string
  title: string
  assignee: string
  dueDate: string
  status: "pending" | "completed"
  recurring: string
  createdAt?: string
}

type TaskStats = {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  completionRate: number
  byAssignee: Record<string, { total: number; completed: number }>
}

type TaskContextType = {
  tasks: Task[]
  stats: TaskStats
  addTask: (task: Task) => void
  updateTask: (id: string, updatedTask: Partial<Task>) => void
  deleteTask: (id: string) => void
  restoreTask: () => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Take out the trash",
    assignee: "Dad",
    dueDate: "2023-05-15",
    status: "completed",
    recurring: "weekly",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Do the dishes",
    assignee: "Emma",
    dueDate: "2023-05-14",
    status: "pending",
    recurring: "daily",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Vacuum living room",
    assignee: "Mom",
    dueDate: "2023-05-16",
    status: "pending",
    recurring: "weekly",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Mow the lawn",
    assignee: "Dad",
    dueDate: "2023-05-20",
    status: "pending",
    recurring: "biweekly",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "Clean bedroom",
    assignee: "Jack",
    dueDate: "2023-05-13",
    status: "completed",
    recurring: "weekly",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    title: "Buy groceries",
    assignee: "Mom",
    dueDate: "2023-05-13",
    status: "completed",
    recurring: "weekly",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

type TaskProviderProps = {
  children: ReactNode
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [stats, setStats] = useState<TaskStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completionRate: 0,
    byAssignee: {},
  })

  // Calculate stats whenever tasks change
  useEffect(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.status === "completed").length
    const pendingTasks = totalTasks - completedTasks
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    // Calculate stats by assignee
    const byAssignee: Record<string, { total: number; completed: number }> = {}

    tasks.forEach((task) => {
      if (!byAssignee[task.assignee]) {
        byAssignee[task.assignee] = { total: 0, completed: 0 }
      }

      byAssignee[task.assignee].total++

      if (task.status === "completed") {
        byAssignee[task.assignee].completed++
      }
    })

    setStats({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      byAssignee,
    })
  }, [tasks])

  const addTask = (task: Task) => {
    const newTask = {
      ...task,
      createdAt: new Date().toISOString(),
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)))
  }

  const lastDeletedTask = useRef<Task | null>(null)

  const deleteTask = (taskId: string) => {
    lastDeletedTask.current = tasks.find((task) => task.id === taskId) || null
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const restoreTask = () => {
    if (lastDeletedTask.current) {
      setTasks((prevTasks) => [...prevTasks, lastDeletedTask.current!])
      lastDeletedTask.current = null
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, stats, addTask, updateTask, deleteTask, restoreTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}

