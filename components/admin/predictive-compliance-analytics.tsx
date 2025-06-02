"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertTriangle, Brain, Shield, Zap } from "lucide-react"

const riskPredictions = [
  { month: "Jul", predicted: 92, actual: 91, confidence: 88 },
  { month: "Aug", predicted: 89, actual: 88, confidence: 91 },
  { month: "Sep", predicted: 94, actual: 93, confidence: 85 },
  { month: "Oct", predicted: 91, actual: null, confidence: 89 },
  { month: "Nov", predicted: 88, actual: null, confidence: 82 },
  { month: "Dec", predicted: 93, actual: null, confidence: 86 },
]

const complianceRisks = [
  {
    tenant: "Global Bank Ltd",
    category: "AML Monitoring",
    currentScore: 87,
    predictedScore: 82,
    riskLevel: "High",
    probability: 78,
    timeframe: "2-3 weeks",
    factors: ["Increased transaction volume", "Staff turnover", "System latency"],
    recommendation: "Implement additional monitoring rules and staff training",
    confidence: 85,
  },
  {
    tenant: "FinTech Innovations",
    category: "KYC Documentation",
    currentScore: 91,
    predictedScore: 88,
    riskLevel: "Medium",
    probability: 65,
    timeframe: "4-6 weeks",
    factors: ["Document verification delays", "API integration issues"],
    recommendation: "Optimize document processing workflow",
    confidence: 72,
  },
  {
    tenant: "Crypto Exchange Pro",
    category: "Sanctions Screening",
    currentScore: 96,
    predictedScore: 94,
    riskLevel: "Low",
    probability: 42,
    timeframe: "8-10 weeks",
    factors: ["Regulatory updates", "Screening database changes"],
    recommendation: "Monitor regulatory changes and update screening rules",
    confidence: 68,
  },
]

const mlModelPerformance = [
  { model: "AML Risk Predictor", accuracy: 94, precision: 91, recall: 89, f1Score: 90, lastTrained: "2 days ago" },
  {
    model: "KYC Compliance Forecaster",
    accuracy: 88,
    precision: 85,
    recall: 92,
    f1Score: 88,
    lastTrained: "1 week ago",
  },
  { model: "Sanctions Risk Analyzer", accuracy: 96, precision: 94, recall: 93, f1Score: 93, lastTrained: "3 days ago" },
  {
    model: "Regulatory Change Impact",
    accuracy: 82,
    precision: 79,
    recall: 86,
    f1Score: 82,
    lastTrained: "5 days ago",
  },
]

const complianceTrends = [
  { month: "Jan", aml: 89, kyc: 92, sanctions: 95, reporting: 88 },
  { month: "Feb", aml: 91, kyc: 89, sanctions: 94, reporting: 90 },
  { month: "Mar", aml: 88, kyc: 94, sanctions: 96, reporting: 87 },
  { month: "Apr", aml: 93, kyc: 91, sanctions: 93, reporting: 92 },
  { month: "May", aml: 90, kyc: 96, sanctions: 97, reporting: 89 },
  { month: "Jun", aml: 94, kyc: 93, sanctions: 95, reporting: 94 },
]

const anomalyDetection = [
  {
    tenant: "Acme Financial",
    anomaly: "Unusual KYC rejection rate spike",
    severity: "Medium",
    detected: "2 hours ago",
    mlConfidence: 87,
    impact: "Potential compliance score drop of 3-5%",
    action: "Investigate document verification process",
  },
  {
    tenant: "Global Bank Ltd",
    anomaly: "AML alert processing delay",
    severity: "High",
    detected: "45 minutes ago",
    mlConfidence: 92,
    impact: "Risk of regulatory breach within 24h",
    action: "Immediate escalation to compliance team",
  },
]

