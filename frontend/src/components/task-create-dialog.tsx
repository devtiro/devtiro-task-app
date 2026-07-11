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
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon, ChevronDownIcon } from "lucide-react";
import { toast } from "sonner";
import { useTasks } from "@/providers/task-provider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TaskPriority, TaskStatus } from "@/types/task";
import { CreateTaskRequestDto } from "@/lib/api.types";

interface CreateTodoDialogueProps {
  isOpen: boolean;
  close: () => void;
}

const CreateTodoDialogue: React.FC<CreateTodoDialogueProps> = ({
  isOpen,
  close,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { createTask } = useTasks();

  useEffect(() => {
    // Reset state
    setTitle("");
    setDescription("");
    setDueDateOpen(false);
    setDueDate(undefined);
    setPriority(TaskPriority.MEDIUM);
    setErrorMessage(undefined);
  }, [isOpen]);

  /** Create a new task. */
  const handleCreateTodoList = async () => {
    setErrorMessage(undefined);

    try {
      const createTaskRequest: CreateTaskRequestDto = {
        title: title,
        description: description,
        dueDate: dueDate,
        status: TaskStatus.OPEN,
        priority: priority,
      };
      await createTask(createTaskRequest);
      toast.success("Task has been created!");
      close();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else if (typeof err === "string") {
        setErrorMessage(err);
      } else {
        setErrorMessage(
          "Create task call failed, is the backend running?",
        );
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

  const isInputValid = () => title !== undefined && title.length > 1;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px] dark text-white">
        <DialogHeader>
          <DialogTitle>Create a New Task</DialogTitle>
        </DialogHeader>

        {errorMessage && (
          <Alert variant="destructive" className="bg-red-50">
            <AlertCircleIcon />
            <AlertTitle>Unable to create task.</AlertTitle>
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
              data-testid="input-task-name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Description</Label>
            <Textarea
              data-testid="input-task-description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            {/* Due Date */}
            <div>
              <Label htmlFor="date">Due Date</Label>
              <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    data-testid="button-open-due-date-cal"
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
                      setDueDateOpen(false);
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
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoDialogue;
