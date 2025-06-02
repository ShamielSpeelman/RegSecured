"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DollarSign, TrendingUp, Brain, Target, Zap, Users, ArrowUp, ArrowDown } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 45000, predicted: 48000, churn: 5.2, newCustomers: 12 },
  { month: "Feb", revenue: 52000, predicted: 54000, churn: 4.8, newCustomers: 15 },
  { month: "Mar", revenue: 48000, predicted: 51000, churn: 6.1, newCustomers: 8 },
  { month: "Apr", revenue: 58000, predicted: 61000, churn: 4.2, newCustomers: 18 },
  { month: "May", revenue: 62000, predicted: 65000, churn: 3.9, newCustomers: 22 },
  { month: "Jun", revenue: 67000, predicted: 70000, churn: 3.5, newCustomers: 25 },
]

const pricingOptimization = [
  {
    plan: "Starter",
    currentPrice: 99,
    recommendedPrice: 129,
    elasticity: -0.8,
    expectedRevenue: "+18%",
    confidence: 87,
    reasoning: "Low price sensitivity, high feature utilization",
    impact: "High",
  },
  {
    plan: "Professional",
    currentPrice: 299,
    recommendedPrice: 279,
    elasticity: -1.2,
    expectedRevenue: "+12%",
    confidence: 82,
    reasoning: "Price-sensitive segment, optimize for volume",
    impact: "Medium",
  },
  {
    plan: "Enterprise",
    currentPrice: 899,
    recommendedPrice: 999,
    elasticity: -0.6,
    expectedRevenue: "+8%",
    confidence: 91,
    reasoning: "Premium positioning, value-based pricing",
    impact: "High",
  },
]

const customerSegments = [
  { segment: "High-Value Banking", revenue: 35, growth: 12, churnRisk: 8, color: "#3b82f6" },
  { segment: "Growing FinTech", revenue: 28, growth: 25, churnRisk: 15, color: "#10b981" },
  { segment: "Crypto Exchanges", revenue: 22, growth: 18, churnRisk: 12, color: "#f59e0b" },
  { segment: "Small Financial", revenue: 15, growth: 8, churnRisk: 22, color: "#ef4444" },
]

const upsellOpportunities = [
  {
    tenant: "Acme Financial",
    currentPlan: "Professional",
    suggestedPlan: "Enterprise",
    probability: 78,
    potentialRevenue: 7200,
    timeframe: "2-3 months",
    triggers: ["High API usage", "Multiple user requests", "Compliance needs"],
    confidence: 85,
  },
  {
    tenant: "FinTech Innovations",
    currentPlan: "Starter",
    suggestedPlan: "Professional",
    probability: 65,
    potentialRevenue: 2400,
    timeframe: "1-2 months",
    triggers: ["Feature usage limits", "Support requests", "Team growth"],
    confidence: 72,
  },
  {
    tenant: "Global Bank Ltd",
    currentPlan: "Professional",
    suggestedPlan: "Enterprise",
    probability: 82,
    potentialRevenue: 7200,
    timeframe: "3-4 months",
    triggers: ["Regulatory requirements", "Volume growth", "Integration needs"],
    confidence: 89,
  },
]

const churnRiskAnalysis = [
  {
    tenant: "Small Credit Union",
    plan: "Starter",
    churnProbability: 68,
    riskLevel: "High",
    revenue: 1188,
    factors: ["Low engagement", "Support tickets", "Payment delays"],
    recommendation: "Immediate intervention with customer success team",
    confidence: 91,
  },
  {
    tenant: "Regional Bank",
    plan: "Professional",
    churnProbability: 45,
    riskLevel: "Medium",
    revenue: 3588,
    factors: ["Decreased usage", "Competitor evaluation"],
    recommendation: "Proactive outreach with value demonstration",
    confidence: 76,
  },
]

