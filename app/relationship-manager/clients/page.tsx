import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ClientPortfolioMetrics } from "@/components/relationship-manager/clients/client-portfolio-metrics"
import { ClientSearchFilters } from "@/components/relationship-manager/clients/client-search-filters"
import { ClientPortfolioTable } from "@/components/relationship-manager/clients/client-portfolio-table"
import { ClientQuickActions } from "@/components/relationship-manager/clients/client-quick-actions"
import { RecentClientActivity } from "@/components/relationship-manager/clients/recent-client-activity"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function ClientsPage() {
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
              <BreadcrumbPage>Client Portfolio</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Client Portfolio</h1>
          <p className="text-slate-600 font-light">
            Comprehensive overview and management of your client relationships and portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <Alert className="mb-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Portfolio Overview</AlertTitle>
              <AlertDescription>
                Monitor client statuses, track onboarding progress, and manage relationships from this central hub.
              </AlertDescription>
            </Alert>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Portfolio Metrics</CardTitle>
                <CardDescription>Key performance indicators for your client portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientPortfolioMetrics />
              </CardContent>
            </Card>

            <Tabs defaultValue="all-clients" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all-clients">All Clients</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
                <TabsTrigger value="high-value">High Value</TabsTrigger>
              </TabsList>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Search & Filter</CardTitle>
                  <CardDescription>Find and filter clients by various criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientSearchFilters />
                </CardContent>
              </Card>

              <TabsContent value="all-clients">
                <Card>
                  <CardHeader>
                    <CardTitle>All Clients</CardTitle>
                    <CardDescription>Complete list of clients in your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClientPortfolioTable filter="all" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="active">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Clients</CardTitle>
                    <CardDescription>Clients with active accounts and ongoing relationships</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClientPortfolioTable filter="active" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="onboarding">
                <Card>
                  <CardHeader>
                    <CardTitle>Onboarding Clients</CardTitle>
                    <CardDescription>Clients currently in the onboarding process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClientPortfolioTable filter="onboarding" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="high-value">
                <Card>
                  <CardHeader>
                    <CardTitle>High Value Clients</CardTitle>
                    <CardDescription>Premium clients requiring enhanced relationship management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClientPortfolioTable filter="high-value" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common client management tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientQuickActions />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest client interactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentClientActivity />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
