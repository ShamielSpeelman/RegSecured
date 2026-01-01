"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Building2 } from "lucide-react"
import type { Client } from "@/lib/mock-analyst-dashboard"

interface ClientInsightsComponentProps {
  clients: Client[]
}

export function ClientInsightsComponent({ clients }: ClientInsightsComponentProps) {
  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Recent Clients
          </CardTitle>
          <Button size="sm" variant="outline">
            View All Clients
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {clients.map((client, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{client.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-3 w-3" />
                    Last reviewed: {client.lastReview}
                  </div>
                </div>
              </div>
              <Badge className={getRiskLevelColor(client.riskLevel)}>{client.riskLevel} Risk</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
