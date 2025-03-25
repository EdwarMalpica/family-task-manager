"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentTasks } from "@/components/recent-tasks"
import { FamilyProgress } from "@/components/family-progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAlertDialog } from "@/contexts/AlertDialogContext"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useMemo } from "react"
import { CreateTaskModal } from "@/components/create-task-modal"
import { useTaskContext } from "@/contexts/TaskContext"

export default function DashboardPage() {
  const { showDialog } = useAlertDialog()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { tasks } = useTaskContext()

  const stats = useMemo(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.status === "completed").length
    const pendingTasks = totalTasks - completedTasks
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    const changeFromLastWeek = {
      total: "+2",
      completed: "+4",
      pending: "-2",
      rate: "+5%",
    }

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      changeFromLastWeek,
    }
  }, [tasks])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/">
              <span className="text-lg">FamilyTasks</span>
            </Link>
          </div>
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 sm:p-6 sm:pt-8">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Manage your family's tasks and track progress.</p>
            </div>
            <div className="flex">
              <Button onClick={() => setIsCreateModalOpen(true)}>Create New Task</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTasks}</div>
                <p className="text-xs text-muted-foreground">{stats.changeFromLastWeek.total} from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedTasks}</div>
                <p className="text-xs text-muted-foreground">{stats.changeFromLastWeek.completed} from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingTasks}</div>
                <p className="text-xs text-muted-foreground">{stats.changeFromLastWeek.pending} from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completionRate}%</div>
                <p className="text-xs text-muted-foreground">{stats.changeFromLastWeek.rate} from last week</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-7 mt-6">
            <Card className="md:col-span-7 col-span-4">
              <CardHeader>
                <CardTitle>Family Progress</CardTitle>
                <CardDescription>Task completion by family member</CardDescription>
              </CardHeader>
              <CardContent>
                <FamilyProgress />
              </CardContent>
            </Card>
          </div>
          <Card className="flex flex-col mt-6">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>All Tasks</CardTitle>
                  <CardDescription>Manage and track your family's tasks</CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <RecentTasks searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </div>
      </main>

      <CreateTaskModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  )
}

