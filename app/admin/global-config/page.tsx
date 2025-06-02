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
import { SystemSettingsDashboard } from "@/components/admin/system-settings-dashboard"
import { JurisdictionRuleManager } from "@/components/admin/jurisdiction-rule-manager"
import { ComplianceTemplateManager } from "@/components/admin/compliance-template-manager"
import { FeatureFlagManager } from "@/components/admin/feature-flag-manager"
import { EnvironmentConfigManager } from "@/components/admin/environment-config-manager"

export default function GlobalConfigPage() {
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
                <BreadcrumbPage className="text-sm text-slate-900">Global Configuration</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium text-slate-900">Global Configuration</h1>
              <p className="text-sm text-slate-600 mt-1">
                Manage system-wide settings, compliance rules, and platform configurations
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="system" className="h-full flex flex-col">
            <div className="flex-none px-6 pt-4">
              <TabsList className="grid w-full grid-cols-5 bg-slate-50">
                <TabsTrigger value="system" className="text-xs">
                  System Settings
                </TabsTrigger>
                <TabsTrigger value="jurisdiction" className="text-xs">
                  Jurisdiction Rules
                </TabsTrigger>
                <TabsTrigger value="templates" className="text-xs">
                  Compliance Templates
                </TabsTrigger>
                <TabsTrigger value="features" className="text-xs">
                  Feature Flags
                </TabsTrigger>
                <TabsTrigger value="environment" className="text-xs">
                  Environment Config
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto">
              <TabsContent value="system" className="h-full m-0 p-6">
                <SystemSettingsDashboard />
              </TabsContent>
              <TabsContent value="jurisdiction" className="h-full m-0 p-6">
                <JurisdictionRuleManager />
              </TabsContent>
              <TabsContent value="templates" className="h-full m-0 p-6">
                <ComplianceTemplateManager />
              </TabsContent>
              <TabsContent value="features" className="h-full m-0 p-6">
                <FeatureFlagManager />
              </TabsContent>
              <TabsContent value="environment" className="h-full m-0 p-6">
                <EnvironmentConfigManager />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
