import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SidebarCard from "./sidebar-card";
import { Calendar, Check, Inbox } from "lucide-react";
import { useTasks } from "@/providers/task-provider";
import { isToday } from "@/lib/date-util";
import { TaskStatus } from "@/types/task";

export function AppSidebar() {
  const { tasks } = useTasks();

  const totalTodoCount = tasks ? tasks.length : 0;

  const completedCount = tasks
    ? tasks.reduce(
        (todoAcc, todo) =>
          todo.status == TaskStatus.COMPLETE ? todoAcc + 1 : todoAcc,
        0,
      )
    : 0;

  const scheduledCount = tasks
    ? tasks.reduce((todoAcc, todo) => (todo.dueDate ? todoAcc + 1 : todoAcc), 0)
    : 0;

  const todayCount = tasks.reduce(
    (taskAcc, task) =>
      task.dueDate && isToday(task.dueDate) ? taskAcc + 1 : taskAcc,
    0,
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="font-bold text-xl pt-1">Devtiro Task App</h1>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <SidebarGroup className="border-b">
          <div className="grid grid-cols-2 gap-2">
            <SidebarCard
              Icon={Calendar}
              text="Today"
              value={todayCount}
              color="bg-blue-500"
            />
            <SidebarCard
              Icon={Calendar}
              text="Scheduled"
              value={scheduledCount}
              color="bg-red-500"
            />
            <SidebarCard
              Icon={Inbox}
              text="All"
              value={totalTodoCount}
              color="bg-white/25"
            />
            <SidebarCard
              Icon={Check}
              text="Completed"
              value={completedCount}
              color="bg-green-500"
              testId="task-completed-count"
            />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
