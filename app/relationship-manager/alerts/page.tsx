import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AlertMetrics } from "@/components/relationship-manager/alerts/alert-metrics"
import { AlertFilters } from "@/components/relationship-manager/alerts/alert-filters"
import { AlertList } from "@/components/relationship-manager/alerts/alert-list"
import { AlertSummary } from "@/components/relationship-manager/alerts/alert-summary"

export default function AlertsPage() {
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
              <BreadcrumbLink href="#">Risk & Compliance</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Alert Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Alert Management</h1>
          <p className="text-slate-600 font-light">
            Monitor and manage client-related alerts, compliance notifications, and risk indicators for your portfolio.
          </p>
        </div>

        <div className="space-y-6">
          <AlertMetrics />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <AlertFilters />
              <AlertList />
            </div>
            <div>
              <AlertSummary />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
