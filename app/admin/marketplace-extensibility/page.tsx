import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { IntegrationMarketplace } from "@/components/admin/integration-marketplace"
import { CustomModuleDeployment } from "@/components/admin/custom-module-deployment"
import { ApiGatewayManagement } from "@/components/admin/api-gateway-management"
import { WebhookOrchestration } from "@/components/admin/webhook-orchestration"
import { DeveloperPortal } from "@/components/admin/developer-portal"

export default function MarketplaceExtensibilityPage() {
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
              <BreadcrumbLink href="#">Platform Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Marketplace & Extensibility</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Platform Marketplace & Extensibility</h1>
          <p className="text-slate-600 font-light">
            Comprehensive platform extensibility with marketplace, custom modules, API management, and developer tools
          </p>
        </div>

        <div className="space-y-8">
          <IntegrationMarketplace />
          <CustomModuleDeployment />
          <ApiGatewayManagement />
          <WebhookOrchestration />
          <DeveloperPortal />
        </div>
      </div>
    </DashboardLayout>
  )
}
