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
import { DocumentRequestList } from "@/components/relationship-manager/documentation/document-request-list"
import { DocumentMetrics } from "@/components/relationship-manager/documentation/document-metrics"
import { DocumentFilters } from "@/components/relationship-manager/documentation/document-filters"
import { DocumentRequestForm } from "@/components/relationship-manager/documentation/document-request-form"
import { DocumentExpiryTracker } from "@/components/relationship-manager/documentation/document-expiry-tracker"
import { DocumentTemplates } from "@/components/relationship-manager/documentation/document-templates"

export default function DocumentationPage() {
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
              <BreadcrumbPage>Document Requests</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Document Requests</h1>
          <p className="text-slate-600 font-light">
            Request, track, and manage client documentation for compliance and KYC purposes.
          </p>
        </div>

        <DocumentMetrics />

        <div className="mt-6">
          <DocumentFilters />
        </div>

        <Tabs defaultValue="pending" className="mt-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Documents</TabsTrigger>
            <TabsTrigger value="templates">Request Templates</TabsTrigger>
            <TabsTrigger value="request">New Request</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-4">
            <DocumentRequestList status="pending" />
          </TabsContent>
          <TabsContent value="received" className="mt-4">
            <DocumentRequestList status="received" />
          </TabsContent>
          <TabsContent value="verified" className="mt-4">
            <DocumentRequestList status="verified" />
          </TabsContent>
          <TabsContent value="expiring" className="mt-4">
            <DocumentExpiryTracker />
          </TabsContent>
          <TabsContent value="templates" className="mt-4">
            <DocumentTemplates />
          </TabsContent>
          <TabsContent value="request" className="mt-4">
            <DocumentRequestForm />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
