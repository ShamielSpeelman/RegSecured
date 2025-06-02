"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, Clock, Brain, TrendingUp, Eye, Zap } from "lucide-react"

const userEngagementData = [
  { month: "Jan", activeUsers: 142, sessionDuration: 24, pageViews: 8.2, featureAdoption: 68 },
  { month: "Feb", activeUsers: 156, sessionDuration: 26, pageViews: 9.1, featureAdoption: 72 },
  { month: "Mar", activeUsers: 148, sessionDuration: 22, pageViews: 7.8, featureAdoption: 69 },
  { month: "Apr", activeUsers: 167, sessionDuration: 28, pageViews: 10.3, featureAdoption: 75 },
  { month: "May", activeUsers: 189, sessionDuration: 31, pageViews: 11.7, featureAdoption: 78 },
  { month: "Jun", activeUsers: 203, sessionDuration: 33, pageViews: 12.4, featureAdoption: 82 },
]

const featureUsageData = [
  { feature: "KYC Processing", usage: 89, satisfaction: 92, adoption: 78, trend: "up" },
  { feature: "Risk Assessment", usage: 76, satisfaction: 88, adoption: 65, trend: "up" },
  { feature: "Transaction Monitoring", usage: 82, satisfaction: 85, adoption: 71, trend: "stable" },
  { feature: "Compliance Reporting", usage: 68, satisfaction: 79, adoption: 58, trend: "down" },
  { feature: "Document Verification", usage: 91, satisfaction: 94, adoption: 83, trend: "up" },
  { feature: "Sanctions Screening", usage: 73, satisfaction: 81, adoption: 62, trend: "stable" },
]

const userJourneyAnalysis = [
  {
    stage: "Onboarding",
    completionRate: 87,
    avgTime: "12 minutes",
    dropoffPoints: ["Document upload", "Identity verification"],
    improvement: "Simplify upload process",
    impact: "High",
  },
  {
    stage: "First KYC",
    completionRate: 92,
    avgTime: "8 minutes",
    dropoffPoints: ["Risk assessment setup"],
    improvement: "Add guided tutorial",
    impact: "Medium",
  },
  {
    stage: "Feature Discovery",
    completionRate: 64,
    avgTime: "25 minutes",
    dropoffPoints: ["Advanced settings", "Integration setup"],
    improvement: "Progressive disclosure",
    impact: "High",
  },
  {
    stage: "Regular Usage",
    completionRate: 78,
    avgTime: "15 minutes",
    dropoffPoints: ["Report generation", "Bulk operations"],
    improvement: "Workflow optimization",
    impact: "Medium",
  },
]

const behaviorSegments = [
  {
    segment: "Power Users",
    percentage: 23,
    characteristics: ["High feature usage", "Long sessions", "Advanced workflows"],
    revenue: 45,
    satisfaction: 94,
    churnRisk: 8,
  },
  {
    segment: "Regular Users",
    percentage: 52,
    characteristics: ["Consistent usage", "Core features", "Standard workflows"],
    revenue: 38,
    satisfaction: 86,
    churnRisk: 15,
  },
  {
    segment: "Occasional Users",
    percentage: 18,
    characteristics: ["Sporadic usage", "Basic features", "Simple workflows"],
    revenue: 12,
    satisfaction: 72,
    churnRisk: 35,
  },
  {
    segment: "At-Risk Users",
    percentage: 7,
    characteristics: ["Declining usage", "Support tickets", "Login issues"],
    revenue: 5,
    satisfaction: 58,
    churnRisk: 68,
  },
]

const aiInsights = [
  {
    insight: "Users who complete onboarding tutorial have 34% higher feature adoption",
    confidence: 92,
    recommendation: "Make tutorial mandatory for new users",
    impact: "High",
    effort: "Low",
  },
  {
    insight: "Mobile usage correlates with 28% increase in daily engagement",
    confidence: 87,
    recommendation: "Prioritize mobile app development",
    impact: "High",
    effort: "High",
  },
  {
    insight: "Users accessing help docs are 45% more likely to upgrade",
    confidence: 89,
    recommendation: "Improve help content discoverability",
    impact: "Medium",
    effort: "Medium",
  },
]

