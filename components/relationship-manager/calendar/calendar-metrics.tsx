"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, AlertTriangle } from "lucide-react"

export function CalendarMetrics() {
  const metrics = [
    {
      title: "Today's Appointments",
      value: "8",
      change: "+2 from yesterday",
      changeType: "positive" as const,
      icon: Calendar,
    },
    {
      title: "This Week's Meetings",
      value: "24",
      change: "+15% from last week",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Upcoming Deadlines",
      value: "12",
      change: "3 due today",
      changeType: "warning" as const,
      icon: Clock,
    },
    {
      title: "Overdue Items",
      value: "3",
      change: "-2 from yesterday",
      changeType: "negative" as const,
      icon: AlertTriangle,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <Card key={metric.title} className="border-stone-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-stone-600">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-stone-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-stone-900">{metric.value}</div>
            <p
              className={`text-xs ${
                metric.changeType === "positive"
                  ? "text-green-600"
                  : metric.changeType === "negative"
                    ? "text-red-600"
                    : "text-orange-600"
              }`}
            >
              {metric.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
