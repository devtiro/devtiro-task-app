import { Task, TaskPriority, TaskStatus } from "@/types/task";

/** Standardized Error Response */
export interface ApiErrorResponseDto {
  error: string;
}

/** Standardized DTO representing a todo. */
export interface TodoResponseDto {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  priority: TaskPriority;
  status: TaskStatus;
}

/**
 * Maps a TodoResponseDto to a Todo.
 *
 * @param dto The TodoResponseDto object.
 * @returns The Todo object.
 */
export const todoResponseDtoToTodo = (dto: TodoResponseDto): Task => {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    priority: dto.priority,
    status: dto.status,
  };
};

/** A request to create a new task. */
export interface CreateTaskRequestDto {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface UpdateTaskRequestDto {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
}
