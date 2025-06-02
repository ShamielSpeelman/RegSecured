import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewSchedule } from "@/components/relationship-manager/reviews/review-schedule"
import { ReviewMetrics } from "@/components/relationship-manager/reviews/review-metrics"
import { ReviewFilters } from "@/components/relationship-manager/reviews/review-filters"
import { ReviewRequestForm } from "@/components/relationship-manager/reviews/review-request-form"
import { ReviewFindings } from "@/components/relationship-manager/reviews/review-findings"
import { ReviewCalendar } from "@/components/relationship-manager/reviews/review-calendar"

export default function ReviewsPage() {
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
              <BreadcrumbLink href="#">Client Services</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Request Reviews</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Request Reviews</h1>
          <p className="text-slate-600 font-light">
            Schedule, request, and manage client compliance reviews and assessments.
          </p>
        </div>

        <ReviewMetrics />

        <div className="mt-6">
          <ReviewFilters />
        </div>

        <Tabs defaultValue="upcoming" className="mt-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Reviews</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="findings">Review Findings</TabsTrigger>
            <TabsTrigger value="calendar">Review Calendar</TabsTrigger>
            <TabsTrigger value="request">Request Review</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4">
            <ReviewSchedule status="upcoming" />
          </TabsContent>
          <TabsContent value="inProgress" className="mt-4">
            <ReviewSchedule status="inProgress" />
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <ReviewSchedule status="completed" />
          </TabsContent>
          <TabsContent value="findings" className="mt-4">
            <ReviewFindings />
          </TabsContent>
          <TabsContent value="calendar" className="mt-4">
            <ReviewCalendar />
          </TabsContent>
          <TabsContent value="request" className="mt-4">
            <ReviewRequestForm />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
