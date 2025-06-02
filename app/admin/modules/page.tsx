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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Zap,
  Shield,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  GitBranch,
  Cpu,
  Database,
  Network,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Layers,
  Target,
  Workflow,
  Brain,
  Gauge,
  Microscope,
  Rocket,
  Sparkles,
  Atom,
  Radar,
  Fingerprint,
  Lightbulb,
  Beaker,
  Cog,
  MonitorSpeaker,
  Wrench,
  Puzzle,
  Plus,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

const moduleData = [
  {
    id: "kyc-aml",
    name: "KYC/AML Engine",
    status: "active",
    version: "3.2.1",
    health: 98,
    usage: 87,
    dependencies: ["document-verification", "risk-assessment"],
    features: 15,
    activeFeatures: 13,
    organizations: 45,
    icon: Shield,
    color: "#10b981",
  },
  {
    id: "document-verification",
    name: "Document Verification",
    status: "active",
    version: "2.8.3",
    health: 95,
    usage: 92,
    dependencies: ["ocr-engine", "ai-validation"],
    features: 12,
    activeFeatures: 11,
    organizations: 42,
    icon: FileText,
    color: "#3b82f6",
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment AI",
    status: "active",
    version: "4.1.0",
    health: 99,
    usage: 78,
    dependencies: ["ml-engine", "data-analytics"],
    features: 18,
    activeFeatures: 16,
    organizations: 38,
    icon: Brain,
    color: "#f59e0b",
  },
  {
    id: "compliance-monitoring",
    name: "Compliance Monitor",
    status: "maintenance",
    version: "2.5.7",
    health: 85,
    usage: 65,
    dependencies: ["audit-trail", "reporting"],
    features: 10,
    activeFeatures: 8,
    organizations: 35,
    icon: Eye,
    color: "#ef4444",
  },
  {
    id: "reporting-engine",
    name: "Advanced Reporting",
    status: "active",
    version: "3.0.2",
    health: 97,
    usage: 89,
    dependencies: ["data-warehouse", "visualization"],
    features: 22,
    activeFeatures: 20,
    organizations: 48,
    icon: BarChart3,
    color: "#8b5cf6",
  },
]

const dependencyData = [
  { source: "KYC/AML Engine", target: "Document Verification", type: "critical" },
  { source: "KYC/AML Engine", target: "Risk Assessment AI", type: "high" },
  { source: "Document Verification", target: "OCR Engine", type: "critical" },
  { source: "Risk Assessment AI", target: "ML Engine", type: "critical" },
  { source: "Compliance Monitor", target: "Audit Trail", type: "medium" },
  { source: "Advanced Reporting", target: "Data Warehouse", type: "high" },
]

const featureToggleData = [
  {
    id: "ai-enhanced-kyc",
    name: "AI-Enhanced KYC",
    module: "KYC/AML Engine",
    status: "beta",
    rollout: 25,
    organizations: 12,
    performance: "+15% accuracy",
    risk: "low",
  },
  {
    id: "real-time-screening",
    name: "Real-time Screening",
    module: "Risk Assessment AI",
    status: "active",
    rollout: 100,
    organizations: 38,
    performance: "+30% speed",
    risk: "none",
  },
  {
    id: "biometric-verification",
    name: "Biometric Verification",
    module: "Document Verification",
    status: "alpha",
    rollout: 5,
    organizations: 2,
    performance: "+95% accuracy",
    risk: "medium",
  },
  {
    id: "predictive-compliance",
    name: "Predictive Compliance",
    module: "Compliance Monitor",
    status: "development",
    rollout: 0,
    organizations: 0,
    performance: "TBD",
    risk: "high",
  },
]

const performanceData = [
  { time: "00:00", cpu: 45, memory: 62, requests: 1200 },
  { time: "04:00", cpu: 38, memory: 58, requests: 800 },
  { time: "08:00", cpu: 72, memory: 75, requests: 2400 },
  { time: "12:00", cpu: 85, memory: 82, requests: 3200 },
  { time: "16:00", cpu: 78, memory: 79, requests: 2800 },
  { time: "20:00", cpu: 52, memory: 65, requests: 1600 },
]

const usageAnalytics = [
  { name: "KYC/AML", value: 35, color: "#10b981" },
  { name: "Document Verification", value: 28, color: "#3b82f6" },
  { name: "Risk Assessment", value: 22, color: "#f59e0b" },
  { name: "Reporting", value: 15, color: "#8b5cf6" },
]

