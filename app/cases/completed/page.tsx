import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function RecentlyCompletedPage() {
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
              <BreadcrumbLink href="#">My Cases</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recently Completed</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Recently Completed</h1>
          <p className="text-slate-600 font-light">View cases you have recently completed and submitted for approval</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
