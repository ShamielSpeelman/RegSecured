import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CommunicationMetrics } from "@/components/relationship-manager/communications/communication-metrics"
import { MessageCenter } from "@/components/relationship-manager/communications/message-center"
import { CommunicationHistory } from "@/components/relationship-manager/communications/communication-history"
import { CommunicationTemplates } from "@/components/relationship-manager/communications/communication-templates"
import { ScheduledCommunications } from "@/components/relationship-manager/communications/scheduled-communications"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageSquareIcon } from "lucide-react"

export default function CommunicationsPage() {
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
              <BreadcrumbPage>Client Communications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Client Communications</h1>
          <p className="text-slate-600 font-light">
            Manage all client communications, track correspondence history, and streamline messaging workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <Alert className="mb-6">
              <MessageSquareIcon className="h-4 w-4" />
              <AlertTitle>Communication Hub</AlertTitle>
              <AlertDescription>
                Centralized platform for managing all client communications, templates, and scheduled messages.
              </AlertDescription>
            </Alert>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Communication Metrics</CardTitle>
                <CardDescription>Overview of your communication activity and response rates</CardDescription>
              </CardHeader>
              <CardContent>
                <CommunicationMetrics />
              </CardContent>
            </Card>

            <Tabs defaultValue="message-center" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="message-center">Message Center</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>

              <TabsContent value="message-center">
                <Card>
                  <CardHeader>
                    <CardTitle>Message Center</CardTitle>
                    <CardDescription>Send messages, manage conversations, and track responses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MessageCenter />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication History</CardTitle>
                    <CardDescription>Complete record of all client communications and interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CommunicationHistory />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="templates">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication Templates</CardTitle>
                    <CardDescription>Pre-built templates for common communication scenarios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CommunicationTemplates />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scheduled">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Communications</CardTitle>
                    <CardDescription>Manage automated and scheduled client communications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScheduledCommunications />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common communication tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="font-medium text-sm">New Message</div>
                  <div className="text-xs text-slate-600">Send a new message to clients</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="font-medium text-sm">Bulk Communication</div>
                  <div className="text-xs text-slate-600">Send to multiple clients</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="font-medium text-sm">Schedule Follow-up</div>
                  <div className="text-xs text-slate-600">Set automated reminders</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="font-medium text-sm">Export History</div>
                  <div className="text-xs text-slate-600">Download communication logs</div>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
