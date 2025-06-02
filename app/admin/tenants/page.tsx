import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { TenantProvisioningWizard } from "@/components/admin/tenant-provisioning-wizard"
import { TenantResourceManager } from "@/components/admin/tenant-resource-manager"
import { CrossTenantAnalytics } from "@/components/admin/cross-tenant-analytics"
import { TenantHealthMonitoring } from "@/components/admin/tenant-health-monitoring"
import { DataIsolationVerification } from "@/components/admin/data-isolation-verification"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TenantsPage() {
  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/superadmin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">System Administration</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Multi-Tenant Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Multi-Tenant Management</h1>
          <p className="text-slate-600 font-light">
            Comprehensive tenant lifecycle, resource allocation, and monitoring
          </p>
        </div>

        <Tabs defaultValue="provisioning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="provisioning">Provisioning</TabsTrigger>
            <TabsTrigger value="resources">Resources & Billing</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="monitoring">Health Monitoring</TabsTrigger>
            <TabsTrigger value="isolation">Data Isolation</TabsTrigger>
          </TabsList>

          <TabsContent value="provisioning">
            <TenantProvisioningWizard />
          </TabsContent>

          <TabsContent value="resources">
            <TenantResourceManager />
          </TabsContent>

          <TabsContent value="analytics">
            <CrossTenantAnalytics />
          </TabsContent>

          <TabsContent value="monitoring">
            <TenantHealthMonitoring />
          </TabsContent>

          <TabsContent value="isolation">
            <DataIsolationVerification />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
