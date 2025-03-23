"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTaskContext } from "@/contexts/TaskContext"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/date-utils"

interface CreateTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTaskModal({ open, onOpenChange }: CreateTaskModalProps) {
  const router = useRouter()
  const { addTask } = useTaskContext()

  const [date, setDate] = useState<Date | null>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignee, setAssignee] = useState("")
  const [recurring, setRecurring] = useState("")

  useEffect(() => {
    if (open) {
      setDate(new Date())
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setTitle("")
        setDescription("")
        setAssignee("")
        setRecurring("")
        setDate(null)
      }, 300) 
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !assignee || !date || !recurring) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newTask = {
      id: crypto.randomUUID(),
      title,
      assignee,
      dueDate: date.toISOString().split("T")[0],
      status: "pending",
      recurring,
    }

    addTask(newTask)
    onOpenChange(false)
    toast({
      title: "Task Created",
      description: "The task was created successfully",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Add a new task for your family members</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="assignee">Assign To</Label>
                <Select onValueChange={setAssignee} value={assignee}>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Select family member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mom">Mom</SelectItem>
                    <SelectItem value="Dad">Dad</SelectItem>
                    <SelectItem value="Emma">Emma</SelectItem>
                    <SelectItem value="Jack">Jack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? formatDate(date) : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date || undefined}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setDate(selectedDate)
                          setIsCalendarOpen(false)
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recurring">Recurring</Label>
              <Select onValueChange={setRecurring} value={recurring}>
                <SelectTrigger id="recurring">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

