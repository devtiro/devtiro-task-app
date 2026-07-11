import { useTasks } from "@/providers/task-provider";
import { useState } from "react";
import AppFrame from "./app-frame";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import UpdateTodoListDialogue from "./task-edit-dialog";
import DeleteTodoListDialogue from "./task-delete-dialog";
import CreateTodoDialogue from "./task-create-dialog";
import TodoCard from "./task-card";

function TaskManagement() {
  const [isCreateTodoOpen, setIsCreateTodoOpen] = useState(false);
  const [isEditTodoOpen, setIsEditTodoOpen] = useState(false);
  const [isDeleteTodoOpen, setIsDeleteTodoOpen] = useState(false);

  const { tasks, selectedTask, selectTask } = useTasks();

  return (
    <AppFrame>
      <div className="px-4 py-2 w-full flex flex-col h-full pb-12">
        {/* Header */}
        <div className="flex justify-between w-full border-b pt-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2 pr-2">Your Tasks</h1>
          </div>

          {/* Todo List Management Buttons */}
          <div className="flex gap-x-2">
            <p
              className="text-muted-foreground text-2xl px-2"
              data-testid="task-count-total"
            >
              {tasks.length}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 py-2">
          {tasks.map((todo) => (
            <TodoCard
              task={todo}
              key={todo.id}
              editTask={(task) => {
                selectTask(task.id);
                setIsEditTodoOpen(true);
              }}
              deleteTask={(task) => {
                selectTask(task.id);
                setIsDeleteTodoOpen(true);
              }}
            />
          ))}
        </div>

        <div className="py-4 border-t">
          <Button
            data-testid="button-create-task"
            onClick={() => setIsCreateTodoOpen(true)}
          >
            <PlusCircle /> Create Task
          </Button>
        </div>
      </div>
      <CreateTodoDialogue
        isOpen={isCreateTodoOpen}
        close={() => setIsCreateTodoOpen(false)}
      />
      {selectedTask && (
        <UpdateTodoListDialogue
          isOpen={isEditTodoOpen}
          close={() => {
            setIsEditTodoOpen(false);
            selectTask(undefined);
          }}
          task={selectedTask}
        />
      )}
      {selectedTask && (
        <DeleteTodoListDialogue
          isOpen={isDeleteTodoOpen}
          close={() => {
            setIsDeleteTodoOpen(false);
            selectTask(undefined);
          }}
          task={selectedTask}
        />
      )}
    </AppFrame>
  );
}

export default TaskManagement;
