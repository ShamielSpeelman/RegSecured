"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, BarChart, Bar, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertTriangle, Calendar, Brain, Shield, FileText, Clock, Zap, CheckCircle } from "lucide-react"

const regulatoryChanges = [
  {
    regulation: "EU Digital Operational Resilience Act (DORA)",
    jurisdiction: "European Union",
    effectiveDate: "2025-01-17",
    status: "Upcoming",
    impactLevel: "High",
    affectedTenants: 8,
    estimatedCost: 125000,
    complianceGap: 34,
    aiConfidence: 89,
    description: "New operational resilience requirements for financial entities",
    keyRequirements: ["ICT risk management", "Incident reporting", "Third-party risk"],
  },
  {
    regulation: "Basel III Final Reforms",
    jurisdiction: "Global",
    effectiveDate: "2025-01-01",
    status: "Active",
    impactLevel: "High",
    affectedTenants: 12,
    estimatedCost: 89000,
    complianceGap: 28,
    aiConfidence: 92,
    description: "Enhanced capital and liquidity requirements",
    keyRequirements: ["Capital ratios", "Liquidity coverage", "Risk reporting"],
  },
  {
    regulation: "FINTRAC Amendments",
    jurisdiction: "Canada",
    effectiveDate: "2024-12-01",
    status: "Monitoring",
    impactLevel: "Medium",
    affectedTenants: 3,
    estimatedCost: 45000,
    complianceGap: 18,
    aiConfidence: 76,
    description: "Updated AML/CTF reporting requirements",
    keyRequirements: ["Enhanced due diligence", "Beneficial ownership", "Suspicious transaction reporting"],
  },
]

const impactTimeline = [
  { month: "Jan 2025", dora: 85, basel: 92, fintrac: 78, total: 85 },
  { month: "Feb 2025", dora: 78, basel: 89, fintrac: 82, total: 83 },
  { month: "Mar 2025", dora: 72, basel: 86, fintrac: 85, total: 81 },
  { month: "Apr 2025", dora: 65, basel: 83, fintrac: 88, total: 79 },
  { month: "May 2025", dora: 58, basel: 80, fintrac: 91, total: 76 },
  { month: "Jun 2025", dora: 45, basel: 77, fintrac: 94, total: 72 },
]

const tenantReadiness = [
  {
    tenant: "Acme Financial",
    doraReadiness: 78,
    baselReadiness: 85,
    fintracReadiness: 92,
    overallScore: 85,
    priority: "Medium",
    estimatedEffort: "6-8 weeks",
    keyGaps: ["ICT governance", "Incident response"],
  },
  {
    tenant: "Global Bank Ltd",
    doraReadiness: 45,
    baselReadiness: 72,
    fintracReadiness: 88,
    overallScore: 68,
    priority: "High",
    estimatedEffort: "12-16 weeks",
    keyGaps: ["Risk management", "Third-party oversight", "Capital planning"],
  },
  {
    tenant: "Crypto Exchange Pro",
    doraReadiness: 82,
    baselReadiness: 68,
    fintracReadiness: 95,
    overallScore: 82,
    priority: "Low",
    estimatedEffort: "4-6 weeks",
    keyGaps: ["Liquidity requirements"],
  },
]

const automatedActions = [
  {
    action: "Update KYC documentation templates",
    regulation: "FINTRAC Amendments",
    status: "Completed",
    affectedTenants: 3,
    completedDate: "2024-11-15",
    confidence: 95,
  },
  {
    action: "Implement enhanced risk scoring",
    regulation: "Basel III Final Reforms",
    status: "In Progress",
    affectedTenants: 12,
    estimatedCompletion: "2024-12-30",
    confidence: 88,
  },
  {
    action: "Deploy incident reporting module",
    regulation: "EU DORA",
    status: "Planned",
    affectedTenants: 8,
    plannedStart: "2025-01-02",
    confidence: 82,
  },
]

const complianceCosts = [
  { category: "Technology Updates", cost: 145000, percentage: 42 },
  { category: "Process Changes", cost: 89000, percentage: 26 },
  { category: "Training & Education", cost: 56000, percentage: 16 },
  { category: "External Consulting", cost: 34000, percentage: 10 },
  { category: "Regulatory Fees", cost: 21000, percentage: 6 },
]

