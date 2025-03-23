export type TaskStatus = "done" | "pending"

export interface Task {
  id: string
  title: string
  description?: string
  assignee: string
  status: TaskStatus
  createdAt: Date
  updatedAt?: Date
}

