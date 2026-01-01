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
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Atom,
  Microscope,
  Rocket,
  Gauge,
  Layers,
  Sparkles,
  Network,
  Puzzle,
  GitBranch,
  Beaker,
  Activity,
  TrendingUp,
  Brain,
  Cog,
  Wrench,
  Plus,
} from "lucide-react"
import { ModuleCard } from "@/components/admin/modules/module-card"
import { PerformanceChart } from "@/components/admin/modules/performance-chart"
import { moduleData, performanceData } from "@/lib/data/modules-data"

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
            <Button variant="outline" className="gap-2 bg-transparent">
              <Microscope className="w-4 h-4" />
              Run Diagnostics
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
              <Rocket className="w-4 h-4" />
              Deploy Module
            </Button>
          </div>
        </div>

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
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
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
                  {moduleData.map((module) => (
                    <ModuleCard key={module.id} module={module} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceChart data={performanceData} />
          </TabsContent>

          <TabsContent value="dependencies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dependency Management</CardTitle>
                <CardDescription>View and manage module dependencies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500">Dependency visualization coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Toggles</CardTitle>
                <CardDescription>Manage feature flags and rollouts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500">Feature toggle management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>Module usage and adoption metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>AI-powered optimization recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500">AI insights coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
