import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { AlertCircleIcon, ChevronDownIcon } from "lucide-react";
import { toast } from "sonner";
import { useTasks } from "@/providers/task-provider";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Task, TaskPriority, TaskStatus } from "@/types/task";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

interface EditTaskDialogueProps {
  task: Task;
  isOpen: boolean;
  close: () => void;
}

/** Dialog used to edit a task */
const UpdateTodoListDialogue: React.FC<EditTaskDialogueProps> = ({
  task,
  isOpen,
  close,
}) => {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>(task.dueDate);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [status, setStatus] = useState<TaskStatus>(task.status);

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { updateTask } = useTasks();

  useEffect(() => {
    // Reset state
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setStatus(task.status);
    setErrorMessage(undefined);
  }, [isOpen]);

  /** Edit an existing task. */
  const handleCreateTodoList = async () => {
    setErrorMessage(undefined);

    try {
      const createdTodoList = await updateTask(task.id, {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        status: status,
      });
      console.log(`Task updated: ${JSON.stringify(createdTodoList)}`);
      toast.success("Task has been updated");
      close();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else if (typeof err === "string") {
        setErrorMessage(err);
      } else {
        setErrorMessage("Create task call failed, is the backend running?");
      }
    }
  };

  const handlePriorityChange = (value: string) => {
    let taskPriority = TaskPriority.MEDIUM;
    if (value === "HIGH") {
      taskPriority = TaskPriority.HIGH;
    } else if (value === "LOW") {
      taskPriority = TaskPriority.LOW;
    }
    setPriority(taskPriority);
  };

  const handleStatusChange = (value: string) => {
    let taskStatus = TaskStatus.OPEN;
    if (value === "COMPLETE") {
      taskStatus = TaskStatus.COMPLETE;
    }
    setStatus(taskStatus);
  };

  const isInputValid = () => title !== undefined && title.length > 1;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px] dark text-white">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>

        {errorMessage && (
          <Alert variant="destructive" className="bg-red-50">
            <AlertCircleIcon />
            <AlertTitle>Unable to update the task.</AlertTitle>
            <AlertDescription>
              <p>{errorMessage}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Title</Label>
            <Input
              name="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid="input-task-name"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="input-task-description"
            />
          </div>

          <div className="flex gap-2">
            {/* Due Date */}
            <div>
              <Label htmlFor="date">Due Date</Label>
              <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {dueDate ? dueDate.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    captionLayout="dropdown"
                    startMonth={new Date()}
                    endMonth={new Date(new Date().getFullYear() + 10, 11)} // 10 years ahead, December
                    onSelect={(date) => {
                      setDueDate(date);
                    }}
                    // Disable selecting dates in the past.
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Priority */}
            <div className="w-full">
              <Label htmlFor="date">Priority</Label>
              <Select value={priority} onValueChange={handlePriorityChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={TaskPriority.HIGH}>High</SelectItem>
                    <SelectItem value={TaskPriority.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={TaskPriority.LOW}>Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Status */}
            <div className="w-full">
              <Label htmlFor="date">Status</Label>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={TaskStatus.OPEN}>Open</SelectItem>
                    <SelectItem value={TaskStatus.COMPLETE}>
                      Complete
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-sky-500 text-white hover:bg-sky-600"
            disabled={!isInputValid()}
            onClick={handleCreateTodoList}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoListDialogue;
