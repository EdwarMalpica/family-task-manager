"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Trash2 } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useAlertDialog } from "@/contexts/AlertDialogContext";
import { toast } from "@/hooks/use-toast";
import { useTaskContext } from "@/contexts/TaskContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function RecentTasks() {
  const { tasks, deleteTask, updateTask, restoreTask } = useTaskContext();
  const { showDialog } = useAlertDialog();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Calculate paginated tasks
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const paginatedTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handleDeleteTask = (taskId: string) => {
    let undo = false;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    deleteTask(taskId);

    const toastInstance = toast({
      title: "Task Deleted",
      description: "The task has been deleted",
      action: (
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            undo = true;
            restoreTask();
            toastInstance.dismiss();
          }}
        >
          Undo
        </Button>
      ),
    });

    setTimeout(() => {
      if (!undo) {
      }
    }, 5000);
  };

  const toggleTaskStatus = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    updateTask(id, {
      status: task.status === "completed" ? "pending" : "completed",
    });
  };

  return (
    <div className="w-full overflow-scroll min-h-68 overflow-y-scroll overflow-x-scroll">
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
          {paginatedTasks.length > 0 ? (
            paginatedTasks.map((task) => (
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
                <TableCell className="flex justify-center">
                  <Trash2
                    className="h-4 w-4 cursor-pointer hover:opacity-50 delay-200 ease-in-out"
                    onClick={() =>
                      showDialog({
                        title: "Delete Task?",
                        description:
                          "Are you sure you want to delete the task?",
                        onConfirm: () => {
                          handleDeleteTask(task.id);
                        },
                      })
                    }
                  />
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="flex flex-col justify-end items-center">
          <PaginationContent>
            <PaginationItem>
              {/* <PaginationPrevious
                // href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              /> */}
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i} className="cursor-pointer">
                <PaginationLink
                  // href="#"
                  isActive={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* {totalPages > 2 && <PaginationEllipsis />} */}

            <PaginationItem>
              {/* <PaginationNext
                // href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              /> */}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
