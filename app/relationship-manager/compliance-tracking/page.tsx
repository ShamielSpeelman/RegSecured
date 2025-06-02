import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ComplianceMetrics } from "@/components/relationship-manager/compliance/compliance-metrics"
import { ComplianceStatusTable } from "@/components/relationship-manager/compliance/compliance-status-table"
import { ComplianceRequirements } from "@/components/relationship-manager/compliance/compliance-requirements"
import { RegulatoryCalendar } from "@/components/relationship-manager/compliance/regulatory-calendar"

export default function ComplianceTrackingPage() {
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
              <BreadcrumbPage>Compliance Tracking</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Compliance Tracking</h1>
          <p className="text-slate-600 font-light">
            Track compliance status, monitor regulatory requirements, and ensure client adherence to policies and
            procedures.
          </p>
        </div>

        <div className="space-y-6">
          <ComplianceMetrics />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <ComplianceStatusTable />
            </div>
            <div className="space-y-6">
              <ComplianceRequirements />
              <RegulatoryCalendar />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
