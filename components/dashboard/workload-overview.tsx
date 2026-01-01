"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, AlertCircle, Calendar, CheckCircle } from "lucide-react"
import type { Workload } from "@/lib/mock-analyst-dashboard"

interface WorkloadOverviewProps {
  workload: Workload
}

export function WorkloadOverview({ workload }: WorkloadOverviewProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          My Workload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-xs text-red-700 font-medium">OVERDUE</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{workload.overdue}</div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span className="text-xs text-orange-700 font-medium">DUE TODAY</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">{workload.dueToday}</div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-blue-700 font-medium">THIS WEEK</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{workload.thisWeek}</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-slate-600" />
              <span className="text-xs text-slate-700 font-medium">TOTAL</span>
            </div>
            <div className="text-2xl font-bold text-slate-600">{workload.total}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm">Efficiency Rate:</span>
            <Badge className="bg-green-100 text-green-800">{workload.efficiency}%</Badge>
          </div>
          <Button size="sm" variant="outline">
            View All Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