export function RegulatoryChangeImpactAssessment() {
  const getStatusBadge = (status: string) => {
    const colors = {
      Upcoming: "bg-yellow-100 text-yellow-800",
      Active: "bg-red-100 text-red-800",
      Monitoring: "bg-blue-100 text-blue-800",
      Completed: "bg-green-100 text-green-800",
      "In Progress": "bg-orange-100 text-orange-800",
      Planned: "bg-purple-100 text-purple-800",
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  const getImpactBadge = (level: string) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[level as keyof typeof colors]}>{level}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Brain className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-orange-900 mb-1">Regulatory Impact Analysis</h3>
              <p className="text-sm text-orange-800 mb-2">
                EU DORA implementation requires immediate attention for 8 tenants with estimated $125K impact. Global
                Bank Ltd shows highest compliance gap (32%) requiring 12-16 weeks effort. Automated remediation deployed
                for 67% of requirements.
              </p>
              <div className="flex items-center space-x-4 text-xs text-orange-700">
                <span>Impact Model Accuracy: 87%</span>
                <span>•</span>
                <span>Regulatory scan: 2 hours ago</span>
                <span>•</span>
                <span>Next assessment: Daily</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Regulatory Overview</TabsTrigger>
          <TabsTrigger value="timeline">Impact Timeline</TabsTrigger>
          <TabsTrigger value="readiness">Tenant Readiness</TabsTrigger>
          <TabsTrigger value="automation">Automated Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Active Regulations</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">23</div>
                  <div className="text-xs text-gray-500">3 new this quarter</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">High Impact</span>
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
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Compliance Gap</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">27%</div>
                  <div className="text-xs text-gray-500">Average across tenants</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Est. Cost</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">$259K</div>
                  <div className="text-xs text-gray-500">Total implementation</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regulatory Changes */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Key Regulatory Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regulatoryChanges.map((regulation, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{regulation.regulation}</span>
                        {getStatusBadge(regulation.status)}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{regulation.description}</div>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <div className="text-xs text-gray-500">Effective Date</div>
                          <div className="text-sm font-medium">{regulation.effectiveDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Impact Level</div>
                          <div className="flex items-center space-x-2">{getImpactBadge(regulation.impactLevel)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Affected Tenants</div>
                          <div className="text-sm font-medium">{regulation.affectedTenants}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Est. Cost</div>
                          <div className="text-sm font-medium">${regulation.estimatedCost.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        <strong>Key Requirements:</strong> {regulation.keyRequirements.join(", ")}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">AI Confidence: {regulation.aiConfidence}%</div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Costs */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Compliance Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    cost: { label: "Cost", color: "#3b82f6" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={complianceCosts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="cost" fill="var(--color-cost)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {complianceCosts.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="font-medium">
                        ${item.cost.toLocaleString()} ({item.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Regulatory Impact Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  dora: { label: "EU DORA", color: "#3b82f6" },
                  basel: { label: "Basel III", color: "#10b981" },
                  fintrac: { label: "FINTRAC", color: "#f59e0b" },
                  total: { label: "Total Impact", color: "#ef4444" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={impactTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="dora"
                      stackId="1"
                      stroke="var(--color-dora)"
                      fill="var(--color-dora)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="basel"
                      stackId="1"
                      stroke="var(--color-basel)"
                      fill="var(--color-basel)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="fintrac"
                      stackId="1"
                      stroke="var(--color-fintrac)"
                      fill="var(--color-fintrac)"
                      fillOpacity={0.6}
                    />
                    <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="readiness" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Tenant Readiness Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>DORA</TableHead>
                    <TableHead>Basel III</TableHead>
                    <TableHead>FINTRAC</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Effort</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenantReadiness.map((tenant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{tenant.tenant}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{tenant.overallScore}%</span>
                          <Progress value={tenant.overallScore} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{tenant.doraReadiness}%</TableCell>
                      <TableCell>{tenant.baselReadiness}%</TableCell>
                      <TableCell>{tenant.fintracReadiness}%</TableCell>
                      <TableCell>{getPriorityBadge(tenant.priority)}</TableCell>
                      <TableCell className="text-sm">{tenant.estimatedEffort}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 space-y-2">
                {tenantReadiness.map((tenant, index) => (
                  <div key={index} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                    <strong>{tenant.tenant} Key Gaps:</strong> {tenant.keyGaps.join(", ")}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Automated Compliance Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automatedActions.map((action, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {action.status === "Completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : action.status === "In Progress" ? (
                          <Clock className="h-5 w-5 text-orange-500" />
                        ) : (
                          <Calendar className="h-5 w-5 text-blue-500" />
                        )}
                        <span className="font-medium">{action.action}</span>
                        {getStatusBadge(action.status)}
                      </div>
                      <span className="text-sm text-gray-500">{action.affectedTenants} tenants</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Regulation:</strong> {action.regulation}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {action.status === "Completed" && `Completed: ${action.completedDate}`}
                        {action.status === "In Progress" && `Est. Completion: ${action.estimatedCompletion}`}
                        {action.status === "Planned" && `Planned Start: ${action.plannedStart}`}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Confidence: {action.confidence}%</span>
                        {action.status !== "Completed" && (
                          <Button size="sm" variant="outline">
                            <Zap className="h-4 w-4 mr-1" />
                            Execute
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
