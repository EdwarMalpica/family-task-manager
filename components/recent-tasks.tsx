"use client";

import {
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Trash2,
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
import { useAlertDialog } from "@/contexts/AlertDialogContext";
import { toast } from "@/hooks/use-toast";
import { useTaskContext } from "@/contexts/TaskContext";

export function RecentTasks() {
  const { tasks, deleteTask, updateTask,restoreTask } = useTaskContext(); // ✅ Use Task Context
  const { showDialog } = useAlertDialog();

  // Delete Task Handler with Undo Support
  // const handleDeleteTask = (taskId: string) => {
  //   let undo = false;

  //   const taskIndex = tasks.findIndex((task) => task.id === taskId);
  //   const deletedTask = tasks[taskIndex];
  //   if (taskIndex === -1) return;

  //   deleteTask(taskId);

  //   const toastInstance = toast({
  //     title: "Task Deleted",
  //     description: "The task has been deleted",
  //     action: (
  //       <Button
  //         variant="default"
  //         size="sm"
  //         onClick={() => {
  //           undo = true;
  //           toastInstance.dismiss();
  //           console.log("Undo: Task restoration is not yet implemented in context");
  //         }}
  //       >
  //         Undo
  //       </Button>
  //     ),
  //   });

  //   setTimeout(() => {
  //     if (!undo) {
  //       console.log("Task permanently deleted");
  //     }
  //   }, 5000);
  // };


  const handleDeleteTask = (taskId: string) => {
    let undo = false;
  
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;
  
    deleteTask(taskId); // ✅ Delete the task
  
    const toastInstance = toast({
      title: "Task Deleted",
      description: "The task has been deleted",
      action: (
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            undo = true;
            restoreTask(); // ✅ Restore task when Undo is clicked
            toastInstance.dismiss();
          }}
        >
          Undo
        </Button>
      ),
    });
  
    // If Undo is not clicked within 5 seconds, permanently delete the task
    setTimeout(() => {
      if (!undo) {
        console.log("Task permanently deleted");
      }
    }, 5000);
  };


  // Toggle Task Completion Status
  const toggleTaskStatus = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    updateTask(id, {
      status: task.status === "completed" ? "pending" : "completed",
    });
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
          {tasks.length > 0 ? (
            tasks.map((task) => (
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
                    variant={task.status === "completed" ? "success" : "secondary"}
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
                        className="text-primary"
                        onClick={() =>
                          showDialog({
                            title: "Are you sure?",
                            description: "",
                            onConfirm: () => {
                              handleDeleteTask(task.id);
                            },
                          })
                        }
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
