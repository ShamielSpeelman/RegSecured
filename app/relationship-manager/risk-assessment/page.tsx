import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { RiskMetrics } from "@/components/relationship-manager/risk/risk-metrics"
import { RiskDistributionChart } from "@/components/relationship-manager/risk/risk-distribution-chart"
import { RiskFactorsTable } from "@/components/relationship-manager/risk/risk-factors-table"
import { RiskAssessmentForm } from "@/components/relationship-manager/risk/risk-assessment-form"

export default function RiskAssessmentPage() {
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
              <BreadcrumbPage>Risk Assessment</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Risk Assessment</h1>
          <p className="text-slate-600 font-light">
            Conduct comprehensive client risk evaluations, monitor risk factors, and maintain risk profiles for your
            portfolio.
          </p>
        </div>

        <div className="space-y-6">
          <RiskMetrics />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <RiskFactorsTable />
            </div>
            <div className="space-y-6">
              <RiskDistributionChart />
              <RiskAssessmentForm />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
