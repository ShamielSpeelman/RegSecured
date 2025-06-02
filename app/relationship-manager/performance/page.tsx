import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PerformanceMetrics } from "@/components/relationship-manager/reports/performance-metrics"
import { OnboardingEfficiencyCharts } from "@/components/relationship-manager/reports/onboarding-efficiency-charts"
import { PerformanceComparison } from "@/components/relationship-manager/reports/performance-comparison"
import { PerformanceTrends } from "@/components/relationship-manager/reports/performance-trends"
import { PerformanceGoals } from "@/components/relationship-manager/reports/performance-goals"

export default function PerformancePage() {
  return (
    <DashboardLayout userRole="relationship-manager">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/relationship-manager">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Reports</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Onboarding Metrics</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Onboarding Metrics</h1>
          <p className="text-slate-600 font-light">
            Track your onboarding performance, efficiency metrics, and goal achievement across all client engagements.
          </p>
        </div>

        <div className="space-y-6">
          <PerformanceMetrics />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OnboardingEfficiencyCharts />
            <PerformanceComparison />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PerformanceTrends />
            </div>
            <PerformanceGoals />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
