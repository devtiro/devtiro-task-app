import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { useTasks } from "@/providers/task-provider";
import { Task } from "@/types/task";

interface DeleteTodoListDialogueProps {
  task: Task;
  isOpen: boolean;
  close: () => void;
}

/** Dialog used to delete a todo list */
const DeleteTodoListDialogue: React.FC<DeleteTodoListDialogueProps> = ({
  task,
  isOpen,
  close,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { deleteTask } = useTasks();

  const handleDeleteTodoList = async () => {
    setErrorMessage(undefined);

    try {
      const createdTodoList = await deleteTask(task.id);
      console.log(`Task deleted: ${JSON.stringify(createdTodoList)}`);
      toast.success(`Task "${task.title}" has been deleted`);
      close();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else if (typeof err === "string") {
        setErrorMessage(err);
      } else {
        setErrorMessage("Delete task call failed, is the backend running?");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px] dark text-white">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>

        {errorMessage && (
          <Alert variant="destructive" className="bg-red-50">
            <AlertCircleIcon />
            <AlertTitle>Unable to delete task.</AlertTitle>
            <AlertDescription>
              <p>{errorMessage}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <p>Are you sure you want to delete "{task.title}"?</p>
          <p>This cannot be undone!</p>
        </div>
        <DialogFooter>
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            variant={"destructive"}
            onClick={handleDeleteTodoList}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTodoListDialogue;
