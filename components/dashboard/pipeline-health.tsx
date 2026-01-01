"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Activity } from "lucide-react"
import type { Pipeline } from "@/lib/mock-analyst-dashboard"

interface PipelineHealthComponentProps {
  pipeline: Pipeline
}

export function PipelineHealthComponent({ pipeline }: PipelineHealthComponentProps) {
  const getSLAColor = (compliance: number) => {
    if (compliance >= 95) return "bg-green-100 text-green-800"
    if (compliance >= 85) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Pipeline Health Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">SLA Compliance</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{pipeline.slaCompliance}%</div>
            <Badge className={getSLAColor(pipeline.slaCompliance)}>
              {pipeline.slaCompliance >= 95 ? "Excellent" : pipeline.slaCompliance >= 85 ? "Good" : "Needs Attention"}
            </Badge>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-purple-700 font-medium">Avg Processing Time</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">{pipeline.avgProcessingTime}</div>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700 font-medium">Monthly Throughput</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{pipeline.throughput}</div>
            <p className="text-xs text-green-700 mt-1">cases completed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
