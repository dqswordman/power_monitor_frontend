export interface LiveSummaryData {
  buildings: Record<string, number>
  timestamp: string
}

export interface DailyStatsData {
  buildings: string[]
  daily_data: Array<{
    date: string
    [building: string]: string | number
  }>
}

export interface HalfHourlyData {
  buildings: string[]
  hourly_data: Array<{
    timestamp: string
    [building: string]: string | number
  }>
}
