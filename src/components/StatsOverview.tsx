"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "./ui/Card"
import { Zap, TrendingUp, Building, Activity, ArrowUp, ArrowDown } from "lucide-react"

export const StatsOverview: React.FC = () => {
  const [stats] = useState({
    totalPower: 473.8,
    avgPower: 157.9,
    activeBuildings: 3,
    efficiency: 94.2,
    trend: 5.2,
  })

  const statCards = [
    {
      title: "Total Power Consumption",
      value: `${stats.totalPower.toFixed(1)} kW`,
      change: `+${stats.trend}%`,
      changeType: "increase" as const,
      icon: Zap,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50",
    },
    {
      title: "Average Building Load",
      value: `${stats.avgPower.toFixed(1)} kW`,
      change: "+2.1%",
      changeType: "increase" as const,
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50",
    },
    {
      title: "Active Buildings",
      value: stats.activeBuildings.toString(),
      change: "100%",
      changeType: "neutral" as const,
      icon: Building,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50",
    },
    {
      title: "System Efficiency",
      value: `${stats.efficiency.toFixed(1)}%`,
      change: "+1.3%",
      changeType: "increase" as const,
      icon: Activity,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card
          key={stat.title}
          className="relative overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`} />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold">
                {stat.changeType === "increase" ? (
                  <ArrowUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                ) : stat.changeType === "decrease" ? (
                  <ArrowDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                ) : null}
                <span
                  className={
                    stat.changeType === "increase"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : stat.changeType === "decrease"
                        ? "text-red-600 dark:text-red-400"
                        : "text-slate-600 dark:text-slate-400"
                  }
                >
                  {stat.change}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
