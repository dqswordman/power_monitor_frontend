"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface DataRecord {
  id: number
  timestamp: string
  volt1: number
  volt2: number
  volt3: number
  current1: number
  current2: number
  current3: number
  power1: number
  power2: number
  power3: number
  energy1: number
  energy2: number
  energy3: number
  Building: string
  Floor?: number
}

interface PowerChartProps {
  data: DataRecord[]
}

export function PowerChart({ data }: PowerChartProps) {
  const chartData = data
    .slice()
    .reverse()
    .map((record, index) => ({
      time: new Date(record.timestamp).toLocaleTimeString(),
      totalPower: record.power1 + record.power2 + record.power3,
      power1: record.power1,
      power2: record.power2,
      power3: record.power3,
      building: record.Building,
    }))

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Power Consumption Trend</CardTitle>
        <CardDescription className="text-slate-400">Real-time power consumption across all phases</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              label={{
                value: "Power (kW)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: "#9CA3AF" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              formatter={(value: number, name: string) => [
                `${value.toFixed(2)} kW`,
                name === "totalPower"
                  ? "Total Power"
                  : name === "power1"
                    ? "Phase 1"
                    : name === "power2"
                      ? "Phase 2"
                      : "Phase 3",
              ]}
            />
            <Area type="monotone" dataKey="totalPower" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            <Area type="monotone" dataKey="power1" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} />
            <Area type="monotone" dataKey="power2" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
            <Area type="monotone" dataKey="power3" stackId="2" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
