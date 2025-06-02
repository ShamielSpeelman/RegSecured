"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Settings,
  Users,
  AlertTriangle,
  TrendingUp,
  Activity,
  Target,
  Zap,
  Shield,
  Brain,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
} from "lucide-react"

// Real-world compliance features data
const complianceFeatures = [
  {
    id: "enhanced-kyc",
    name: "Enhanced KYC Verification",
    description: "Advanced identity verification with biometric matching and liveness detection",
    category: "KYC/Identity",
    status: "active",
    adoption: 87,
    performance: 23,
    organizations: 156,
    rolloutStrategy: "percentage",
    rolloutProgress: 87,
    businessImpact: "high",
    riskLevel: "low",
    lastUpdated: "2024-01-15T10:30:00Z",
    enabled: true,
  },
  {
    id: "advanced-aml",
    name: "Advanced AML Screening",
    description: "Real-time sanctions and PEP screening with AI-powered risk assessment",
    category: "AML/Sanctions",
    status: "active",
    adoption: 92,
    performance: 45,
    organizations: 178,
    rolloutStrategy: "canary",
    rolloutProgress: 92,
    businessImpact: "high",
    riskLevel: "medium",
    lastUpdated: "2024-01-14T15:45:00Z",
    enabled: true,
  },
  {
    id: "realtime-sanctions",
    name: "Real-time Sanctions Checking",
    description: "Live OFAC and global sanctions list monitoring with instant alerts",
    category: "Sanctions",
    status: "active",
    adoption: 78,
    performance: 67,
    organizations: 134,
    rolloutStrategy: "geographic",
    rolloutProgress: 78,
    businessImpact: "critical",
    riskLevel: "low",
    lastUpdated: "2024-01-13T09:20:00Z",
    enabled: true,
  },
  {
    id: "automated-risk-scoring",
    name: "Automated Risk Scoring",
    description: "ML-powered risk assessment algorithms with dynamic scoring models",
    category: "Risk Assessment",
    status: "beta",
    adoption: 65,
    performance: 34,
    organizations: 89,
    rolloutStrategy: "risk-based",
    rolloutProgress: 65,
    businessImpact: "high",
    riskLevel: "medium",
    lastUpdated: "2024-01-12T14:10:00Z",
    enabled: true,
  },
  {
    id: "document-ocr-enhancement",
    name: "Document OCR Enhancement",
    description: "AI-powered document extraction and verification with fraud detection",
    category: "Document Processing",
    status: "active",
    adoption: 89,
    performance: 56,
    organizations: 167,
    rolloutStrategy: "percentage",
    rolloutProgress: 89,
    businessImpact: "medium",
    riskLevel: "low",
    lastUpdated: "2024-01-11T11:30:00Z",
    enabled: true,
  },
  {
    id: "behavioral-analytics",
    name: "Behavioral Analytics",
    description: "Advanced user behavior pattern recognition and anomaly detection",
    category: "Analytics",
    status: "beta",
    adoption: 43,
    performance: 28,
    organizations: 67,
    rolloutStrategy: "canary",
    rolloutProgress: 43,
    businessImpact: "medium",
    riskLevel: "high",
    lastUpdated: "2024-01-10T16:45:00Z",
    enabled: false,
  },
]

// Analytics data
const adoptionData = [
  { month: "Jan", enhanced_kyc: 45, advanced_aml: 52, realtime_sanctions: 38, automated_risk: 25 },
  { month: "Feb", enhanced_kyc: 58, advanced_aml: 67, realtime_sanctions: 48, automated_risk: 35 },
  { month: "Mar", enhanced_kyc: 72, advanced_aml: 78, realtime_sanctions: 62, automated_risk: 45 },
  { month: "Apr", enhanced_kyc: 81, advanced_aml: 85, realtime_sanctions: 71, automated_risk: 58 },
  { month: "May", enhanced_kyc: 87, advanced_aml: 92, realtime_sanctions: 78, automated_risk: 65 },
]

