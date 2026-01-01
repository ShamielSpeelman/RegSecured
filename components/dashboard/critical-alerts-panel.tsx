"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, Clock, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Alert } from "@/lib/mock-analyst-dashboard"

interface CriticalAlertsPanelProps {
  alerts: Alert[]
}

export function CriticalAlertsPanel({ alerts }: CriticalAlertsPanelProps) {
  const criticalAlerts = alerts.filter((alert) => alert.severity === "critical" || alert.severity === "high")

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getSeverityIcon = (severity: Alert["severity"]) => {
    if (severity === "critical" || severity === "high") {
      return <AlertTriangle className="h-4 w-4" />
    }
    return <Bell className="h-4 w-4" />
  }

  if (criticalAlerts.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Bell className="h-5 w-5" />
            Critical Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700">No critical alerts at this time. All systems operating normally.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          Critical Alerts
          <Badge variant="destructive" className="ml-2">
            {criticalAlerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {criticalAlerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm opacity-90">{alert.description}</p>
                  <div className="flex items-center gap-2 text-xs opacity-75">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </div>
                </div>
              </div>
              {alert.actionRequired && (
                <Button size="sm" variant="outline" className="shrink-0 bg-transparent">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Take Action
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
