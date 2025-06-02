import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { StatusOverviewMetrics } from "@/components/relationship-manager/status-tracking/status-overview-metrics"
import { OnboardingStatusTable } from "@/components/relationship-manager/status-tracking/onboarding-status-table"
import { KYCProgressTracker } from "@/components/relationship-manager/status-tracking/kyc-progress-tracker"
import { DocumentCollectionStatus } from "@/components/relationship-manager/status-tracking/document-collection-status"
import { ComplianceReviewTracker } from "@/components/relationship-manager/status-tracking/compliance-review-tracker"
import { IssueManagementPanel } from "@/components/relationship-manager/status-tracking/issue-management-panel"

export default function StatusTrackingPage() {
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
              <BreadcrumbLink href="#">Client Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Status Tracking</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Status Tracking</h1>
          <p className="text-slate-600 font-light">Client onboarding status is managed here.</p>
        </div>

        <StatusOverviewMetrics />
        <OnboardingStatusTable />
        <KYCProgressTracker />
        <DocumentCollectionStatus />
        <ComplianceReviewTracker />
        <IssueManagementPanel />
      </div>
    </DashboardLayout>
  )
}
