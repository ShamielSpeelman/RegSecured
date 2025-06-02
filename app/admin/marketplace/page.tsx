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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Star,
  Download,
  Settings,
  Activity,
  Shield,
  Zap,
  Database,
  CreditCard,
  FileText,
  Users,
  BarChart3,
  AlertTriangle,
  Clock,
  TrendingUp,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Code,
  Monitor,
  Brain,
  Sparkles,
  Target,
  Gauge,
} from "lucide-react"

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("catalog")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data for integrations
  const integrations = [
    {
      id: 1,
      name: "Dow Jones Risk & Compliance",
      category: "Data Provider",
      description: "Global risk intelligence and compliance screening",
      rating: 4.8,
      reviews: 156,
      price: "$2,500/month",
      status: "active",
      health: 98,
      requests: "2.3M",
      latency: "120ms",
      uptime: "99.9%",
      icon: Database,
      features: ["Real-time screening", "Global coverage", "API access", "Compliance reports"],
      compliance: ["SOX", "GDPR", "AML", "KYC"],
    },
    {
      id: 2,
      name: "LexisNexis ThreatMetrix",
      category: "Identity Verification",
      description: "Digital identity intelligence and fraud prevention",
      rating: 4.7,
      reviews: 203,
      price: "$1,800/month",
      status: "active",
      health: 95,
      requests: "1.8M",
      latency: "95ms",
      uptime: "99.8%",
      icon: Shield,
      features: ["Device fingerprinting", "Behavioral analytics", "Risk scoring", "Global intelligence"],
      compliance: ["PCI DSS", "GDPR", "CCPA"],
    },
    {
      id: 3,
      name: "Jumio Identity Verification",
      category: "Document Verification",
      description: "AI-powered identity verification and document authentication",
      rating: 4.6,
      reviews: 89,
      price: "$0.50/verification",
      status: "active",
      health: 97,
      requests: "850K",
      latency: "200ms",
      uptime: "99.7%",
      icon: FileText,
      features: ["Document scanning", "Biometric matching", "Liveness detection", "Global documents"],
      compliance: ["GDPR", "CCPA", "KYC"],
    },
    {
      id: 4,
      name: "Stripe Connect",
      category: "Payment Processing",
      description: "Complete payment infrastructure for compliance platforms",
      rating: 4.9,
      reviews: 1247,
      price: "2.9% + 30¢",
      status: "active",
      health: 99,
      requests: "5.2M",
      latency: "85ms",
      uptime: "99.99%",
      icon: CreditCard,
      features: ["Global payments", "Compliance tools", "Fraud protection", "Reporting"],
      compliance: ["PCI DSS", "SOX", "GDPR"],
    },
    {
      id: 5,
      name: "Salesforce CRM",
      category: "CRM Integration",
      description: "Customer relationship management and compliance tracking",
      rating: 4.5,
      reviews: 567,
      price: "$150/user/month",
      status: "pending",
      health: 0,
      requests: "0",
      latency: "N/A",
      uptime: "N/A",
      icon: Users,
      features: ["Customer management", "Compliance tracking", "Workflow automation", "Reporting"],
      compliance: ["GDPR", "CCPA", "SOX"],
    },
  ]

  const customIntegrations = [
    {
      id: 1,
      name: "Internal Risk API",
      endpoint: "/api/v1/risk-assessment",
      method: "POST",
      status: "active",
      requests: "45K",
      latency: "45ms",
      errorRate: "0.1%",
      lastDeployed: "2024-01-15",
    },
    {
      id: 2,
      name: "Compliance Webhook",
      endpoint: "/webhooks/compliance-update",
      method: "POST",
      status: "active",
      requests: "12K",
      latency: "32ms",
      errorRate: "0.05%",
      lastDeployed: "2024-01-10",
    },
    {
      id: 3,
      name: "Document Processing API",
      endpoint: "/api/v1/documents/process",
      method: "POST",
      status: "maintenance",
      requests: "0",
      latency: "N/A",
      errorRate: "N/A",
      lastDeployed: "2024-01-08",
    },
  ]

  const categories = [
    { id: "all", name: "All Categories", count: 156 },
    { id: "data-provider", name: "Data Providers", count: 23 },
    { id: "identity", name: "Identity Verification", count: 18 },
    { id: "document", name: "Document Verification", count: 15 },
    { id: "payment", name: "Payment Processing", count: 12 },
    { id: "crm", name: "CRM Systems", count: 8 },
    { id: "compliance", name: "Compliance Tools", count: 25 },
    { id: "analytics", name: "Analytics", count: 19 },
  ]

  const aiRecommendations = [
    {
      title: "Optimize Rate Limits",
      description: "Dow Jones API could handle 20% more requests based on usage patterns",
      impact: "High",
      savings: "$500/month",
    },
    {
      title: "Upgrade LexisNexis Plan",
      description: "Current usage suggests premium plan would be more cost-effective",
      impact: "Medium",
      savings: "$300/month",
    },
    {
      title: "Enable Caching",
      description: "Document verification responses could be cached for 15% performance gain",
      impact: "Medium",
      savings: "15% latency reduction",
    },
  ]

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || integration.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6">
        <Breadcrumb className="mb-6">
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
              <BreadcrumbPage>Integration Marketplace</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Integration Marketplace</h1>
          <p className="text-slate-600 font-light">
            Discover, deploy, and manage integrations for your compliance platform
          </p>
        </div>

        {/* AI-Powered Insights Banner */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">AI-Powered Optimization Insights</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">{rec.title}</h4>
                    <Badge variant={rec.impact === "High" ? "destructive" : "secondary"}>{rec.impact}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{rec.description}</p>
                  <p className="text-sm font-medium text-green-600">{rec.savings}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="catalog">Integration Catalog</TabsTrigger>
            <TabsTrigger value="active">Active Integrations</TabsTrigger>
            <TabsTrigger value="custom">Custom APIs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Request Integration
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-xs"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Integration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => {
                const IconComponent = integration.icon
                return (
                  <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-lg">
                            <IconComponent className="h-6 w-6 text-slate-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {integration.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{integration.rating}</span>
                          <span className="text-xs text-slate-500">({integration.reviews})</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-600">{integration.description}</p>

                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {integration.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{integration.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Compliance */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Compliance</h4>
                        <div className="flex flex-wrap gap-1">
                          {integration.compliance.map((comp, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-green-50 text-green-700 border-green-200"
                            >
                              <Shield className="h-3 w-3 mr-1" />
                              {comp}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      {integration.status === "active" && (
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                          <div>
                            <p className="text-xs text-slate-500">Health Score</p>
                            <div className="flex items-center gap-2">
                              <Progress value={integration.health} className="flex-1 h-2" />
                              <span className="text-sm font-medium">{integration.health}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Uptime</p>
                            <p className="text-sm font-medium">{integration.uptime}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-lg font-semibold text-slate-800">{integration.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button size="sm" disabled={integration.status === "pending"}>
                            {integration.status === "active" ? (
                              <>
                                <Settings className="h-4 w-4 mr-1" />
                                Configure
                              </>
                            ) : integration.status === "pending" ? (
                              <>
                                <Clock className="h-4 w-4 mr-1" />
                                Pending
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-1" />
                                Install
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Active Integrations</p>
                      <p className="text-2xl font-bold text-slate-800">24</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">+3 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Requests</p>
                      <p className="text-2xl font-bold text-slate-800">12.4M</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">+15% vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Avg Latency</p>
                      <p className="text-2xl font-bold text-slate-800">127ms</p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="text-xs text-red-600 mt-2">+5ms vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Error Rate</p>
                      <p className="text-2xl font-bold text-slate-800">0.12%</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">-0.03% vs last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Integrations List */}
            <Card>
              <CardHeader>
                <CardTitle>Active Integrations</CardTitle>
                <CardDescription>Monitor and manage your active integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations
                    .filter((i) => i.status === "active")
                    .map((integration) => {
                      const IconComponent = integration.icon
                      return (
                        <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-100 rounded-lg">
                              <IconComponent className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{integration.name}</h4>
                              <p className="text-sm text-slate-600">{integration.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-sm font-medium">{integration.requests}</p>
                              <p className="text-xs text-slate-500">Requests</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{integration.latency}</p>
                              <p className="text-xs text-slate-500">Latency</p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium">{integration.health}%</span>
                              </div>
                              <p className="text-xs text-slate-500">Health</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Monitor className="h-4 w-4 mr-1" />
                                Monitor
                              </Button>
                              <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4 mr-1" />
                                Configure
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Custom API Endpoints</h3>
                <p className="text-sm text-slate-600">Manage your custom integration endpoints</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Endpoint
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Custom Endpoints</p>
                      <p className="text-2xl font-bold text-slate-800">{customIntegrations.length}</p>
                    </div>
                    <Code className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Requests</p>
                      <p className="text-2xl font-bold text-slate-800">57K</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Avg Response Time</p>
                      <p className="text-2xl font-bold text-slate-800">38ms</p>
                    </div>
                    <Gauge className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>Monitor and manage your custom API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customIntegrations.map((api) => (
                    <div key={api.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={api.method === "POST" ? "default" : "secondary"}>{api.method}</Badge>
                          <code className="text-sm bg-slate-100 px-2 py-1 rounded">{api.endpoint}</code>
                        </div>
                        <div>
                          <h4 className="font-medium">{api.name}</h4>
                          <p className="text-sm text-slate-600">Last deployed: {api.lastDeployed}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">{api.requests}</p>
                          <p className="text-xs text-slate-500">Requests</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{api.latency}</p>
                          <p className="text-xs text-slate-500">Latency</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{api.errorRate}</p>
                          <p className="text-xs text-slate-500">Error Rate</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              api.status === "active"
                                ? "bg-green-500"
                                : api.status === "maintenance"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          ></div>
                          <span className="text-sm capitalize">{api.status}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Monitor className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Monthly Cost</p>
                      <p className="text-2xl font-bold text-slate-800">$8,450</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-red-600 mt-2">+12% vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Cost per Request</p>
                      <p className="text-2xl font-bold text-slate-800">$0.0068</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">-3% vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">ROI</p>
                      <p className="text-2xl font-bold text-slate-800">340%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">+25% vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Efficiency Score</p>
                      <p className="text-2xl font-bold text-slate-800">87%</p>
                    </div>
                    <Gauge className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">+5% vs last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Performance</CardTitle>
                  <CardDescription>Response time and reliability metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrations
                      .filter((i) => i.status === "active")
                      .map((integration) => (
                        <div key={integration.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="font-medium">{integration.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-600">{integration.latency}</span>
                            <Progress value={integration.health} className="w-20 h-2" />
                            <span className="text-sm font-medium">{integration.health}%</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                  <CardDescription>Monthly integration costs by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Data Providers</span>
                      <span className="text-lg font-bold">$4,300</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Identity Verification</span>
                      <span className="text-lg font-bold">$1,800</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Document Processing</span>
                      <span className="text-lg font-bold">$1,250</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Payment Processing</span>
                      <span className="text-lg font-bold">$850</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Other</span>
                      <span className="text-lg font-bold">$250</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Global Settings</CardTitle>
                  <CardDescription>Configure global integration settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-retry">Auto-retry Failed Requests</Label>
                      <p className="text-sm text-slate-600">Automatically retry failed API requests</p>
                    </div>
                    <Switch id="auto-retry" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="health-monitoring">Health Monitoring</Label>
                      <p className="text-sm text-slate-600">Monitor integration health and performance</p>
                    </div>
                    <Switch id="health-monitoring" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="cost-alerts">Cost Alerts</Label>
                      <p className="text-sm text-slate-600">Receive alerts when costs exceed thresholds</p>
                    </div>
                    <Switch id="cost-alerts" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retry-attempts">Max Retry Attempts</Label>
                    <Input id="retry-attempts" type="number" defaultValue="3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                    <Input id="timeout" type="number" defaultValue="30" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security and compliance settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="encryption">End-to-End Encryption</Label>
                      <p className="text-sm text-slate-600">Encrypt all API communications</p>
                    </div>
                    <Switch id="encryption" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audit-logging">Audit Logging</Label>
                      <p className="text-sm text-slate-600">Log all integration activities</p>
                    </div>
                    <Switch id="audit-logging" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ip-whitelist">IP Whitelisting</Label>
                      <p className="text-sm text-slate-600">Restrict access to whitelisted IPs</p>
                    </div>
                    <Switch id="ip-whitelist" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key-rotation">API Key Rotation (days)</Label>
                    <Input id="api-key-rotation" type="number" defaultValue="90" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Global Rate Limit (requests/minute)</Label>
                    <Input id="rate-limit" type="number" defaultValue="1000" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Email Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="integration-down">Integration Down</Label>
                        <Switch id="integration-down" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="high-error-rate">High Error Rate</Label>
                        <Switch id="high-error-rate" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="cost-threshold">Cost Threshold Exceeded</Label>
                        <Switch id="cost-threshold" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-integration">New Integration Available</Label>
                        <Switch id="new-integration" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Slack Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="slack-critical">Critical Alerts</Label>
                        <Switch id="slack-critical" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="slack-performance">Performance Issues</Label>
                        <Switch id="slack-performance" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="slack-deployments">Deployment Updates</Label>
                        <Switch id="slack-deployments" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="slack-weekly">Weekly Reports</Label>
                        <Switch id="slack-weekly" defaultChecked />
                      </div>
                    </div>
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
