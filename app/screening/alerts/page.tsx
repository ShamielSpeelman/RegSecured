import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function AlertInboxPage() {
  return (
    <DashboardLayout userRole="analyst">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/analyst">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Screening & Alerts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Alert Inbox</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Alert Inbox</h1>
          <p className="text-slate-600 font-light">Manage and process incoming screening alerts and notifications</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
