"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, CheckCircle, Calendar } from "lucide-react"

export function MeetingMetrics() {
  const metrics = [
    {
      title: "Meetings This Week",
      value: "18",
      change: "+3 from last week",
      changeType: "positive" as const,
      icon: Calendar,
    },
    {
      title: "Completed Meetings",
      value: "12",
      change: "67% completion rate",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
    {
      title: "Average Duration",
      value: "42 min",
      change: "-8 min from average",
      changeType: "positive" as const,
      icon: Clock,
    },
    {
      title: "Active Participants",
      value: "24",
      change: "+6 new this week",
      changeType: "positive" as const,
      icon: Users,
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
