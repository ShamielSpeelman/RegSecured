"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, AlertTriangle } from "lucide-react"

export function RegulatoryCalendar() {
  const deadlines = [
    {
      title: "Annual KYC Refresh - Acme Corporation",
      date: "2024-06-15",
      daysRemaining: 14,
      priority: "high",
      type: "kyc",
    },
    {
      title: "Quarterly Risk Assessment - TechStart Ventures",
      date: "2024-06-30",
      daysRemaining: 29,
      priority: "medium",
      type: "risk",
    },
    {
      title: "Document Expiry - Eastern Trading Co",
      date: "2024-07-05",
      daysRemaining: 34,
      priority: "high",
      type: "document",
    },
    {
      title: "Periodic Review - Global Imports Inc",
      date: "2024-07-15",
      daysRemaining: 44,
      priority: "medium",
      type: "review",
    },
    {
      title: "Regulatory Filing Deadline",
      date: "2024-07-31",
      daysRemaining: 60,
      priority: "high",
      type: "regulatory",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800">Medium Priority</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getDeadlineStatus = (daysRemaining: number) => {
    if (daysRemaining <= 7) {
      return (
        <div className="flex items-center text-red-600">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span>{daysRemaining} days left</span>
        </div>
      )
    } else if (daysRemaining <= 30) {
      return (
        <div className="flex items-center text-amber-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>{daysRemaining} days left</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center text-green-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{daysRemaining} days left</span>
        </div>
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Regulatory Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{deadline.title}</div>
                <div className="text-sm text-muted-foreground">Due: {deadline.date}</div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                {getPriorityBadge(deadline.priority)}
                {getDeadlineStatus(deadline.daysRemaining)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
