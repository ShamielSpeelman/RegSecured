"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Target, Brain, Download, Filter } from "lucide-react"

const performanceMetrics = [
  { month: "Jan", acme: 94, global: 87, fintech: 91, crypto: 89, average: 90 },
  { month: "Feb", acme: 96, global: 89, fintech: 93, crypto: 92, average: 92 },
  { month: "Mar", acme: 93, global: 91, fintech: 95, crypto: 94, average: 93 },
  { month: "Apr", acme: 97, global: 88, fintech: 92, crypto: 96, average: 93 },
  { month: "May", acme: 95, global: 93, fintech: 97, crypto: 98, average: 96 },
  { month: "Jun", acme: 98, global: 95, fintech: 94, crypto: 97, average: 96 },
]

const tenantBenchmarks = [
  {
    tenant: "Acme Financial",
    industry: "Banking",
    plan: "Enterprise",
    users: 245,
    complianceScore: 98,
    processingTime: 1.8,
    customerSat: 94,
    revenue: 12500,
    efficiency: 96,
    rank: 1,
    aiInsight: "Top performer across all metrics. Consider as benchmark for best practices.",
    confidence: 95,
  },
  {
    tenant: "Crypto Exchange Pro",
    industry: "Cryptocurrency",
    plan: "Enterprise",
    users: 189,
    complianceScore: 97,
    processingTime: 2.1,
    customerSat: 92,
    revenue: 11200,
    efficiency: 94,
    rank: 2,
    aiInsight: "Strong performance with room for processing time optimization.",
    confidence: 88,
  },
  {
    tenant: "FinTech Innovations",
    industry: "FinTech",
    plan: "Professional",
    users: 156,
    complianceScore: 94,
    processingTime: 2.4,
    customerSat: 89,
    revenue: 8900,
    efficiency: 91,
    rank: 3,
    aiInsight: "Good performance, potential for customer satisfaction improvement.",
    confidence: 82,
  },
  {
    tenant: "Global Bank Ltd",
    industry: "Banking",
    plan: "Professional",
    users: 134,
    complianceScore: 91,
    processingTime: 3.2,
    customerSat: 86,
    revenue: 7800,
    efficiency: 87,
    rank: 4,
    aiInsight: "Below average performance. Recommend process optimization review.",
    confidence: 91,
  },
]

const industryBenchmarks = [
  { industry: "Banking", avgCompliance: 93, avgProcessing: 2.8, avgSatisfaction: 88, tenantCount: 12 },
  { industry: "FinTech", avgCompliance: 91, avgProcessing: 3.1, avgSatisfaction: 85, tenantCount: 8 },
  { industry: "Cryptocurrency", avgCompliance: 89, avgProcessing: 2.9, avgSatisfaction: 83, tenantCount: 6 },
  { industry: "Insurance", avgCompliance: 94, avgProcessing: 3.5, avgSatisfaction: 87, tenantCount: 4 },
]

const correlationData = [
  { users: 50, revenue: 3200, efficiency: 78 },
  { users: 89, revenue: 5600, efficiency: 82 },
  { users: 134, revenue: 7800, efficiency: 87 },
  { users: 156, revenue: 8900, efficiency: 91 },
  { users: 189, revenue: 11200, efficiency: 94 },
  { users: 245, revenue: 12500, efficiency: 96 },
]

