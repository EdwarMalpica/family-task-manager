"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CreateTaskModal } from "@/components/create-task-modal"
import { useState } from "react"

const familyMembers = [
  {
    id: "1",
    name: "Mom",
    email: "mom@example.com",
    tasksCompleted: 12,
    totalTasks: 15,
    recentTasks: ["Clean kitchen", "Pay bills", "Grocery shopping"],
  },
  {
    id: "2",
    name: "Dad",
    email: "dad@example.com",
    tasksCompleted: 10,
    totalTasks: 14,
    recentTasks: ["Mow lawn", "Fix sink", "Take out trash"],
  },
  {
    id: "3",
    name: "Emma",
    email: "emma@example.com",
    tasksCompleted: 8,
    totalTasks: 10,
    recentTasks: ["Do homework", "Clean room", "Feed pet"],
  },
  {
    id: "4",
    name: "Jack",
    email: "jack@example.com",
    tasksCompleted: 6,
    totalTasks: 8,
    recentTasks: ["Take out recycling", "Clean room", "Fold laundry"],
  },
]

export default function FamilyPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-lg">FamilyTasks</span>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 sm:p-6 sm:pt-8">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Family Members</h1>
              <p className="text-muted-foreground">Manage family members and their tasks</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Family Member
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {familyMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={`/placeholder.svg?height=56&width=56`} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Task Completion</span>
                      <span>
                        {member.tasksCompleted}/{member.totalTasks}
                      </span>
                    </div>
                    <Progress value={(member.tasksCompleted / member.totalTasks) * 100} />
                  </div>
                  <div className="min-h-64">
                    <h4 className="mb-2 text-sm font-medium">Recent Tasks</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.recentTasks.map((task, i) => (
                        <Badge key={i} variant="secondary">
                          {task}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Modal para crear tareas */}
      <CreateTaskModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  )
}

