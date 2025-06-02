"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SystemHealthDashboard } from "@/components/admin/system-health-dashboard"
import { PerformanceOptimizer } from "@/components/admin/performance-optimizer"
import { AutoScalingManager } from "@/components/admin/auto-scaling-manager"
import { IntegrationHealthMonitor } from "@/components/admin/integration-health-monitor"
import { ComplianceDriftDetector } from "@/components/admin/compliance-drift-detector"

export default function MonitoringPage() {
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
              <BreadcrumbLink href="#">System Administration</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Platform Monitoring</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Intelligent Platform Monitoring</h1>
          <p className="text-slate-600 font-light">
            AI-powered monitoring with predictive analytics and automated optimization
          </p>
        </div>

        <Tabs defaultValue="health" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="health">System Health</TabsTrigger>
            <TabsTrigger value="performance">Performance AI</TabsTrigger>
            <TabsTrigger value="scaling">Auto Scaling</TabsTrigger>
            <TabsTrigger value="integrations">Integration Health</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Drift</TabsTrigger>
          </TabsList>

          <TabsContent value="health">
            <SystemHealthDashboard />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceOptimizer />
          </TabsContent>

          <TabsContent value="scaling">
            <AutoScalingManager />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationHealthMonitor />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceDriftDetector />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