export function PredictiveComplianceAnalytics() {
  const getRiskBadge = (level: string) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[level as keyof typeof colors]}>{level}</Badge>
  }

  const getSeverityBadge = (severity: string) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[severity as keyof typeof colors]}>{severity}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card className="border-purple-200 bg-purple-50/50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-purple-900 mb-1">ML-Powered Compliance Predictions</h3>
              <p className="text-sm text-purple-800 mb-2">
                Models predict 78% probability of AML compliance risk for Global Bank Ltd within 2-3 weeks. Anomaly
                detection identified unusual KYC rejection patterns at Acme Financial requiring immediate attention.
              </p>
              <div className="flex items-center space-x-4 text-xs text-purple-700">
                <span>Model Accuracy: 91%</span>
                <span>•</span>
                <span>Predictions updated: 15 minutes ago</span>
                <span>•</span>
                <span>Next model training: Tomorrow</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictions">Risk Predictions</TabsTrigger>
          <TabsTrigger value="models">ML Model Performance</TabsTrigger>
          <TabsTrigger value="trends">Compliance Trends</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prediction Chart */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Compliance Score Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    predicted: { label: "Predicted Score", color: "#8b5cf6" },
                    actual: { label: "Actual Score", color: "#3b82f6" },
                    confidence: { label: "Confidence", color: "#10b981" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={riskPredictions}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[75, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
                      <Line type="monotone" dataKey="confidence" stroke="var(--color-confidence)" strokeWidth={1} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Risk Alerts */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Predicted Compliance Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceRisks.map((risk, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{risk.tenant}</span>
                          {getRiskBadge(risk.riskLevel)}
                        </div>
                        <span className="text-xs text-gray-500">{risk.timeframe}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{risk.category}</div>
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="text-xs">
                          <span className="text-gray-500">Current:</span>
                          <span className="ml-1 font-medium">{risk.currentScore}%</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Predicted:</span>
                          <span className="ml-1 font-medium text-red-600">{risk.predictedScore}%</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Probability:</span>
                          <span className="ml-1 font-medium">{risk.probability}%</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        <strong>Factors:</strong> {risk.factors.join(", ")}
                      </div>
                      <div className="text-xs text-blue-600">
                        <strong>Recommendation:</strong> {risk.recommendation}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">ML Confidence: {risk.confidence}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Model Performance */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">ML Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>F1 Score</TableHead>
                      <TableHead>Last Trained</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mlModelPerformance.map((model, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{model.model}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{model.accuracy}%</span>
                            <Progress value={model.accuracy} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{model.f1Score}%</TableCell>
                        <TableCell className="text-sm text-gray-500">{model.lastTrained}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Model Metrics */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Model Accuracy Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    accuracy: { label: "Accuracy", color: "#3b82f6" },
                    precision: { label: "Precision", color: "#10b981" },
                    recall: { label: "Recall", color: "#f59e0b" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mlModelPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="model" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="accuracy" fill="var(--color-accuracy)" />
                      <Bar dataKey="precision" fill="var(--color-precision)" />
                      <Bar dataKey="recall" fill="var(--color-recall)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Compliance Category Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  aml: { label: "AML Monitoring", color: "#3b82f6" },
                  kyc: { label: "KYC Documentation", color: "#10b981" },
                  sanctions: { label: "Sanctions Screening", color: "#f59e0b" },
                  reporting: { label: "Regulatory Reporting", color: "#ef4444" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={complianceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="aml"
                      stackId="1"
                      stroke="var(--color-aml)"
                      fill="var(--color-aml)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="kyc"
                      stackId="1"
                      stroke="var(--color-kyc)"
                      fill="var(--color-kyc)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="sanctions"
                      stackId="1"
                      stroke="var(--color-sanctions)"
                      fill="var(--color-sanctions)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="reporting"
                      stackId="1"
                      stroke="var(--color-reporting)"
                      fill="var(--color-reporting)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Real-time Anomaly Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {anomalyDetection.map((anomaly, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <span className="font-medium">{anomaly.tenant}</span>
                        {getSeverityBadge(anomaly.severity)}
                      </div>
                      <span className="text-sm text-gray-500">{anomaly.detected}</span>
                    </div>
                    <div className="mb-2">
                      <div className="font-medium text-sm mb-1">{anomaly.anomaly}</div>
                      <div className="text-sm text-gray-600 mb-2">{anomaly.impact}</div>
                      <div className="text-sm text-blue-600">
                        <strong>Recommended Action:</strong> {anomaly.action}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">ML Confidence: {anomaly.mlConfidence}%</div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Shield className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm">
                          <Zap className="h-4 w-4 mr-1" />
                          Auto-Remediate
                        </Button>
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