export function UserBehaviorAnalytics() {
  const getTrendIcon = (trend: string) => {
    const icons = {
      up: <TrendingUp className="h-4 w-4 text-green-500" />,
      down: <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />,
      stable: <div className="h-4 w-4 bg-gray-400 rounded-full" />,
    }
    return icons[trend as keyof typeof icons]
  }

  const getImpactBadge = (impact: string) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[impact as keyof typeof colors]}>{impact}</Badge>
  }

  const getSegmentColor = (segment: string) => {
    const colors = {
      "Power Users": "#3b82f6",
      "Regular Users": "#10b981",
      "Occasional Users": "#f59e0b",
      "At-Risk Users": "#ef4444",
    }
    return colors[segment as keyof typeof colors]
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="border-indigo-200 bg-indigo-50/50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Brain className="h-5 w-5 text-indigo-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-indigo-900 mb-1">User Behavior Insights</h3>
              <p className="text-sm text-indigo-800 mb-2">
                Analysis reveals 34% higher feature adoption for tutorial completers. Mobile usage drives 28% engagement
                increase. Power users (23%) generate 45% of revenue with 94% satisfaction. At-risk segment needs
                immediate attention.
              </p>
              <div className="flex items-center space-x-4 text-xs text-indigo-700">
                <span>Behavior Model Accuracy: 91%</span>
                <span>•</span>
                <span>Analysis updated: 30 minutes ago</span>
                <span>•</span>
                <span>Next insights: 4 hours</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
          <TabsTrigger value="journey">User Journey</TabsTrigger>
          <TabsTrigger value="segments">Behavior Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Active Users</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">203</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    +7.4% this month
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Avg Session</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">33 min</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    +6.5% this month
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Page Views</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">12.4</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    +5.6% this month
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Feature Adoption</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">82%</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    +5.1% this month
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Trends */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">User Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    activeUsers: { label: "Active Users", color: "#3b82f6" },
                    sessionDuration: { label: "Session Duration", color: "#10b981" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="activeUsers" stroke="var(--color-activeUsers)" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="sessionDuration"
                        stroke="var(--color-sessionDuration)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">AI-Generated Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="text-sm font-medium mb-2">{insight.insight}</div>
                      <div className="text-xs text-blue-600 mb-2">
                        <strong>Recommendation:</strong> {insight.recommendation}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getImpactBadge(insight.impact)}
                          <span className="text-xs text-gray-500">Effort: {insight.effort}</span>
                        </div>
                        <div className="text-xs text-gray-500">Confidence: {insight.confidence}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Feature Usage Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Usage Rate</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Adoption</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {featureUsageData.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{feature.feature}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{feature.usage}%</span>
                          <Progress value={feature.usage} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{feature.satisfaction}%</span>
                          <Progress value={feature.satisfaction} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{feature.adoption}%</span>
                          <Progress value={feature.adoption} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{getTrendIcon(feature.trend)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Optimize
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">User Journey Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userJourneyAnalysis.map((stage, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{stage.stage}</span>
                        {getImpactBadge(stage.impact)}
                      </div>
                      <span className="text-sm text-gray-500">{stage.avgTime}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-500">Completion Rate</div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{stage.completionRate}%</span>
                          <Progress value={stage.completionRate} className="w-16 h-2" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Drop-off Points</div>
                        <div className="text-sm">{stage.dropoffPoints.join(", ")}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Improvement</div>
                        <div className="text-sm text-blue-600">{stage.improvement}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Implement Fix
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Segment Distribution */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">User Segment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    percentage: { label: "Percentage", color: "#3b82f6" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={behaviorSegments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="percentage" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Segment Details */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Segment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {behaviorSegments.map((segment, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{segment.segment}</span>
                        <span className="text-sm text-gray-500">{segment.percentage}% of users</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{segment.characteristics.join(" • ")}</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Revenue:</span>
                          <span className="ml-1 font-medium">{segment.revenue}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Satisfaction:</span>
                          <span className="ml-1 font-medium">{segment.satisfaction}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Churn Risk:</span>
                          <span className="ml-1 font-medium">{segment.churnRisk}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