export function CrossTenantBenchmarking() {
  const getRankBadge = (rank: number) => {
    const colors = {
      1: "bg-yellow-100 text-yellow-800",
      2: "bg-gray-100 text-gray-800",
      3: "bg-orange-100 text-orange-800",
    }
    return <Badge className={colors[rank as keyof typeof colors] || "bg-blue-100 text-blue-800"}>#{rank}</Badge>
  }

  const getPerformanceIcon = (score: number) => {
    return score >= 95 ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : score >= 90 ? (
      <Target className="h-4 w-4 text-blue-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-orange-500" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="banking">Banking</SelectItem>
              <SelectItem value="fintech">FinTech</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* AI Insights Panel */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 mb-1">AI Performance Insights</h3>
              <p className="text-sm text-blue-800 mb-2">
                Analysis shows Acme Financial leading with 98% compliance score. Crypto Exchange Pro demonstrates strong
                growth trajectory. Global Bank Ltd shows potential for 23% efficiency improvement through process
                optimization.
              </p>
              <div className="flex items-center space-x-4 text-xs text-blue-700">
                <span>Confidence: 92%</span>
                <span>•</span>
                <span>Last updated: 2 minutes ago</span>
                <span>•</span>
                <span>Next analysis: 1 hour</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Comparison</TabsTrigger>
          <TabsTrigger value="industry">Industry Benchmarks</TabsTrigger>
          <TabsTrigger value="correlations">Performance Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trends */}
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
                    crypto: { label: "Crypto Exchange Pro", color: "#8b5cf6" },
                    average: { label: "Platform Average", color: "#6b7280" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="acme" stroke="var(--color-acme)" strokeWidth={2} />
                      <Line type="monotone" dataKey="crypto" stroke="var(--color-crypto)" strokeWidth={2} />
                      <Line type="monotone" dataKey="fintech" stroke="var(--color-fintech)" strokeWidth={2} />
                      <Line type="monotone" dataKey="global" stroke="var(--color-global)" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="average"
                        stroke="var(--color-average)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tenantBenchmarks.slice(0, 4).map((tenant, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getRankBadge(tenant.rank)}
                        <div>
                          <div className="font-medium text-sm">{tenant.tenant}</div>
                          <div className="text-xs text-gray-500">
                            {tenant.industry} • {tenant.plan}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{tenant.complianceScore}%</div>
                          <div className="text-xs text-gray-500">Compliance</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{tenant.efficiency}%</div>
                          <div className="text-xs text-gray-500">Efficiency</div>
                        </div>
                        {getPerformanceIcon(tenant.efficiency)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Detailed Tenant Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Rank</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Processing Time</TableHead>
                    <TableHead>Customer Sat</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>AI Insight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenantBenchmarks.map((tenant, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{tenant.tenant}</div>
                          <div className="text-xs text-gray-500">{tenant.industry}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getRankBadge(tenant.rank)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{tenant.complianceScore}%</span>
                          <Progress value={tenant.complianceScore} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{tenant.processingTime} min</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{tenant.customerSat}%</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">${tenant.revenue.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-xs text-gray-600">
                          {tenant.aiInsight}
                          <div className="text-xs text-blue-600 mt-1">Confidence: {tenant.confidence}%</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industry" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Industry Benchmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Industry</TableHead>
                      <TableHead>Avg Compliance</TableHead>
                      <TableHead>Avg Processing</TableHead>
                      <TableHead>Avg Satisfaction</TableHead>
                      <TableHead>Tenants</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {industryBenchmarks.map((industry, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{industry.industry}</TableCell>
                        <TableCell>{industry.avgCompliance}%</TableCell>
                        <TableCell>{industry.avgProcessing} min</TableCell>
                        <TableCell>{industry.avgSatisfaction}%</TableCell>
                        <TableCell>{industry.tenantCount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Industry Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    compliance: { label: "Compliance Score", color: "#3b82f6" },
                    satisfaction: { label: "Customer Satisfaction", color: "#10b981" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={industryBenchmarks}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="industry" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="avgCompliance" fill="var(--color-compliance)" />
                      <Bar dataKey="avgSatisfaction" fill="var(--color-satisfaction)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Performance Correlations</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  efficiency: { label: "Efficiency Score", color: "#3b82f6" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="users" name="Users" />
                    <YAxis dataKey="revenue" name="Revenue" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Scatter dataKey="efficiency" fill="var(--color-efficiency)" />
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
