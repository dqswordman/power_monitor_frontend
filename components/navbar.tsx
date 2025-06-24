"use client"

import { Zap, RefreshCw, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-500 dark:via-blue-600 dark:to-indigo-600 rounded-2xl shadow-lg">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-100 dark:to-blue-100 bg-clip-text text-transparent">
                MUT Power Dashboard
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Mahanakorn University of Technology
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Live Monitoring</span>
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                <span className="font-medium">Last Update:</span>{" "}
                <span className="text-slate-800 dark:text-slate-200">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <Settings className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </Button>

              <Button
                onClick={handleRefresh}
                className="h-10 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