const performanceData = [
  { feature: "Enhanced KYC", before: 100, after: 123, improvement: 23 },
  { feature: "Advanced AML", before: 100, after: 145, improvement: 45 },
  { feature: "Sanctions Check", before: 100, after: 167, improvement: 67 },
  { feature: "Risk Scoring", before: 100, after: 134, improvement: 34 },
  { feature: "Document OCR", before: 100, after: 156, improvement: 56 },
]

const rolloutStrategies = [
  { name: "Canary", value: 25, color: "#8884d8" },
  { name: "Percentage", value: 35, color: "#82ca9d" },
  { name: "Geographic", value: 20, color: "#ffc658" },
  { name: "Risk-based", value: 20, color: "#ff7300" },
]

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState(complianceFeatures[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredFeatures = complianceFeatures.filter((feature) => {
    const matchesSearch =
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || feature.category === filterCategory
    const matchesStatus = filterStatus === "all" || feature.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "beta":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "disabled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getRiskBadge = (risk: string) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
      critical: "bg-purple-100 text-purple-800",
    }
    return <Badge className={colors[risk as keyof typeof colors]}>{risk}</Badge>
  }

  const getImpactBadge = (impact: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-green-100 text-green-800",
      critical: "bg-purple-100 text-purple-800",
    }
    return <Badge className={colors[impact as keyof typeof colors]}>{impact}</Badge>
  }

  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/superadmin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Platform Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Feature Toggles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-light text-slate-800 mb-2">Feature Toggle Management</h1>
            <p className="text-slate-600 font-light">
              AI-powered feature deployment with real-time analytics and intelligent rollout strategies
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Brain className="h-4 w-4" />
              AI Insights
            </Button>
            <Button className="gap-2">
              <Zap className="h-4 w-4" />
              Deploy Feature
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Features</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Adoption</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76%</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance Gain</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+42%</div>
              <p className="text-xs text-muted-foreground">Average improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organizations</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">189</div>
              <p className="text-xs text-muted-foreground">Using features</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="features" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features" className="gap-2">
              <Settings className="h-4 w-4" />
              Feature Management
            </TabsTrigger>
            <TabsTrigger value="rollouts" className="gap-2">
              <Target className="h-4 w-4" />
              Rollout Strategies
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <Brain className="h-4 w-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feature Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="search">Search Features</Label>
                    <Input
                      id="search"
                      placeholder="Search by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="KYC/Identity">KYC/Identity</SelectItem>
                        <SelectItem value="AML/Sanctions">AML/Sanctions</SelectItem>
                        <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
                        <SelectItem value="Document Processing">Document Processing</SelectItem>
                        <SelectItem value="Analytics">Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="beta">Beta</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Features</CardTitle>
                  <CardDescription>Real-world compliance features with intelligent deployment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedFeature.id === feature.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedFeature(feature)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(feature.status)}
                          <h3 className="font-medium">{feature.name}</h3>
                        </div>
                        <Switch checked={feature.enabled} />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="outline">{feature.category}</Badge>
                          {getRiskBadge(feature.riskLevel)}
                          {getImpactBadge(feature.businessImpact)}
                        </div>
                        <div className="text-sm text-gray-500">{feature.adoption}% adoption</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Feature Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Feature Details</CardTitle>
                  <CardDescription>{selectedFeature.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-gray-600">{selectedFeature.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Adoption Rate</h4>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedFeature.adoption} className="flex-1" />
                        <span className="text-sm font-medium">{selectedFeature.adoption}%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Performance Impact</h4>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedFeature.performance} className="flex-1" />
                        <span className="text-sm font-medium">+{selectedFeature.performance}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Organizations</h4>
                      <p className="text-2xl font-bold">{selectedFeature.organizations}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Rollout Strategy</h4>
                      <Badge variant="outline">{selectedFeature.rolloutStrategy}</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Rollout Progress</h4>
                    <div className="flex items-center gap-2">
                      <Progress value={selectedFeature.rolloutProgress} className="flex-1" />
                      <span className="text-sm font-medium">{selectedFeature.rolloutProgress}%</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <Play className="h-3 w-3" />
                      Deploy
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Pause className="h-3 w-3" />
                      Pause
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <RotateCcw className="h-3 w-3" />
                      Rollback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rollouts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rollout Strategies</CardTitle>
                  <CardDescription>Distribution of deployment strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={rolloutStrategies}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {rolloutStrategies.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Rollouts</CardTitle>
                  <CardDescription>Currently deploying features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {complianceFeatures
                    .filter((f) => f.rolloutProgress < 100)
                    .map((feature) => (
                      <div key={feature.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{feature.name}</span>
                          <Badge variant="outline">{feature.rolloutStrategy}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={feature.rolloutProgress} className="flex-1" />
                          <span className="text-sm">{feature.rolloutProgress}%</span>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rollout Configuration</CardTitle>
                <CardDescription>Configure deployment strategies for new features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="strategy">Rollout Strategy</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canary">Canary Deployment</SelectItem>
                        <SelectItem value="percentage">Percentage-based</SelectItem>
                        <SelectItem value="geographic">Geographic</SelectItem>
                        <SelectItem value="risk-based">Risk-based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="percentage">Initial Percentage</Label>
                    <Input id="percentage" type="number" placeholder="5" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Rollout Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="6h">6 Hours</SelectItem>
                        <SelectItem value="1d">1 Day</SelectItem>
                        <SelectItem value="3d">3 Days</SelectItem>
                        <SelectItem value="1w">1 Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Configure Rollout</Button>
                  <Button variant="outline">Save Template</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Feature Adoption Trends</CardTitle>
                  <CardDescription>Monthly adoption rates for key features</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={adoptionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="enhanced_kyc" stroke="#8884d8" name="Enhanced KYC" />
                      <Line type="monotone" dataKey="advanced_aml" stroke="#82ca9d" name="Advanced AML" />
                      <Line type="monotone" dataKey="realtime_sanctions" stroke="#ffc658" name="Sanctions Check" />
                      <Line type="monotone" dataKey="automated_risk" stroke="#ff7300" name="Risk Scoring" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Impact</CardTitle>
                  <CardDescription>Before vs after feature deployment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="feature" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="before" fill="#e5e7eb" name="Before" />
                      <Bar dataKey="after" fill="#3b82f6" name="After" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feature Usage Analytics</CardTitle>
                <CardDescription>Detailed usage metrics and engagement data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.4M</div>
                    <div className="text-sm text-gray-600">Total API Calls</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.7%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">145ms</div>
                    <div className="text-sm text-gray-600">Avg Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">$47K</div>
                    <div className="text-sm text-gray-600">Cost Savings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>Machine learning recommendations for feature optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Optimization Opportunity</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Enhanced KYC feature shows 23% performance improvement. Consider expanding rollout to remaining
                      13% of organizations.
                    </p>
                  </div>

                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Usage Pattern</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Behavioral Analytics feature adoption is slower than expected. Consider targeted training or
                      simplified onboarding.
                    </p>
                  </div>

                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Risk Alert</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Automated Risk Scoring feature has medium risk level. Monitor closely during rollout and prepare
                      rollback procedures.
                    </p>
                  </div>

                  <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800">Compliance Insight</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Real-time Sanctions Checking provides critical compliance value. Consider making this feature
                      mandatory for all organizations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Predictive Analytics</CardTitle>
                <CardDescription>AI forecasts for feature performance and adoption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Enhanced KYC Verification</span>
                      <p className="text-sm text-gray-600">Predicted to reach 95% adoption by Q2 2024</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">High Confidence</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Behavioral Analytics</span>
                      <p className="text-sm text-gray-600">Adoption may plateau at 60% without intervention</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium Confidence</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Document OCR Enhancement</span>
                      <p className="text-sm text-gray-600">Expected 15% additional performance gain with next update</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">High Confidence</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
