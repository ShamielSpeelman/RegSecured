"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, FileCheck, Flag } from "lucide-react"
import type { Risk, Compliance } from "@/lib/mock-analyst-dashboard"

interface RiskComplianceOverviewProps {
  risk: Risk
  compliance: Compliance
}

export function RiskComplianceOverview({ risk, compliance }: RiskComplianceOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Risk Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">High-Risk Clients</span>
            </div>
            <Badge variant="destructive">{risk.highRiskClients}</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Pending Reviews</span>
            </div>
            <Badge className="bg-orange-100 text-orange-800">{risk.pendingReviews}</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">Flagged Transactions</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">{risk.flaggedTransactions}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-blue-600" />
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Pending Approvals</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800">{compliance.pendingApprovals}</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Upcoming Audits</span>
            </div>
            <Badge className="bg-purple-100 text-purple-800">{compliance.upcomingAudits}</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium">Documentation Gaps</span>
            </div>
            <Badge className="bg-slate-100 text-slate-800">{compliance.documentationGaps}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