export function RevenueOptimizationInsights() {
  const getImpactBadge = (impact: string) => {
    const colors = {
      High: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-gray-100 text-gray-800",
    }
    return <Badge className={colors[impact as keyof typeof colors]}>{impact}</Badge>
  }

  const getRiskBadge = (level: string) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[level as keyof typeof colors]}>{level}</Badge>
  }

  const getPriceChangeIcon = (current: number, recommended: number) => {
    return recommended > current ? (
      <ArrowUp className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowDown className="h-4 w-4 text-red-500" />
    )
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Brain className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-green-900 mb-1">Revenue Optimization Insights</h3>
              <p className="text-sm text-green-800 mb-2">
                AI models predict 23% revenue increase through strategic pricing adjustments. Acme Financial shows 78%
                upsell probability. Starter plan pricing optimization could generate additional $18% revenue with 87%
                confidence.
              </p>
              <div className="flex items-center space-x-4 text-xs text-green-700">
                <span>Model Accuracy: 89%</span>
                <span>•</span>
                <span>Revenue forecast updated: 1 hour ago</span>
                <span>•</span>
                <span>Next optimization: Daily</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Optimization</TabsTrigger>
          <TabsTrigger value="upsell">Upsell Opportunities</TabsTrigger>
          <TabsTrigger value="churn">Churn Prevention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Monthly Revenue</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">$67,000</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    +8.2% this month
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Revenue Target</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">$70,000</div>
                  <div className="text-xs text-gray-500">95.7% achieved</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Churn Rate</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">3.5%</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1 text-green-500" />
                    -0.4% this month
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Upsell Potential</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">$16,800</div>
                  <div className="text-xs text-gray-500">Next 3 months</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trends */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Revenue vs Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: { label: "Actual Revenue", color: "#3b82f6" },
                    predicted: { label: "Predicted Revenue", color: "#10b981" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Customer Segments */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Revenue by Customer Segment</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: { label: "Revenue %", color: "#3b82f6" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="revenue"
                        label={({ segment, revenue }) => `${segment}: ${revenue}%`}
                      >
                        {customerSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">AI-Powered Pricing Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Recommended</TableHead>
                    <TableHead>Expected Revenue</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingOptimization.map((plan, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{plan.plan}</TableCell>
                      <TableCell>${plan.currentPrice}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>${plan.recommendedPrice}</span>
                          {getPriceChangeIcon(plan.currentPrice, plan.recommendedPrice)}
                        </div>
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">{plan.expectedRevenue}</TableCell>
                      <TableCell>{getImpactBadge(plan.impact)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{plan.confidence}%</span>
                          <Progress value={plan.confidence} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Apply
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 space-y-2">
                {pricingOptimization.map((plan, index) => (
                  <div key={index} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                    <strong>{plan.plan}:</strong> {plan.reasoning}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upsell" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Upsell Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upsellOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{opportunity.tenant}</span>
                        <Badge variant="outline">
                          {opportunity.currentPlan} → {opportunity.suggestedPlan}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">{opportunity.timeframe}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-500">Probability</div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{opportunity.probability}%</span>
                          <Progress value={opportunity.probability} className="w-16 h-2" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Potential Revenue</div>
                        <div className="text-sm font-medium text-green-600">
                          ${opportunity.potentialRevenue.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Confidence</div>
                        <div className="text-sm font-medium">{opportunity.confidence}%</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-3">
                      <strong>Triggers:</strong> {opportunity.triggers.join(", ")}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Contact Customer
                      </Button>
                      <Button size="sm">Create Campaign</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="churn" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Churn Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {churnRiskAnalysis.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{risk.tenant}</span>
                        {getRiskBadge(risk.riskLevel)}
                        <Badge variant="outline">{risk.plan}</Badge>
                      </div>
                      <span className="text-sm font-medium text-red-600">${risk.revenue.toLocaleString()} at risk</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500">Churn Probability:</span>
                        <span className="text-sm font-medium">{risk.churnProbability}%</span>
                        <Progress value={risk.churnProbability} className="w-24 h-2" />
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        <strong>Risk Factors:</strong> {risk.factors.join(", ")}
                      </div>
                      <div className="text-xs text-blue-600">
                        <strong>Recommendation:</strong> {risk.recommendation}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">ML Confidence: {risk.confidence}%</div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Schedule Call
                        </Button>
                        <Button size="sm">Immediate Action</Button>
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
