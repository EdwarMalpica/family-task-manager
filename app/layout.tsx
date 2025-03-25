import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AlertDialogProvider } from "@/contexts/AlertDialogContext"
import { GlobalAlertDialog } from "@/components/GlobalAlertDialog"
import { TaskProvider } from "@/contexts/TaskContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Family Task Manager",
  description: "Manage your family's tasks and track progress",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AlertDialogProvider>
          <TaskProvider>
            <ThemeProvider defaultTheme="light" storageKey="family-tasks-theme">
              {children}
              <Toaster />
              <GlobalAlertDialog />
            </ThemeProvider>
          </TaskProvider>
        </AlertDialogProvider>
      </body>
    </html>
  )
}
