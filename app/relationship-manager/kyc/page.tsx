import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { KYCDataEntryForm } from "@/components/relationship-manager/kyc/kyc-data-entry-form"
import { KYCClientSelector } from "@/components/relationship-manager/kyc/kyc-client-selector"
import { KYCRequirementsList } from "@/components/relationship-manager/kyc/kyc-requirements-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function KYCPage() {
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
              <BreadcrumbPage>Client Data Entry</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Client Data Entry</h1>
          <p className="text-slate-600 font-light">
            Collect and manage Know Your Customer (KYC) information for client onboarding.
          </p>
        </div>

        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            All KYC information must be verified against original documents. Ensure data accuracy to comply with
            regulatory requirements.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="data-entry" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="data-entry">KYC Data Entry</TabsTrigger>
                <TabsTrigger value="client-select">Select Client</TabsTrigger>
              </TabsList>
              <TabsContent value="data-entry">
                <KYCDataEntryForm />
              </TabsContent>
              <TabsContent value="client-select">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Client</CardTitle>
                    <CardDescription>Select an existing client to update their KYC information.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <KYCClientSelector />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>KYC Requirements</CardTitle>
                <CardDescription>Required information based on client type and risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <KYCRequirementsList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
