"use client"

import type React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme, resolvedTheme } = useTheme()

  const actualTheme = resolvedTheme === "dark" ? "dark" : "light"

  return (
    <Sonner
      theme={actualTheme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg dark:group-[.toaster]:text-white",
          title: "group-[.toast]:text-foreground font-semibold dark:group-[.toast]:text-white",
          description: "group-[.toast]:text-foreground dark:group-[.toast]:text-gray-200",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground dark:group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

