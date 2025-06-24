"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building, Zap, TrendingUp, TrendingDown } from "lucide-react"

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

interface BuildingCardProps {
  building: string
  power: number
  data: DataRecord[]
}

export function BuildingCard({ building, power, data }: BuildingCardProps) {
  const latestRecord = data[0]
  const previousRecord = data[1]

  const powerTrend =
    latestRecord && previousRecord
      ? latestRecord.power1 +
        latestRecord.power2 +
        latestRecord.power3 -
        (previousRecord.power1 + previousRecord.power2 + previousRecord.power3)
      : 0

  const avgVoltage = latestRecord ? (latestRecord.volt1 + latestRecord.volt2 + latestRecord.volt3) / 3 : 0

  const avgCurrent = latestRecord ? (latestRecord.current1 + latestRecord.current2 + latestRecord.current3) / 3 : 0

  const powerFactor = avgVoltage && avgCurrent ? (power * 1000) / (avgVoltage * avgCurrent * Math.sqrt(3)) : 0

  const getStatusColor = (power: number) => {
    if (power > 200) return "bg-red-500"
    if (power > 100) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStatusText = (power: number) => {
    if (power > 200) return "High Load"
    if (power > 100) return "Medium Load"
    return "Normal Load"
  }

  return (
    <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-500" />
            {building}
          </CardTitle>
          <Badge variant="outline" className={`border-slate-700 text-white ${getStatusColor(power)}`}>
            {getStatusText(power)}
          </Badge>
        </div>
        <CardDescription className="text-slate-400">
          {latestRecord?.Floor && `Floor ${latestRecord.Floor} • `}
          Last updated: {latestRecord ? new Date(latestRecord.timestamp).toLocaleTimeString() : "N/A"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-slate-400">Current Power</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">{power.toFixed(1)} kW</span>
            {powerTrend !== 0 && (
              <div className={`flex items-center gap-1 ${powerTrend > 0 ? "text-red-500" : "text-green-500"}`}>
                {powerTrend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span className="text-xs">{Math.abs(powerTrend).toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        <Progress value={(power / 300) * 100} className="h-2" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-slate-400">Avg Voltage</div>
            <div className="text-white font-mono">{avgVoltage.toFixed(1)} V</div>
          </div>
          <div>
            <div className="text-slate-400">Avg Current</div>
            <div className="text-white font-mono">{avgCurrent.toFixed(1)} A</div>
          </div>
          <div>
            <div className="text-slate-400">Power Factor</div>
            <div className="text-white font-mono">{powerFactor.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-slate-400">Efficiency</div>
            <div className="text-white font-mono">{(powerFactor * 100).toFixed(0)}%</div>
          </div>
        </div>

        {latestRecord && (
          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs text-slate-400 mb-2">Phase Distribution</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-red-400">Phase 1</span>
                <span className="text-white">{latestRecord.power1.toFixed(1)} kW</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-400">Phase 2</span>
                <span className="text-white">{latestRecord.power2.toFixed(1)} kW</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-yellow-400">Phase 3</span>
                <span className="text-white">{latestRecord.power3.toFixed(1)} kW</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
