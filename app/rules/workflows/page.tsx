import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function WorkflowTemplatesPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Rules & Policy Engine</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Workflow Templates</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Workflow Templates</h1>
          <p className="text-slate-600 font-light">Workflow templates management happens here</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
