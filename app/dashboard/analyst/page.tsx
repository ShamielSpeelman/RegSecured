"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RefreshCw,
  Download,
  Settings,
  Bell,
  Calendar,
  BarChart3,
  Users,
  Shield,
  FileText,
  TrendingUp,
  Clock,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CriticalAlertsPanel } from "@/components/dashboard/critical-alerts-panel"
import { WorkloadOverview } from "@/components/dashboard/workload-overview"
import { RiskComplianceOverview } from "@/components/dashboard/risk-compliance-overview"
import { PipelineHealthComponent } from "@/components/dashboard/pipeline-health"
import { TeamPerformanceComponent } from "@/components/dashboard/team-performance"
import { ClientInsightsComponent } from "@/components/dashboard/client-insights"
import { mockAnalystDashboard } from "@/lib/mock-analyst-dashboard"
import { formatDistanceToNow } from "date-fns"

export default function AnalystDashboard() {
  const [dashboardData, setDashboardData] = useState(mockAnalystDashboard)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastRefresh(new Date())
    setIsRefreshing(false)
  }

  const criticalAlertsCount = dashboardData.alerts.filter(
    (alert) => alert.severity === "critical" || alert.severity === "high",
  ).length

  const urgentItemsCount = dashboardData.workload.overdue + dashboardData.workload.dueToday

  return (
    <DashboardLayout userRole="analyst">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-slate-800 mb-2">KYC Analyst Command Center</h1>
            <p className="text-slate-600 font-light">Comprehensive overview of your KYC compliance responsibilities</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Last updated: {formatDistanceToNow(lastRefresh, { addSuffix: true })}
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <span className="font-medium">System Status:</span>
            <Badge className="bg-green-100 text-green-800">All Systems Operational</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="font-medium">Urgent Items:</span>
            <Badge variant={urgentItemsCount > 0 ? "destructive" : "outline"}>{urgentItemsCount}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span className="font-medium">Critical Alerts:</span>
            <Badge variant={criticalAlertsCount > 0 ? "destructive" : "outline"}>{criticalAlertsCount}</Badge>
          </div>
        </div>

        {/* Critical Alerts - Always Visible */}
        <CriticalAlertsPanel alerts={dashboardData.alerts} />

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="workload" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Workload
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Risk & Compliance
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Clients
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WorkloadOverview workload={dashboardData.workload} />
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Quick Performance Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{dashboardData.quality.overallScore}%</div>
                        <div className="text-xs text-green-700">Quality Score</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">#{dashboardData.team.myRank}</div>
                        <div className="text-xs text-blue-700">Team Rank</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {dashboardData.pipeline.slaCompliance}%
                        </div>
                        <div className="text-xs text-purple-700">SLA Compliance</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{dashboardData.workload.efficiency}%</div>
                        <div className="text-xs text-orange-700">Efficiency</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <RiskComplianceOverview risk={dashboardData.risk} compliance={dashboardData.compliance} />
          </TabsContent>

          <TabsContent value="workload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WorkloadOverview workload={dashboardData.workload} />
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Workload Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Individual KYC</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Corporate KYC</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Enhanced DD</span>
                        <span className="font-medium">10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <RiskComplianceOverview risk={dashboardData.risk} compliance={dashboardData.compliance} />
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <PipelineHealthComponent pipeline={dashboardData.pipeline} />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamPerformanceComponent team={dashboardData.team} />
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <ClientInsightsComponent clients={dashboardData.clients} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
