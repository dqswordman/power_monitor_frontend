"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { Badge } from "./ui/Badge"
import { Alert, AlertDescription } from "./ui/Alert"
import { fetchLiveSummary } from "../lib/api"
import type { LiveSummaryData } from "../types"
import { Building, Zap, TrendingUp, AlertCircle, Activity } from "lucide-react"

export const LiveSummary: React.FC = () => {
  const [data, setData] = useState<LiveSummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchLiveSummary()
      setData(result)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch live summary data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadData, 10000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (power: number) => {
    if (power > 200) return "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25"
    if (power > 100) return "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25"
    return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
  }

  const getStatusText = (power: number) => {
    if (power > 200) return "High Load"
    if (power > 100) return "Medium Load"
    return "Optimal"
  }

  if (loading && !data) {
    return (
      <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            Live Power Summary
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
            Real-time power consumption across campus buildings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
                <div className="absolute inset-0 h-12 w-12 border-4 border-transparent border-r-blue-400 dark:border-r-blue-600 rounded-full animate-spin animate-reverse" />
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium">Loading live data...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            Live Power Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/50 dark:to-rose-950/50 shadow-lg">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
            <AlertDescription className="text-red-700 dark:text-red-300 font-medium">{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const totalPower = data ? Object.values(data.buildings).reduce((sum, power) => sum + power, 0) : 0

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-3 text-2xl text-slate-900 dark:text-slate-100">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              Live Power Summary
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
              Real-time power consumption across campus buildings
            </CardDescription>
          </div>
          <div className="text-right space-y-1">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {totalPower.toFixed(1)}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">kW Total Load</div>
            <div className="flex items-center gap-2 justify-end">
              <Activity className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">LIVE</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6 text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Last updated:{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">{lastUpdated.toLocaleTimeString()}</span>
          </span>
          {loading && (
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <div className="w-3 h-3 border border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="font-medium">Updating...</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data &&
            Object.entries(data.buildings).map(([building, power]) => (
              <div
                key={building}
                className="group relative p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-400/10 dark:to-indigo-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-xl shadow-md">
                        <Building className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-lg">{building}</span>
                    </div>
                    <Badge className={getStatusColor(power)}>{getStatusText(power)}</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{power.toFixed(1)}</span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium mb-1">kW</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                        <span className="text-slate-600 dark:text-slate-400">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {((power / totalPower) * 100).toFixed(1)}%
                          </span>{" "}
                          of total
                        </span>
                      </div>
                    </div>

                    {/* Power level indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Load Level</span>
                        <span>{Math.min(100, (power / 250) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            power > 200
                              ? "bg-gradient-to-r from-red-500 to-rose-500"
                              : power > 100
                                ? "bg-gradient-to-r from-amber-500 to-orange-500"
                                : "bg-gradient-to-r from-emerald-500 to-teal-500"
                          }`}
                          style={{ width: `${Math.min(100, (power / 250) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
