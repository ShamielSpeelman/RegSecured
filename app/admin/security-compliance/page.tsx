"use client"

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
import { ZeroTrustSecurityFramework } from "@/components/admin/zero-trust-security-framework"
import { ComplianceCertificationTracker } from "@/components/admin/compliance-certification-tracker"
import { ThreatIntelligenceIntegration } from "@/components/admin/threat-intelligence-integration"
import { DataLineagePrivacyAssessment } from "@/components/admin/data-lineage-privacy-assessment"
import { AutomatedRegulatoryReporting } from "@/components/admin/automated-regulatory-reporting"

export default function SecurityCompliancePage() {
  return (
    <DashboardLayout userRole="superadmin">
      <div className="flex flex-col h-full">
        <div className="flex-none px-6 py-4 border-b border-stone-200">
          <Breadcrumb className="mb-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/superadmin" className="text-sm text-slate-600">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-sm text-slate-600">
                  System Administration
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm text-slate-900">Security & Compliance</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium text-slate-900">Innovative Security & Compliance</h1>
              <p className="text-sm text-slate-600 mt-1">
                Advanced security frameworks, threat intelligence, and automated compliance management
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="zero-trust" className="h-full flex flex-col">
            <div className="flex-none px-6 pt-4">
              <TabsList className="grid w-full grid-cols-5 bg-slate-50">
                <TabsTrigger value="zero-trust" className="text-xs">
                  Zero-Trust Security
                </TabsTrigger>
                <TabsTrigger value="certification" className="text-xs">
                  Compliance Certification
                </TabsTrigger>
                <TabsTrigger value="threat-intel" className="text-xs">
                  Threat Intelligence
                </TabsTrigger>
                <TabsTrigger value="data-lineage" className="text-xs">
                  Data Lineage & Privacy
                </TabsTrigger>
                <TabsTrigger value="reporting" className="text-xs">
                  Regulatory Reporting
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto">
              <TabsContent value="zero-trust" className="h-full m-0 p-6">
                <ZeroTrustSecurityFramework />
              </TabsContent>
              <TabsContent value="certification" className="h-full m-0 p-6">
                <ComplianceCertificationTracker />
              </TabsContent>
              <TabsContent value="threat-intel" className="h-full m-0 p-6">
                <ThreatIntelligenceIntegration />
              </TabsContent>
              <TabsContent value="data-lineage" className="h-full m-0 p-6">
                <DataLineagePrivacyAssessment />
              </TabsContent>
              <TabsContent value="reporting" className="h-full m-0 p-6">
                <AutomatedRegulatoryReporting />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
