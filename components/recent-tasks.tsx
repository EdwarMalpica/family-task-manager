"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Edit,
  MoreHorizontal,
  Trash2,
  User,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const tasks = [
  {
    id: "1",
    title: "Take out the trash",
    assignee: "Dad",
    dueDate: "2023-05-15",
    status: "completed",
    recurring: "weekly",
  },
  {
    id: "2",
    title: "Do the dishes",
    assignee: "Emma",
    dueDate: "2023-05-14",
    status: "pending",
    recurring: "daily",
  },
  {
    id: "3",
    title: "Vacuum living room",
    assignee: "Mom",
    dueDate: "2023-05-16",
    status: "pending",
    recurring: "weekly",
  },
  {
    id: "4",
    title: "Mow the lawn",
    assignee: "Dad",
    dueDate: "2023-05-20",
    status: "pending",
    recurring: "biweekly",
  },
  {
    id: "5",
    title: "Clean bedroom",
    assignee: "Jack",
    dueDate: "2023-05-13",
    status: "completed",
    recurring: "weekly",
  },
];

export function RecentTasks() {
  const [taskList, setTaskList] = useState(tasks);

  const deleteTask = (taskId: string) => {
    const tasks = taskList.filter((task) => {
      return task.id !== taskId;
    });
    setTaskList(tasks);
  };

  const toggleTaskStatus = (id: string) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  return (
    <div className="w-full overflow-scroll min-h-68 overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Recurring</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskList.length > 0 ? (
            taskList.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>
                  {new Date(task.dueDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {task.recurring}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.status === "completed" ? "success" : "secondary"
                    }
                    className="flex w-fit items-center gap-1"
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                    <span className="capitalize">{task.status}</span>
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                No tasks available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
