"use client"

import dynamic from "next/dynamic"
import { ChartContainer } from "@/components/ui/chart"

interface UserActivityChartProps {
  data: Array<{
    date: string
    logins: number
    activeUsers: number
    newUsers: number
  }>
}

const RechartsChart = dynamic(
  () =>
    import("recharts").then((mod) => {
      const { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } = mod
      return {
        default: ({ data }: { data: UserActivityChartProps["data"] }) => (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Area
                type="monotone"
                dataKey="logins"
                stroke="var(--color-logins)"
                fill="var(--color-logins)"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="activeUsers"
                stroke="var(--color-activeUsers)"
                fill="var(--color-activeUsers)"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="newUsers"
                stroke="var(--color-newUsers)"
                fill="var(--color-newUsers)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        ),
      }
    }),
  { ssr: false },
)

export function UserActivityChart({ data }: UserActivityChartProps) {
  const chartConfig = {
    logins: {
      label: "Total Logins",
      color: "hsl(var(--chart-1))",
    },
    activeUsers: {
      label: "Active Users",
      color: "hsl(var(--chart-2))",
    },
    newUsers: {
      label: "New Users",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RechartsChart data={data} />
    </ChartContainer>
  )
}
