import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/overview";
import { RecentTasks } from "@/components/recent-tasks";
import { FamilyProgress } from "@/components/family-progress";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardPage() {
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your family's tasks and track progress.
            </p>
          </div>
          <div className="flex">
            <Button asChild variant={"outline"} className="mr-4">
              <Link href="/tasks/">All Tasks</Link>
            </Button>
            <Button asChild>
              <Link href="/tasks/new">Create New Task</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">+4 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">-2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last week
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
              <CardDescription>
                Task completion over the past 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Family Progress</CardTitle>
              <CardDescription>
                Task completion by family member
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FamilyProgress />
            </CardContent>
          </Card>
        </div>
        <Card className="h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>
              Manage and track your family's recent tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <RecentTasks />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
