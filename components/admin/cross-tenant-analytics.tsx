"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, Clock } from "lucide-react"

const performanceData = [
  { month: "Jan", acme: 85, global: 78, fintech: 92 },
  { month: "Feb", acme: 88, global: 82, fintech: 89 },
  { month: "Mar", acme: 92, global: 85, fintech: 94 },
  { month: "Apr", acme: 89, global: 88, fintech: 91 },
  { month: "May", acme: 94, global: 90, fintech: 96 },
  { month: "Jun", acme: 91, global: 87, fintech: 93 },
]

const usageData = [
  { name: "KYC Processing", value: 35, color: "#3b82f6" },
  { name: "Transaction Monitoring", value: 28, color: "#10b981" },
  { name: "Risk Assessment", value: 20, color: "#f59e0b" },
  { name: "Compliance Reporting", value: 17, color: "#ef4444" },
]

const benchmarkData = [
  {
    tenant: "Acme Financial",
    plan: "Enterprise",
    users: 45,
    kycProcessed: 1250,
    avgProcessingTime: "2.3 min",
    complianceScore: 94,
    riskAlerts: 12,
    trend: "up",
  },
  {
    tenant: "Global Bank Ltd",
    plan: "Professional",
    users: 28,
    kycProcessed: 890,
    avgProcessingTime: "3.1 min",
    complianceScore: 87,
    riskAlerts: 8,
    trend: "up",
  },
  {
    tenant: "FinTech Innovations",
    plan: "Starter",
    users: 22,
    kycProcessed: 650,
    avgProcessingTime: "4.2 min",
    complianceScore: 91,
    riskAlerts: 15,
    trend: "down",
  },
  {
    tenant: "Crypto Exchange Pro",
    plan: "Enterprise",
    users: 67,
    kycProcessed: 2100,
    avgProcessingTime: "1.8 min",
    complianceScore: 96,
    riskAlerts: 6,
    trend: "up",
  },
]

const industryBenchmarks = [
  { metric: "KYC Processing Time", industry: "3.5 min", platform: "2.8 min", performance: "above" },
  { metric: "Compliance Score", industry: "85%", platform: "92%", performance: "above" },
  { metric: "False Positive Rate", industry: "12%", platform: "8%", performance: "above" },
  { metric: "User Satisfaction", industry: "78%", platform: "89%", performance: "above" },
  { metric: "System Uptime", industry: "99.5%", platform: "99.8%", performance: "above" },
]

export function CrossTenantAnalytics() {
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  const getPerformanceBadge = (performance: string) => {
    return performance === "above" ? (
      <Badge className="bg-green-100 text-green-800">Above Industry</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Below Industry</Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Active Users</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">162</div>
              <div className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +8% this month
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Avg Compliance Score</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">92%</div>
              <div className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +2% this month
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Avg Processing Time</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">2.8 min</div>
              <div className="text-xs text-gray-500 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                -12% this month
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Revenue per User</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">$33</div>
              <div className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +5% this month
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance Comparison</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Compliance Score Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    acme: { label: "Acme Financial", color: "#3b82f6" },
                    global: { label: "Global Bank", color: "#10b981" },
                    fintech: { label: "FinTech Innovations", color: "#f59e0b" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="acme" stroke="var(--color-acme)" strokeWidth={2} />
                      <Line type="monotone" dataKey="global" stroke="var(--color-global)" strokeWidth={2} />
                      <Line type="monotone" dataKey="fintech" stroke="var(--color-fintech)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Tenant Comparison Table */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Tenant Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>KYC/Month</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {benchmarkData.map((tenant, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{tenant.tenant}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{tenant.complianceScore}%</span>
                            <Progress value={tenant.complianceScore} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{tenant.kycProcessed}</TableCell>
                        <TableCell>{getTrendIcon(tenant.trend)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Usage Distribution */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Feature Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    kyc: { label: "KYC Processing", color: "#3b82f6" },
                    monitoring: { label: "Transaction Monitoring", color: "#10b981" },
                    risk: { label: "Risk Assessment", color: "#f59e0b" },
                    compliance: { label: "Compliance Reporting", color: "#ef4444" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={usageData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {usageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Detailed Tenant Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benchmarkData.map((tenant, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{tenant.tenant}</span>
                        <Badge variant="outline">{tenant.plan}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-gray-500">Users:</span>
                          <span className="ml-1 font-medium">{tenant.users}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Avg Time:</span>
                          <span className="ml-1 font-medium">{tenant.avgProcessingTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">KYC Processed:</span>
                          <span className="ml-1 font-medium">{tenant.kycProcessed}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Risk Alerts:</span>
                          <span className="ml-1 font-medium">{tenant.riskAlerts}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Industry Benchmark Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Industry Average</TableHead>
                    <TableHead>Platform Average</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {industryBenchmarks.map((benchmark, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{benchmark.metric}</TableCell>
                      <TableCell>{benchmark.industry}</TableCell>
                      <TableCell className="font-medium">{benchmark.platform}</TableCell>
                      <TableCell>{getPerformanceBadge(benchmark.performance)}</TableCell>
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
