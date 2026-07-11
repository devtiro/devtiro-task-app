import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { TaskContextType } from "./task-provider.types";
import { Task, TaskStatus } from "@/types/task";
import {
  createTask as callCreateTask,
  listTasks as callListTasks,
  deleteTask as callDeleteTask,
  updateTask as callUpdateTask,
} from "@/lib/api";
import { CreateTaskRequestDto, UpdateTaskRequestDto } from "@/lib/api.types";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TodoListProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  /** Refresh the list of todos. */
  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);
      setTasks(await callListTasks());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  /** Create a new task. */
  const createTask = useCallback(
    async (request: CreateTaskRequestDto) => {
      try {
        setError(undefined);
        const newList = await callCreateTask(request);
        await refresh();
        return newList;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create task");
        throw err;
      }
    },
    [refresh],
  );

  /** Update an existing task. */
  const updateTask = useCallback(
    async (id: string, request: UpdateTaskRequestDto) => {
      try {
        setError(undefined);
        const newList = await callUpdateTask(id, request);
        await refresh();
        if (selectedTask && selectedTask.id === id) {
          setSelectedTask(newList);
        }
        return newList;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update task");
        throw err;
      }
    },
    [refresh],
  );

  /** Delete an existing task. */
  const deleteTask = useCallback(
    async (id: string) => {
      try {
        setError(undefined);
        await callDeleteTask(id);
        await refresh();
        setSelectedTask(undefined);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete task");
        throw err;
      }
    },
    [refresh],
  );

  /** Selects an existing task so that components may reference it. */
  const selectTask = useCallback(
    (id: string | undefined) => {
      if (id === undefined) {
        setSelectedTask(undefined);
      } else {
        const task = tasks.find((list) => list.id === id);
        setSelectedTask(task || undefined);
      }
    },
    [tasks],
  );

  /** Update an existing task. */
  const toggleTaskStatus = useCallback(
    async (id: string) => {
      if (id !== undefined) {
        try {
          setError(undefined);
          const task = tasks.find((list) => list.id === id);
          if (task !== undefined) {
            task.status =
              TaskStatus.OPEN === task?.status
                ? TaskStatus.COMPLETE
                : TaskStatus.OPEN;
            await callUpdateTask(id, task);
            await refresh();
          }
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to update task",
          );
          throw err;
        }
      }
    },
    [tasks, refresh],
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <TaskContext.Provider
      value={{
        loading,
        error,
        tasks,
        refresh,
        selectedTask,
        selectTask,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTodoLists must be used within a TodoListProvider");
  }
  return context;
}
