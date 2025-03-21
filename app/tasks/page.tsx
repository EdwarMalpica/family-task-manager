"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecentTasks } from "@/components/recent-tasks";
import { ThemeToggle } from "@/components/theme-toggle";

export default function TasksPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/">
              <span className="text-lg">FamilyTasks</span>
            </Link>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 pt-6 sm:p-6 sm:pt-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">All Tasks</h1>
                <p className="text-muted-foreground">
                  View and manage all family tasks
                </p>
              </div>
              <Button asChild>
                <Link href="/tasks/new">Create New Task</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-2"></div>
              </div>
              <TabsContent value="all" className="space-y-4">
                <RecentTasks />
              </TabsContent>
              <TabsContent value="pending" className="space-y-4">
                <RecentTasks />
              </TabsContent>
              <TabsContent value="completed" className="space-y-4">
                <RecentTasks />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
