"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Shield,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Users,
  Settings,
  Eye,
} from "lucide-react"

const complianceMetrics = [
  { date: "Jan 1", overall: 98.5, kyc: 99.2, aml: 97.8, sanctions: 98.9, reporting: 98.1 },
  { date: "Jan 8", overall: 97.8, kyc: 98.5, aml: 96.9, sanctions: 98.2, reporting: 97.6 },
  { date: "Jan 15", overall: 96.2, kyc: 97.1, aml: 94.8, sanctions: 97.5, reporting: 96.4 },
  { date: "Jan 22", overall: 95.8, kyc: 96.8, aml: 94.2, sanctions: 97.1, reporting: 95.9 },
  { date: "Jan 29", overall: 97.1, kyc: 98.0, aml: 95.6, sanctions: 98.3, reporting: 96.8 },
]

const driftAlerts = [
  {
    id: 1,
    tenant: "Acme Financial",
    category: "AML Monitoring",
    severity: "high",
    description: "Transaction monitoring rules disabled for 48 hours",
    impact: "15% compliance score drop",
    detected: "2 hours ago",
    status: "active",
    autoRemediation: false,
  },
  {
    id: 2,
    tenant: "Global Bank Ltd",
    category: "KYC Documentation",
    severity: "medium",
    description: "Document verification threshold lowered below policy",
    impact: "8% compliance score drop",
    detected: "6 hours ago",
    status: "investigating",
    autoRemediation: true,
  },
  {
    id: 3,
    tenant: "FinTech Innovations",
    category: "Sanctions Screening",
    severity: "critical",
    description: "Sanctions list update failed for 72 hours",
    impact: "25% compliance score drop",
    detected: "12 hours ago",
    status: "escalated",
    autoRemediation: false,
  },
  {
    id: 4,
    tenant: "Crypto Exchange Pro",
    category: "Regulatory Reporting",
    severity: "low",
    description: "Report generation delayed by 2 hours",
    impact: "3% compliance score drop",
    detected: "1 day ago",
    status: "resolved",
    autoRemediation: true,
  },
]

const tenantCompliance = [
  {
    tenant: "Acme Financial",
    overall: 94.2,
    kyc: 96.8,
    aml: 89.5,
    sanctions: 97.1,
    reporting: 94.8,
    trend: "declining",
    alerts: 3,
    lastAudit: "2 days ago",
  },
  {
    tenant: "Global Bank Ltd",
    overall: 97.8,
    kyc: 98.2,
    aml: 96.9,
    sanctions: 98.5,
    reporting: 97.6,
    trend: "stable",
    alerts: 1,
    lastAudit: "1 day ago",
  },
  {
    tenant: "FinTech Innovations",
    overall: 91.5,
    kyc: 94.2,
    aml: 87.8,
    sanctions: 89.6,
    reporting: 94.4,
    trend: "declining",
    alerts: 5,
    lastAudit: "3 hours ago",
  },
  {
    tenant: "Crypto Exchange Pro",
    overall: 98.9,
    kyc: 99.1,
    aml: 98.5,
    sanctions: 99.2,
    reporting: 98.8,
    trend: "improving",
    alerts: 0,
    lastAudit: "1 hour ago",
  },
]

const complianceCategories = [
  { name: "KYC Documentation", score: 97.2, threshold: 95, status: "compliant", issues: 2 },
  { name: "AML Monitoring", score: 93.8, threshold: 95, status: "drift", issues: 8 },
  { name: "Sanctions Screening", score: 96.5, threshold: 98, status: "drift", issues: 3 },
  { name: "Regulatory Reporting", score: 95.9, threshold: 95, status: "compliant", issues: 1 },
  { name: "Risk Assessment", score: 94.2, threshold: 90, status: "compliant", issues: 4 },
  { name: "Data Privacy", score: 98.7, threshold: 95, status: "compliant", issues: 0 },
]

const remediationActions = [
  {
    id: 1,
    tenant: "FinTech Innovations",
    action: "Re-enable AML Transaction Monitoring",
    category: "AML Monitoring",
    priority: "critical",
    status: "pending",
    estimatedTime: "15 minutes",
    autoApply: true,
  },
  {
    id: 2,
    tenant: "Acme Financial",
    action: "Update Sanctions Screening Lists",
    category: "Sanctions Screening",
    priority: "high",
    status: "in_progress",
    estimatedTime: "30 minutes",
    autoApply: false,
  },
  {
    id: 3,
    tenant: "Global Bank Ltd",
    action: "Reset KYC Verification Thresholds",
    category: "KYC Documentation",
    priority: "medium",
    status: "scheduled",
    estimatedTime: "5 minutes",
    autoApply: true,
  },
]

