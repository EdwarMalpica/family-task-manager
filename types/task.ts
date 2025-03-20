// // types/task.ts

// // Define the possible task statuses
// export type TaskStatus = 'done' | 'pending';

// // Define the Task interface
// export interface Task {
//   id: string;
//   title: string;
//   description?: string;
//   assignee: string;
//   status: TaskStatus;
//   createdAt: Date;
//   updatedAt?: Date;
// }

// // Optional: You might want to define a type for task creation
// export type TaskCreationParams = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
//   status?: TaskStatus;
// };

// // Optional: You might want to define a type for task updates
// export type TaskUpdateParams = Partial<Omit<Task, 'id' | 'createdAt'>>;



export type TaskStatus = 'done' | 'pending';

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt?: Date;
}
