"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { Alert, AlertDescription } from "./ui/Alert"
import { fetchHalfHourlyData } from "../lib/api"
import type { HalfHourlyData } from "../types"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Clock, AlertCircle, Activity } from "lucide-react"

export const HalfHourlyChart: React.FC = () => {
  const [data, setData] = useState<HalfHourlyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchHalfHourlyData()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch half-hourly data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
            Real-time Power Trends
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Power consumption over the past 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-10 w-10 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium">Loading trends...</span>
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
          <CardTitle className="flex items-center gap-3 text-xl text-slate-900 dark:text-slate-100">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
            Real-time Power Trends
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

  const colors = [
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#8B5CF6", // Violet
    "#EC4899", // Pink
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{new Date(label).toLocaleString()}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-600 dark:text-slate-400">{entry.dataKey}:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{entry.value.toFixed(1)} kW</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-3 text-xl text-slate-900 dark:text-slate-100">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              Real-time Power Trends
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Power consumption over the past 24 hours (48 intervals)
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 dark:bg-purple-950/50 rounded-xl">
            <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">24H Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.hourly_data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`areaGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
                strokeOpacity={0.6}
                className="dark:stroke-slate-700"
              />
              <XAxis
                dataKey="timestamp"
                stroke="#64748B"
                className="dark:stroke-slate-400"
                fontSize={12}
                fontWeight={500}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#64748B"
                className="dark:stroke-slate-400"
                fontSize={12}
                fontWeight={500}
                label={{
                  value: "Power (kW)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#64748B", fontWeight: 500 },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              />
              {data?.buildings.map((building, index) => (
                <Area
                  key={building}
                  type="monotone"
                  dataKey={building}
                  stroke={colors[index % colors.length]}
                  fill={`url(#areaGradient${index})`}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: colors[index % colors.length],
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
