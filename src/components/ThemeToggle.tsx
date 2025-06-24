"use client"

import type React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { Button } from "./ui/Button"

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 relative overflow-hidden"
    >
      <Sun
        className={`h-4 w-4 rotate-0 scale-100 transition-all ${theme === "dark" ? "-rotate-90 scale-0" : ""} text-slate-600 dark:text-slate-400`}
      />
      <Moon
        className={`absolute h-4 w-4 rotate-90 scale-0 transition-all ${theme === "dark" ? "rotate-0 scale-100" : ""} text-slate-600 dark:text-slate-400`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
