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
import { CrossTenantBenchmarking } from "@/components/admin/cross-tenant-benchmarking"
import { PredictiveComplianceAnalytics } from "@/components/admin/predictive-compliance-analytics"
import { RevenueOptimizationInsights } from "@/components/admin/revenue-optimization-insights"
import { UserBehaviorAnalytics } from "@/components/admin/user-behavior-analytics"
import { RegulatoryChangeImpactAssessment } from "@/components/admin/regulatory-change-impact-assessment"

export default function AnalyticsPage() {
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
              <BreadcrumbLink href="#">Analytics & Insights</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Advanced Analytics & BI</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Advanced Analytics & Business Intelligence</h1>
          <p className="text-slate-600 font-light">
            AI-powered insights and predictive analytics for strategic decision making
          </p>
        </div>

        <Tabs defaultValue="benchmarking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="benchmarking">Performance Benchmarking</TabsTrigger>
            <TabsTrigger value="compliance">Predictive Compliance</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Optimization</TabsTrigger>
            <TabsTrigger value="behavior">User Behavior</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="benchmarking">
            <CrossTenantBenchmarking />
          </TabsContent>

          <TabsContent value="compliance">
            <PredictiveComplianceAnalytics />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueOptimizationInsights />
          </TabsContent>

          <TabsContent value="behavior">
            <UserBehaviorAnalytics />
          </TabsContent>

          <TabsContent value="regulatory">
            <RegulatoryChangeImpactAssessment />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
