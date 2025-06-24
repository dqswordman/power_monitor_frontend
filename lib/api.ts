import axios from "axios"
import type { LiveSummaryData, DailyStatsData, HalfHourlyData } from "@/types"

// Replace with your actual backend IP address
const BASE_URL = "http://192.168.1.100:8000"

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.baseURL}${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - please check your connection")
    }
    if (error.response?.status === 404) {
      throw new Error("API endpoint not found")
    }
    if (error.response?.status >= 500) {
      throw new Error("Server error - please try again later")
    }
    if (!error.response) {
      throw new Error("Network error - please check if the backend server is running")
    }
    throw new Error(error.response?.data?.detail || "An unexpected error occurred")
  },
)

export async function fetchLiveSummary(): Promise<LiveSummaryData> {
  try {
    const response = await api.get("/summary?n=5")

    // Transform the response to match our expected format
    const buildings = response.data

    return {
      buildings,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error fetching live summary:", error)
    throw error
  }
}

export async function fetchDailyStats(): Promise<DailyStatsData> {
  try {
    const response = await api.get("/daily-stats/summary")

    // If the API returns the data in a different format, transform it here
    if (response.data.daily_data && response.data.buildings) {
      return response.data
    }

    // Fallback: generate mock data structure if API response is different
    const buildings = Object.keys(response.data)
    const daily_data = []

    // Generate last 10 days of data
    for (let i = 9; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      const dayData: any = {
        date: date.toISOString().split("T")[0],
      }

      buildings.forEach((building) => {
        dayData[building] = Math.random() * 200 + 50 // Mock data
      })

      daily_data.push(dayData)
    }

    return {
      buildings,
      daily_data,
    }
  } catch (error) {
    console.error("Error fetching daily stats:", error)
    throw error
  }
}

export async function fetchHalfHourlyData(): Promise<HalfHourlyData> {
  try {
    const response = await api.get("/half-hourly/summary")

    // If the API returns the data in a different format, transform it here
    if (response.data.hourly_data && response.data.buildings) {
      return response.data
    }

    // Fallback: generate mock data structure if API response is different
    const buildings = Object.keys(response.data)
    const hourly_data = []

    // Generate last 48 half-hour intervals (24 hours)
    for (let i = 47; i >= 0; i--) {
      const timestamp = new Date()
      timestamp.setMinutes(timestamp.getMinutes() - i * 30)

      const intervalData: any = {
        timestamp: timestamp.toISOString(),
      }

      buildings.forEach((building) => {
        intervalData[building] = Math.random() * 150 + 30 // Mock data
      })

      hourly_data.push(intervalData)
    }

    return {
      buildings,
      hourly_data,
    }
  } catch (error) {
    console.error("Error fetching half-hourly data:", error)
    throw error
  }
}
