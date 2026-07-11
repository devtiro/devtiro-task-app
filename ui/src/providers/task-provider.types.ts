import { CreateTaskRequestDto, UpdateTaskRequestDto } from "@/lib/api.types";
import { Task } from "@/types/task";

/* The application context. */
export interface TaskContextType {
  /* True if the app is loading, false otherwise. */
  loading: boolean;
  /* The error message, if an error has occurred. */
  error: string | undefined;
  /* The list of all tasks. */
  tasks: Task[];
  /* Refresh the list of tasks. */
  refresh: () => Promise<void>;
  /* The selected task. */
  selectedTask: Task | undefined;
  /* Select a specific task. */
  selectTask: (id: string | undefined) => void;
  /* Create a new task. */
  createTask: (request: CreateTaskRequestDto) => Promise<Task>;
  /* Update an existing task. */
  updateTask: (id: string, request: UpdateTaskRequestDto) => Promise<Task>;
  /* Delete an existing task. */
  deleteTask: (id: string) => Promise<void>;
  /* Toggle the task status from OPEN to CLOSED, and back again. */
  toggleTaskStatus: (id: string) => Promise<void>;
}
