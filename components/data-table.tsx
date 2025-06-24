"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

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

interface DataTableProps {
  data: DataRecord[]
}

export function DataTable({ data }: DataTableProps) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Raw Data Records</CardTitle>
        <CardDescription className="text-slate-400">
          Latest {data.length} power monitoring records from the database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-slate-800">
                <TableHead className="text-slate-400">ID</TableHead>
                <TableHead className="text-slate-400">Timestamp</TableHead>
                <TableHead className="text-slate-400">Building</TableHead>
                <TableHead className="text-slate-400">Floor</TableHead>
                <TableHead className="text-slate-400">V1 (V)</TableHead>
                <TableHead className="text-slate-400">V2 (V)</TableHead>
                <TableHead className="text-slate-400">V3 (V)</TableHead>
                <TableHead className="text-slate-400">I1 (A)</TableHead>
                <TableHead className="text-slate-400">I2 (A)</TableHead>
                <TableHead className="text-slate-400">I3 (A)</TableHead>
                <TableHead className="text-slate-400">P1 (kW)</TableHead>
                <TableHead className="text-slate-400">P2 (kW)</TableHead>
                <TableHead className="text-slate-400">P3 (kW)</TableHead>
                <TableHead className="text-slate-400">Total (kW)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((record) => (
                <TableRow key={record.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell className="text-white font-mono">{record.id}</TableCell>
                  <TableCell className="text-white font-mono text-xs">
                    {new Date(record.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-700 text-slate-300">
                      {record.Building}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">{record.Floor || "-"}</TableCell>
                  <TableCell className="text-white font-mono">{record.volt1.toFixed(1)}</TableCell>
                  <TableCell className="text-white font-mono">{record.volt2.toFixed(1)}</TableCell>
                  <TableCell className="text-white font-mono">{record.volt3.toFixed(1)}</TableCell>
                  <TableCell className="text-white font-mono">{record.current1.toFixed(1)}</TableCell>
                  <TableCell className="text-white font-mono">{record.current2.toFixed(1)}</TableCell>
                  <TableCell className="text-white font-mono">{record.current3.toFixed(1)}</TableCell>
                  <TableCell className="text-red-400 font-mono">{record.power1.toFixed(1)}</TableCell>
                  <TableCell className="text-green-400 font-mono">{record.power2.toFixed(1)}</TableCell>
                  <TableCell className="text-yellow-400 font-mono">{record.power3.toFixed(1)}</TableCell>
                  <TableCell className="text-blue-400 font-mono font-bold">
                    {(record.power1 + record.power2 + record.power3).toFixed(1)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
