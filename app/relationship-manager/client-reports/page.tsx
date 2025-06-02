import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ClientReportsMetrics } from "@/components/relationship-manager/reports/client-reports-metrics"
import { ClientReportsFilters } from "@/components/relationship-manager/reports/client-reports-filters"
import { ClientReportsTable } from "@/components/relationship-manager/reports/client-reports-table"
import { ReportGenerationPanel } from "@/components/relationship-manager/reports/report-generation-panel"
import { ClientPerformanceCharts } from "@/components/relationship-manager/reports/client-performance-charts"

export default function ClientReportsPage() {
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
              <BreadcrumbPage>My Client Reports</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">My Client Reports</h1>
          <p className="text-slate-600 font-light">
            Comprehensive client reporting and portfolio performance analytics for your managed clients.
          </p>
        </div>

        <div className="space-y-6">
          <ClientReportsMetrics />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ClientReportsFilters />
              <ClientReportsTable />
            </div>
            <div className="space-y-6">
              <ReportGenerationPanel />
              <ClientPerformanceCharts />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
