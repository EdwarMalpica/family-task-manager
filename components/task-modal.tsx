"use client"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { CalendarIcon } from "lucide-react"
import { useTaskContext } from "@/contexts/task-context"
import { formatDate } from "@/lib/date-utils"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: {
    id: string
    title: string
    assignee: string
    dueDate: string
    status: "pending" | "completed"
    recurring: string
    description?: string
  }
  mode: "create" | "edit"
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  assignee: z.string().min(1, "Assignee is required"),
  dueDate: z.date().optional(),
  recurring: z.string().min(1, "Frequency is required"),
})

type FormValues = z.infer<typeof formSchema>

export function TaskModal({ open, onOpenChange, task, mode }: TaskModalProps) {
  const { addTask, updateTask } = useTaskContext()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      recurring: "",
      dueDate: new Date(),
    },
  })

  // Cargar datos de la tarea si estamos en modo edición
  useEffect(() => {
    if (open && mode === "edit" && task) {
      form.setValue("title", task.title)
      form.setValue("description", task.description || "")
      form.setValue("assignee", task.assignee)
      form.setValue("recurring", task.recurring)
      form.setValue("dueDate", new Date(task.dueDate))
    } else if (open && mode === "create") {
      form.setValue("dueDate", new Date())
    }
  }, [open, form, task, mode])

  // Limpiar el formulario al cerrar
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        form.reset({
          title: "",
          description: "",
          assignee: "",
          recurring: "",
          dueDate: undefined,
        })
      }, 300)
    }
  }, [open, form])

  const onSubmit = (values: FormValues) => {
    const dueDate = values.dueDate || new Date()

    if (mode === "create") {
      const newTask = {
        id: crypto.randomUUID(),
        title: values.title,
        assignee: values.assignee,
        status: "pending" as const,
        dueDate: dueDate.toISOString().split("T")[0],
        createdAt: new Date(),
        recurring: values.recurring,
        description: values.description,
      }

      addTask(newTask)
      toast.success("Task Created", {
        description: "The task was created successfully",
      })
    } else if (mode === "edit" && task) {
      updateTask(task.id, {
        title: values.title,
        assignee: values.assignee,
        dueDate: dueDate.toISOString().split("T")[0],
        recurring: values.recurring,
        description: values.description,
      })
      toast.success("Task Updated", {
        description: "The task was updated successfully",
      })
    }

    onOpenChange(false)
  }

  const title = mode === "create" ? "Create New Task" : "Edit Task"
  const description = mode === "create" ? "Add a new task for your family members" : "Edit task details"
  const submitButtonText = mode === "create" ? "Create Task" : "Save Changes"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-w-[calc(100%-2rem)] mx-auto my-4 rounded-lg max-h-[calc(100vh-2rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <div className="h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter task description" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <div className="h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Assign To</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select family member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mom">Mom</SelectItem>
                        <SelectItem value="Dad">Dad</SelectItem>
                        <SelectItem value="Emma">Emma</SelectItem>
                        <SelectItem value="Jack">Jack</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="h-5">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal h-10",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? formatDate(field.value) : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={(date) => {
                            field.onChange(date)
                            setIsCalendarOpen(false)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="h-5">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="recurring"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recurring</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
                className="sm:order-1 order-2"
              >
                Cancel
              </Button>
              <Button type="submit" className="sm:order-2 order-1">
                {submitButtonText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

