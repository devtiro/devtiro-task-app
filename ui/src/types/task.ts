/** The status of the task. */
export enum TaskStatus {
  OPEN = "OPEN",
  COMPLETE = "COMPLETE",
}

/** The priority of the task. */
export enum TaskPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

/** A representation of a task. */
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
}
