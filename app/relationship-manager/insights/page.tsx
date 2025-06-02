import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ClientInsightsMetrics } from "@/components/relationship-manager/reports/client-insights-metrics"
import { ClientStatusSummary } from "@/components/relationship-manager/reports/client-status-summary"
import { ClientRiskDistribution } from "@/components/relationship-manager/reports/client-risk-distribution"
import { ComplianceStatusOverview } from "@/components/relationship-manager/reports/compliance-status-overview"

export default function InsightsPage() {
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
              <BreadcrumbLink href="#">Reporting & Analytics</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Client Insights</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Client Insights</h1>
          <p className="text-slate-600 font-light">
            Advanced client behavior and relationship insights management happens here.
          </p>
        </div>

        <div className="space-y-6">
          <ClientInsightsMetrics />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ClientRiskDistribution />
            <ComplianceStatusOverview />
          </div>

          <ClientStatusSummary />
        </div>
      </div>
    </DashboardLayout>
  )
}
