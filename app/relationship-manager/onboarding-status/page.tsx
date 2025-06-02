import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { OnboardingStatusMetrics } from "@/components/relationship-manager/onboarding-status/onboarding-status-metrics"
import { OnboardingStatusFilters } from "@/components/relationship-manager/onboarding-status/onboarding-status-filters"
import { OnboardingStatusTable } from "@/components/relationship-manager/onboarding-status/onboarding-status-table"
import { OnboardingTimelineView } from "@/components/relationship-manager/onboarding-status/onboarding-timeline-view"
import { OnboardingAlerts } from "@/components/relationship-manager/onboarding-status/onboarding-alerts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ClockIcon } from "lucide-react"

export default function OnboardingStatusPage() {
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
              <BreadcrumbLink href="#">My Clients</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Onboarding Status</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Onboarding Status</h1>
          <p className="text-slate-600 font-light">
            Monitor and track the progress of all ongoing client onboarding processes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <Alert className="mb-6">
              <ClockIcon className="h-4 w-4" />
              <AlertTitle>Onboarding Progress</AlertTitle>
              <AlertDescription>
                Track client onboarding milestones, identify bottlenecks, and ensure timely completion.
              </AlertDescription>
            </Alert>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Onboarding Metrics</CardTitle>
                <CardDescription>Key performance indicators for onboarding processes</CardDescription>
              </CardHeader>
              <CardContent>
                <OnboardingStatusMetrics />
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filter & Search</CardTitle>
                <CardDescription>Filter onboarding cases by status, priority, and timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <OnboardingStatusFilters />
              </CardContent>
            </Card>

            <Tabs defaultValue="table-view" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="table-view">Table View</TabsTrigger>
                <TabsTrigger value="timeline-view">Timeline View</TabsTrigger>
              </TabsList>

              <TabsContent value="table-view">
                <Card>
                  <CardHeader>
                    <CardTitle>Onboarding Cases</CardTitle>
                    <CardDescription>
                      Detailed view of all onboarding processes and their current status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OnboardingStatusTable />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline-view">
                <Card>
                  <CardHeader>
                    <CardTitle>Onboarding Timeline</CardTitle>
                    <CardDescription>Visual timeline showing onboarding progress and milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OnboardingTimelineView />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Alerts & Notifications</CardTitle>
                <CardDescription>Important onboarding updates and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <OnboardingAlerts />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