export function ComplianceDriftDetector() {
  const [selectedTenant, setSelectedTenant] = useState(tenantCompliance[0])

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800">Active</Badge>
      case "investigating":
        return <Badge className="bg-yellow-100 text-yellow-800">Investigating</Badge>
      case "escalated":
        return <Badge className="bg-purple-100 text-purple-800">Escalated</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getComplianceStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>
      case "drift":
        return <Badge className="bg-yellow-100 text-yellow-800">Drift Detected</Badge>
      case "non_compliant":
        return <Badge className="bg-red-100 text-red-800">Non-Compliant</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getActionStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "scheduled":
        return <Badge className="bg-purple-100 text-purple-800">Scheduled</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Overall Compliance</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">95.8%</div>
              <div className="text-xs text-gray-500 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                -1.2% this week
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Drift Alerts</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">9</div>
              <div className="text-xs text-gray-500">Active across tenants</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Critical Issues</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">2</div>
              <div className="text-xs text-gray-500">Require immediate action</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Auto-Remediation</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">6</div>
              <div className="text-xs text-gray-500">Actions completed</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
          <TabsTrigger value="alerts">Drift Alerts</TabsTrigger>
          <TabsTrigger value="tenants">Tenant Analysis</TabsTrigger>
          <TabsTrigger value="remediation">Auto-Remediation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Trends */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Compliance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    overall: { label: "Overall", color: "#3b82f6" },
                    kyc: { label: "KYC", color: "#10b981" },
                    aml: { label: "AML", color: "#f59e0b" },
                    sanctions: { label: "Sanctions", color: "#ef4444" },
                    reporting: { label: "Reporting", color: "#8b5cf6" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={complianceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[90, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="overall"
                        stroke="var(--color-overall)"
                        fill="var(--color-overall)"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="aml"
                        stroke="var(--color-aml)"
                        fill="var(--color-aml)"
                        fillOpacity={0.4}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Compliance Categories */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Compliance Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{category.name}</span>
                        {getComplianceStatusBadge(category.status)}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{category.score}%</div>
                        <div className="text-xs text-gray-500">Target: {category.threshold}%</div>
                      </div>
                    </div>
                    <Progress value={category.score} className="h-2" />
                    <div className="text-xs text-gray-500">{category.issues} active issues</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Active Drift Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driftAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.tenant}</TableCell>
                      <TableCell>{alert.category}</TableCell>
                      <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm">{alert.description}</div>
                        <div className="text-xs text-gray-500">{alert.detected}</div>
                      </TableCell>
                      <TableCell className="text-sm text-red-600">{alert.impact}</TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          {alert.autoRemediation && <Button size="sm">Fix</Button>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tenant List */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Tenant Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenantCompliance.map((tenant, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTenant.tenant === tenant.tenant
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTenant(tenant)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(tenant.trend)}
                        <span className="font-medium text-sm">{tenant.tenant}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{tenant.overall}%</div>
                        {tenant.alerts > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {tenant.alerts} alerts
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={tenant.overall} className="mb-2" />
                    <div className="text-xs text-gray-500">Last audit: {tenant.lastAudit}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Detailed Tenant Analysis */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium">{selectedTenant.tenant} - Compliance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Compliance Breakdown */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-2">KYC Documentation</div>
                      <div className="text-2xl font-light">{selectedTenant.kyc}%</div>
                      <Progress value={selectedTenant.kyc} className="mt-2" />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">AML Monitoring</div>
                      <div className="text-2xl font-light">{selectedTenant.aml}%</div>
                      <Progress value={selectedTenant.aml} className="mt-2" />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">Sanctions Screening</div>
                      <div className="text-2xl font-light">{selectedTenant.sanctions}%</div>
                      <Progress value={selectedTenant.sanctions} className="mt-2" />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">Regulatory Reporting</div>
                      <div className="text-2xl font-light">{selectedTenant.reporting}%</div>
                      <Progress value={selectedTenant.reporting} className="mt-2" />
                    </div>
                  </div>

                  {/* Summary and Actions */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Compliance Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Overall Score</span>
                          <span className="font-medium">{selectedTenant.overall}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Trend</span>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(selectedTenant.trend)}
                            <span className="font-medium capitalize">{selectedTenant.trend}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Active Alerts</span>
                          <span className="font-medium">{selectedTenant.alerts}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Last Audit</span>
                          <span className="font-medium">{selectedTenant.lastAudit}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure Rules
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Audit Trail
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Clock className="h-4 w-4 mr-2" />
                          Schedule Audit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="remediation" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Auto-Remediation Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Est. Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {remediationActions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell className="font-medium">{action.tenant}</TableCell>
                      <TableCell>{action.action}</TableCell>
                      <TableCell>{action.category}</TableCell>
                      <TableCell>{getPriorityBadge(action.priority)}</TableCell>
                      <TableCell>{getActionStatusBadge(action.status)}</TableCell>
                      <TableCell>{action.estimatedTime}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {action.autoApply ? (
                            <Button size="sm">Apply Now</Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
