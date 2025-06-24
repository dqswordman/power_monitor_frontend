"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
      className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 relative overflow-hidden"
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all",
          currentTheme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100",
          "text-slate-600 dark:text-slate-400",
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all",
          currentTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0",
          "text-slate-600 dark:text-slate-400",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
