"use client"

import { useState, useEffect } from "react"
import { Navbar } from "./components/Navbar"
import { LiveSummary } from "./components/LiveSummary"
import { DailyStats } from "./components/DailyStats"
import { HalfHourlyChart } from "./components/HalfHourlyChart"
import { StatsOverview } from "./components/StatsOverview"
import { Alert, AlertDescription } from "./components/ui/Alert"
import { AlertTriangle, Wifi, WifiOff } from "lucide-react"
import { ThemeProvider } from "./contexts/ThemeContext"
import "./App.css"

type ConnectionStatus = "connected" | "disconnected" | "checking"

function App() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("checking")

  useEffect(() => {
    // Check API connection on mount
    const checkConnection = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch("http://192.168.1.100:8000/", {
          method: "GET",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          setConnectionStatus("connected")
        } else {
          setConnectionStatus("disconnected")
        }
      } catch (error) {
        setConnectionStatus("disconnected")
      }
    }

    checkConnection()

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/20 transition-colors duration-300">
        <Navbar />

        <main className="container mx-auto px-6 py-8 space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
                Power Analytics
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Real-time campus energy monitoring and insights
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 dark:border-slate-800/50">
              {connectionStatus === "connected" ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                    <Wifi className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-emerald-700 dark:text-emerald-300">Connected</div>
                    <div className="text-emerald-600 dark:text-emerald-400 text-xs">Live data streaming</div>
                  </div>
                </>
              ) : connectionStatus === "disconnected" ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                    <WifiOff className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-red-700 dark:text-red-300">Disconnected</div>
                    <div className="text-red-600 dark:text-red-400 text-xs">Check connection</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-5 w-5 border-2 border-blue-300 dark:border-blue-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
                  <div className="text-sm">
                    <div className="font-semibold text-blue-700 dark:text-blue-300">Connecting</div>
                    <div className="text-blue-600 dark:text-blue-400 text-xs">Please wait...</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {connectionStatus === "disconnected" && (
            <Alert className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/50 dark:to-rose-950/50 shadow-lg">
              <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
              <AlertDescription className="text-red-800 dark:text-red-200 font-medium">
                Unable to connect to the power monitoring API. Please verify the backend server is running and
                accessible.
              </AlertDescription>
            </Alert>
          )}

          {/* Stats Overview */}
          <StatsOverview />

          {/* Main Dashboard Grid */}
          <div className="space-y-8">
            <LiveSummary />

            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
              <DailyStats />
              <HalfHourlyChart />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