export default function ModulesPage() {
  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6 space-y-6">
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
              <BreadcrumbPage>Module Configuration</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-slate-800 mb-2">
              <Atom className="inline-block w-8 h-8 mr-3 text-blue-600" />
              Module Configuration Center
            </h1>
            <p className="text-slate-600 font-light">
              Revolutionary module management with AI-powered optimization and intelligent dependency resolution
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Microscope className="w-4 h-4" />
              Run Diagnostics
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
              <Rocket className="w-4 h-4" />
              Deploy Module
            </Button>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">System Health</p>
                  <p className="text-2xl font-bold text-green-600">97.2%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Gauge className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={97.2} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Modules</p>
                  <p className="text-2xl font-bold text-blue-600">4/5</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Layers className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-2 bg-blue-500 rounded flex-1" />
                ))}
                <div className="h-2 bg-slate-200 rounded flex-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Feature Flags</p>
                  <p className="text-2xl font-bold text-purple-600">67</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Active: 45</span>
                  <span>Beta: 15</span>
                  <span>Alpha: 7</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Dependencies</p>
                  <p className="text-2xl font-bold text-orange-600">23</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Network className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Healthy: 21</span>
                  <span>Warning: 2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="modules" className="gap-2">
              <Puzzle className="w-4 h-4" />
              Modules
            </TabsTrigger>
            <TabsTrigger value="dependencies" className="gap-2">
              <GitBranch className="w-4 h-4" />
              Dependencies
            </TabsTrigger>
            <TabsTrigger value="features" className="gap-2">
              <Beaker className="w-4 h-4" />
              Feature Toggles
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <Activity className="w-4 h-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="gap-2">
              <Brain className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Cog className="w-5 h-5" />
                      Core Module Configuration
                    </CardTitle>
                    <CardDescription>
                      Manage and configure enterprise-grade compliance modules with AI-powered optimization
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Wrench className="w-4 h-4" />
                      Bulk Configure
                    </Button>
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Module
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {moduleData.map((module) => {
                    const IconComponent = module.icon
                    return (
                      <Card key={module.id} className="border-l-4" style={{ borderLeftColor: module.color }}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-full" style={{ backgroundColor: `${module.color}20` }}>
                                <IconComponent className="w-6 h-6" style={{ color: module.color }} />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-slate-800">{module.name}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                  <Badge
                                    variant={
                                      module.status === "active"
                                        ? "default"
                                        : module.status === "maintenance"
                                          ? "destructive"
                                          : "secondary"
                                    }
                                  >
                                    {module.status}
                                  </Badge>
                                  <span className="text-sm text-slate-500">v{module.version}</span>
                                  <span className="text-sm text-slate-500">{module.organizations} organizations</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium text-slate-600">Health Score</p>
                                <p className="text-xl font-bold" style={{ color: module.color }}>
                                  {module.health}%
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Settings className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <RotateCcw className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                              <Label className="text-sm font-medium text-slate-600">Usage Rate</Label>
                              <div className="mt-2">
                                <Progress value={module.usage} className="h-2" />
                                <p className="text-sm text-slate-500 mt-1">{module.usage}% utilization</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-slate-600">Features</Label>
                              <div className="mt-2">
                                <p className="text-lg font-semibold text-slate-800">
                                  {module.activeFeatures}/{module.features}
                                </p>
                                <p className="text-sm text-slate-500">Active features</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-slate-600">Dependencies</Label>
                              <div className="mt-2">
                                <p className="text-lg font-semibold text-slate-800">{module.dependencies.length}</p>
                                <p className="text-sm text-slate-500">Connected modules</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-slate-600">Auto-scaling</Label>
                              <div className="mt-2 flex items-center gap-2">
                                <Switch defaultChecked />
                                <span className="text-sm text-slate-500">Enabled</span>
                              </div>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-slate-600">Last updated: 2 hours ago</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-600">CPU: 45%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-600">Memory: 62%</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Lightbulb className="w-4 h-4" />
                              AI Recommendations
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dependencies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Intelligent Dependency Management
                </CardTitle>
                <CardDescription>
                  AI-powered dependency mapping with automated conflict resolution and version compatibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-lg">Dependency Graph</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                        <div className="text-center">
                          <Radar className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-500">Interactive dependency visualization</p>
                          <p className="text-sm text-slate-400">Real-time module relationships</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Version Compatibility Matrix</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {dependencyData.map((dep, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  dep.type === "critical"
                                    ? "bg-red-500"
                                    : dep.type === "high"
                                      ? "bg-orange-500"
                                      : "bg-green-500"
                                }`}
                              ></div>
                              <div>
                                <p className="font-medium text-slate-800">{dep.source}</p>
                                <p className="text-sm text-slate-500">→ {dep.target}</p>
                              </div>
                            </div>
                            <Badge variant={dep.type === "critical" ? "destructive" : "secondary"}>{dep.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div>
                          <p className="font-semibold text-slate-800">21</p>
                          <p className="text-sm text-slate-600">Healthy Dependencies</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-orange-500" />
                        <div>
                          <p className="font-semibold text-slate-800">2</p>
                          <p className="text-sm text-slate-600">Version Conflicts</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Workflow className="w-8 h-8 text-blue-500" />
                        <div>
                          <p className="font-semibold text-slate-800">5</p>
                          <p className="text-sm text-slate-600">Auto-resolved</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Beaker className="w-5 h-5" />
                      Advanced Feature Toggle Management
                    </CardTitle>
                    <CardDescription>
                      Intelligent feature rollouts with A/B testing, canary deployments, and risk assessment
                    </CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Target className="w-4 h-4" />
                    Create Feature Flag
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {featureToggleData.map((feature) => (
                    <Card key={feature.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                              <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-slate-800">{feature.name}</h3>
                              <div className="flex items-center gap-4 mt-1">
                                <Badge
                                  variant={
                                    feature.status === "active"
                                      ? "default"
                                      : feature.status === "beta"
                                        ? "secondary"
                                        : feature.status === "alpha"
                                          ? "outline"
                                          : "destructive"
                                  }
                                >
                                  {feature.status}
                                </Badge>
                                <span className="text-sm text-slate-500">{feature.module}</span>
                                <span className="text-sm text-slate-500">{feature.organizations} orgs</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium text-slate-600">Rollout Progress</p>
                              <p className="text-xl font-bold text-blue-600">{feature.rollout}%</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Play className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Pause className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div>
                            <Label className="text-sm font-medium text-slate-600">Rollout Progress</Label>
                            <div className="mt-2">
                              <Progress value={feature.rollout} className="h-2" />
                              <p className="text-sm text-slate-500 mt-1">{feature.rollout}% complete</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-600">Performance Impact</Label>
                            <div className="mt-2">
                              <p className="text-lg font-semibold text-green-600">{feature.performance}</p>
                              <p className="text-sm text-slate-500">vs baseline</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-600">Risk Level</Label>
                            <div className="mt-2">
                              <Badge
                                variant={
                                  feature.risk === "low"
                                    ? "default"
                                    : feature.risk === "medium"
                                      ? "secondary"
                                      : feature.risk === "high"
                                        ? "destructive"
                                        : "outline"
                                }
                              >
                                {feature.risk}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-600">A/B Testing</Label>
                            <div className="mt-2 flex items-center gap-2">
                              <Switch defaultChecked={feature.status === "beta"} />
                              <span className="text-sm text-slate-500">
                                {feature.status === "beta" ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">Started: 3 days ago</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">Users: 1,247</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">Success rate: 98.5%</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Microscope className="w-4 h-4" />
                              View Analytics
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Brain className="w-4 h-4" />
                              AI Insights
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Real-time Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MonitorSpeaker className="w-5 h-5" />
                    Request Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="requests" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Lightbulb className="w-6 h-6 text-green-500" />
                        <div>
                          <p className="font-semibold text-slate-800">Cache Optimization</p>
                          <p className="text-sm text-slate-600">Potential 15% performance gain</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Cpu className="w-6 h-6 text-blue-500" />
                        <div>
                          <p className="font-semibold text-slate-800">Auto-scaling</p>
                          <p className="text-sm text-slate-600">Reduce costs by 20%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Database className="w-6 h-6 text-purple-500" />
                        <div>
                          <p className="font-semibold text-slate-800">Query Optimization</p>
                          <p className="text-sm text-slate-600">Improve response time 30%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Module Usage Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageAnalytics}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {usageAnalytics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">KYC/AML Usage</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">+23%</p>
                        <p className="text-sm text-slate-500">vs last month</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">Document Verification</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">+18%</p>
                        <p className="text-sm text-slate-500">vs last month</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="font-medium">Risk Assessment</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-purple-600">+31%</p>
                        <p className="text-sm text-slate-500">vs last month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI-Powered Module Insights & Recommendations
                </CardTitle>
                <CardDescription>
                  Machine learning-driven optimization suggestions and predictive analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-green-500" />
                        Optimization Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">High Impact</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Enable caching for Document Verification module to reduce processing time by 35%
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Medium Impact</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Implement load balancing for Risk Assessment AI to handle peak loads more efficiently
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-orange-800">Low Impact</span>
                        </div>
                        <p className="text-sm text-orange-700">
                          Update KYC/AML module dependencies to latest versions for security patches
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Radar className="w-5 h-5 text-purple-500" />
                        Predictive Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-purple-800">Usage Forecast</span>
                        </div>
                        <p className="text-sm text-purple-700">
                          KYC/AML module usage expected to increase by 45% in next quarter
                        </p>
                      </div>

                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <span className="font-medium text-red-800">Risk Alert</span>
                        </div>
                        <p className="text-sm text-red-700">
                          Compliance Monitor module showing signs of performance degradation
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Sparkles className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Opportunity</span>
                        </div>
                        <p className="text-sm text-green-700">
                          New AI features could improve accuracy by 25% with minimal resource impact
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="my-6" />

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Fingerprint className="w-5 h-5" />
                      Intelligent Module Health Scoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {moduleData.map((module) => (
                        <Card key={module.id} className="text-center">
                          <CardContent className="p-4">
                            <div
                              className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${module.color}20` }}
                            >
                              <module.icon className="w-8 h-8" style={{ color: module.color }} />
                            </div>
                            <h4 className="font-medium text-slate-800 mb-1">{module.name}</h4>
                            <div className="text-2xl font-bold mb-1" style={{ color: module.color }}>
                              {module.health}
                            </div>
                            <p className="text-xs text-slate-500">Health Score</p>
                            <Progress value={module.health} className="h-1 mt-2" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
