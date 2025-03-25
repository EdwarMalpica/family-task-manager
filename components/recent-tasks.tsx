"use client";

import { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  Clock,
  Trash2,
  Filter,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
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
import { Checkbox } from "@/components/ui/checkbox";
import { useAlertDialog } from "@/contexts/alert-dialog-context";
import { toast } from "sonner";
import { useTaskContext } from "@/contexts/task-context";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecentTasksProps {
  searchQuery?: string;
}

type SortConfig = {
  key: string;
  direction: "asc" | "desc" | null;
};

export function RecentTasks({ searchQuery = "" }: RecentTasksProps) {
  const { tasks, deleteTask, updateTask, restoreTask } = useTaskContext();
  const { showDialog } = useAlertDialog();
  const tableRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [assigneeFilter, setAssigneeFilter] = useState<string[]>([]);
  const [recurringFilter, setRecurringFilter] = useState<string[]>([]);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: null,
  });

  const uniqueAssignees = [...new Set(tasks.map((task) => task.assignee))];
  const uniqueRecurring = [...new Set(tasks.map((task) => task.recurring))];

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortConfig.key || sortConfig.direction === null) return 0;

    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];

    if (sortConfig.key === "dueDate") {
      return sortConfig.direction === "asc"
        ? new Date(aValue as string).getTime() -
            new Date(bValue as string).getTime()
        : new Date(bValue as string).getTime() -
            new Date(aValue as string).getTime();
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  const getSortDirectionIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />;
    }

    if (sortConfig.direction === "asc") {
      return <ArrowUp className="h-4 w-4 ml-1" />;
    }

    if (sortConfig.direction === "desc") {
      return <ArrowDown className="h-4 w-4 ml-1" />;
    }

    return <ArrowUpDown className="h-4 w-4 ml-1" />;
  };

  const filteredTasks = sortedTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(task.status);

    const matchesAssignee =
      assigneeFilter.length === 0 || assigneeFilter.includes(task.assignee);

    const matchesRecurring =
      recurringFilter.length === 0 || recurringFilter.includes(task.recurring);

    return (
      matchesSearch && matchesStatus && matchesAssignee && matchesRecurring
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, assigneeFilter, recurringFilter]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handlePageChange = (newPage: number) => {
    const scrollPosition = window.scrollY;

    setCurrentPage(newPage);

    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  const handleDeleteTask = (taskId: string) => {
    let undo = false;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    deleteTask(taskId);

    toast("Task Deleted", {
      description: "The task has been deleted",
      action: {
        label: "Undo",
        onClick: () => {
          undo = true;
          restoreTask();
        },
      },
      duration: 5000,
      onAutoClose: () => {
        if (!undo) {
        }
      },
    });
  };

  const toggleTaskStatus = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    updateTask(id, {
      status: task.status === "completed" ? "pending" : "completed",
    });
  };

  return (
    <div className="w-full min-h-[400px]" ref={tableRef}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div className="flex flex-wrap gap-2">
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("completed")}
                onCheckedChange={(checked) => {
                  setStatusFilter((prev) =>
                    checked
                      ? [...prev, "completed"]
                      : prev.filter((s) => s !== "completed")
                  );
                }}
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("pending")}
                onCheckedChange={(checked) => {
                  setStatusFilter((prev) =>
                    checked
                      ? [...prev, "pending"]
                      : prev.filter((s) => s !== "pending")
                  );
                }}
              >
                Pending
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Assignee Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                Assignee
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {uniqueAssignees.map((assignee) => (
                <DropdownMenuCheckboxItem
                  key={assignee}
                  checked={assigneeFilter.includes(assignee)}
                  onCheckedChange={(checked) => {
                    setAssigneeFilter((prev) =>
                      checked
                        ? [...prev, assignee]
                        : prev.filter((a) => a !== assignee)
                    );
                  }}
                >
                  {assignee}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Recurring Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                Frequency
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {uniqueRecurring.map((recurring) => (
                <DropdownMenuCheckboxItem
                  key={recurring}
                  checked={recurringFilter.includes(recurring)}
                  onCheckedChange={(checked) => {
                    setRecurringFilter((prev) =>
                      checked
                        ? [...prev, recurring]
                        : prev.filter((r) => r !== recurring)
                    );
                  }}
                >
                  {recurring}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters */}
          {(statusFilter.length > 0 ||
            assigneeFilter.length > 0 ||
            recurringFilter.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8"
              onClick={() => {
                setStatusFilter([]);
                setAssigneeFilter([]);
                setRecurringFilter([]);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="w-full overflow-auto min-h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("title")}
              >
                <div className="flex items-center">
                  Task {getSortDirectionIcon("title")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("assignee")}
              >
                <div className="flex items-center">
                  Assignee {getSortDirectionIcon("assignee")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("dueDate")}
              >
                <div className="flex items-center">
                  Due Date {getSortDirectionIcon("dueDate")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("recurring")}
              >
                <div className="flex items-center">
                  Recurring {getSortDirectionIcon("recurring")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("status")}
              >
                <div className="flex items-center">
                  Status {getSortDirectionIcon("status")}
                </div>
              </TableHead>
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
                  <TableCell className="text-right">
                    <Trash2
                      className="h-4 w-4 cursor-pointer hover:opacity-50 delay-200 ease-in-out ml-auto"
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
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-500 py-4"
                >
                  {searchQuery ||
                  statusFilter.length > 0 ||
                  assigneeFilter.length > 0 ||
                  recurringFilter.length > 0
                    ? "No tasks match your filters"
                    : "No tasks available"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              >
                <span className="sr-only">Go to previous page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </Button>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i} className="cursor-pointer">
                <Button
                  variant={i + 1 === currentPage ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(i + 1)}
                  className="h-8 w-8"
                >
                  {i + 1}
                </Button>
              </PaginationItem>
            ))}

            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              >
                <span className="sr-only">Go to next page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
