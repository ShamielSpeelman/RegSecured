import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CalendarMetrics } from "@/components/relationship-manager/calendar/calendar-metrics"
import { CalendarView } from "@/components/relationship-manager/calendar/calendar-view"
import { AppointmentScheduler } from "@/components/relationship-manager/calendar/appointment-scheduler"
import { UpcomingDeadlines } from "@/components/relationship-manager/calendar/upcoming-deadlines"

export default function CalendarPage() {
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
              <BreadcrumbPage>Calendar & Scheduling</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Calendar & Scheduling</h1>
          <p className="text-slate-600 font-light">
            Manage your schedule, book client appointments, and coordinate onboarding timelines and deadlines.
          </p>
        </div>

        <CalendarMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <CalendarView />
          </div>
          <div className="space-y-6">
            <AppointmentScheduler />
            <UpcomingDeadlines />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
