"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Bell, Clock, Shield } from "lucide-react"

export function AlertMetrics() {
  const metrics = [
    {
      title: "Active Alerts",
      value: 12,
      change: "+3",
      changeType: "negative",
      description: "From last week",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Pending Review",
      value: 8,
      change: "-2",
      changeType: "positive",
      description: "From last week",
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Resolved This Month",
      value: 27,
      change: "+5",
      changeType: "positive",
      description: "From last month",
      icon: Bell,
      color: "text-green-600",
    },
    {
      title: "High Risk Alerts",
      value: 4,
      change: "+1",
      changeType: "negative",
      description: "From last week",
      icon: Shield,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  metric.changeType === "positive"
                    ? "text-green-600"
                    : metric.changeType === "negative"
                      ? "text-red-600"
                      : ""
                }
              >
                {metric.change}
              </span>{" "}
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
