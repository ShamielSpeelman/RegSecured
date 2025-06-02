import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { OnboardingInitiationForm } from "@/components/relationship-manager/onboarding/onboarding-initiation-form"
import { OnboardingTemplateSelector } from "@/components/relationship-manager/onboarding/onboarding-template-selector"
import { RecentOnboardingRequests } from "@/components/relationship-manager/onboarding/recent-onboarding-requests"
import { OnboardingMetrics } from "@/components/relationship-manager/onboarding/onboarding-metrics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function OnboardingPage() {
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
              <BreadcrumbLink href="#">New Client Onboarding</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Initiate Onboarding</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Initiate Onboarding</h1>
          <p className="text-slate-600 font-light">
            Start the client onboarding process by creating a new request or using a template.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Alert className="mb-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Ensure you have collected the client's consent for data processing before initiating onboarding.
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="new-request" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="new-request">New Onboarding Request</TabsTrigger>
                <TabsTrigger value="templates">Use Template</TabsTrigger>
              </TabsList>
              <TabsContent value="new-request">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Onboarding Request</CardTitle>
                    <CardDescription>
                      Enter the client's basic information to initiate the onboarding process.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OnboardingInitiationForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="templates">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Onboarding Template</CardTitle>
                    <CardDescription>
                      Choose a pre-configured template based on client type and jurisdiction.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OnboardingTemplateSelector />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Onboarding Metrics</CardTitle>
                <CardDescription>Your recent onboarding performance</CardDescription>
              </CardHeader>
              <CardContent>
                <OnboardingMetrics />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Onboarding Requests</CardTitle>
            <CardDescription>View and manage your recently initiated onboarding requests</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOnboardingRequests />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
