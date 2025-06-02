import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MeetingMetrics } from "@/components/relationship-manager/meetings/meeting-metrics"
import { MeetingScheduler } from "@/components/relationship-manager/meetings/meeting-scheduler"
import { MeetingList } from "@/components/relationship-manager/meetings/meeting-list"
import { MeetingTemplates } from "@/components/relationship-manager/meetings/meeting-templates"
import { MeetingNotes } from "@/components/relationship-manager/meetings/meeting-notes"

export default function MeetingsPage() {
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
              <BreadcrumbLink href="#">Relationship Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Meeting Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Meeting Management</h1>
          <p className="text-slate-600 font-light">
            Schedule, manage, and track client meetings, onboarding sessions, and follow-up appointments.
          </p>
        </div>

        <MeetingMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <MeetingList />
            <MeetingTemplates />
          </div>
          <div className="space-y-6">
            <MeetingScheduler />
            <MeetingNotes />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
