import { Task } from "@/types/task";
import {
  ApiErrorResponseDto,
  CreateTaskRequestDto,
  TodoResponseDto as TaskResponseDto,
  todoResponseDtoToTodo,
  UpdateTaskRequestDto,
} from "./api.types";

/**
 * Create a new task.
 *
 * @param request The request to create a new task.
 * @returns The created task.
 */
export const createTask = async (
  request: CreateTaskRequestDto,
): Promise<Task> => {
  const response = await fetch("/api/v1/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    let errorMessage: string | undefined;

    try {
      const errorResponse = (await response.json()) as ApiErrorResponseDto;
      errorMessage = errorResponse.error;
    } catch {
      errorMessage = `Request failed, is the backend running?: ${response.status} ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return todoResponseDtoToTodo((await response.json()) as TaskResponseDto);
};

/**
 * List all tasks.
 *
 * @returns The list of tasks.
 */
export const listTasks = async (): Promise<Task[]> => {
  const response = await fetch("/api/v1/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    try {
      const errorResponse = (await response.json()) as ApiErrorResponseDto;
      throw new Error(errorResponse.error);
    } catch {
      // If JSON parsing fails, use status text as fallback
      throw new Error(
        `Request failed, is the backend running?: ${response.status} ${response.statusText}`,
      );
    }
  }

  const dtos = (await response.json()) as TaskResponseDto[];
  return dtos.map((dto) => todoResponseDtoToTodo(dto));
};

/**
 * Update an existing task.
 *
 * @param todoId The ID of the task to update.
 * @param request The request to update the task.
 * @returns The updated task.
 */
export const updateTask = async (
  todoId: string,
  request: UpdateTaskRequestDto,
): Promise<Task> => {
  const response = await fetch(`/api/v1/tasks/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    try {
      const errorResponse = (await response.json()) as ApiErrorResponseDto;
      throw new Error(errorResponse.error);
    } catch {
      // If JSON parsing fails, use status text as fallback
      throw new Error(
        `Request failed, is the backend running?: ${response.status} ${response.statusText}`,
      );
    }
  }

  return todoResponseDtoToTodo((await response.json()) as TaskResponseDto);
};

/**
 * Delete an existing task.
 *
 * @param todoId The ID of the task to delete.
 */
export const deleteTask = async (todoId: string): Promise<void> => {
  const response = await fetch(`/api/v1/tasks/${todoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    try {
      const errorResponse = (await response.json()) as ApiErrorResponseDto;
      throw new Error(errorResponse.error);
    } catch {
      // If JSON parsing fails, use status text as fallback
      throw new Error(
        `Request failed, is the backend running?: ${response.status} ${response.statusText}`,
      );
    }
  }
};
