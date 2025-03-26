export type TaskStatus = "pending" | "completed"

export interface Task {
  id: string
  title: string
  assignee: string
  dueDate: string
  status: TaskStatus
  recurring: string
  description?: string
  createdAt?: string
}

