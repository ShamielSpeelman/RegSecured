"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Building2, Users, Settings, Database, Shield, CheckCircle, Clock, AlertCircle } from "lucide-react"

const provisioningSteps = [
  { id: "basic", label: "Basic Info", icon: Building2 },
  { id: "resources", label: "Resources", icon: Database },
  { id: "users", label: "Users & Roles", icon: Users },
  { id: "security", label: "Security", icon: Shield },
  { id: "review", label: "Review", icon: Settings },
]

const recentProvisionings = [
  { id: 1, name: "Acme Financial", status: "completed", progress: 100, time: "2 hours ago" },
  { id: 2, name: "Global Bank Ltd", status: "in-progress", progress: 75, time: "30 minutes ago" },
  { id: 3, name: "FinTech Innovations", status: "pending", progress: 25, time: "1 hour ago" },
  { id: 4, name: "Crypto Exchange Pro", status: "failed", progress: 60, time: "4 hours ago" },
]

const templates = [
  { id: "banking", name: "Traditional Banking", modules: ["KYC", "AML", "Transaction Monitoring"], users: 50 },
  { id: "fintech", name: "FinTech Startup", modules: ["Digital Onboarding", "Risk Assessment"], users: 25 },
  {
    id: "crypto",
    name: "Cryptocurrency Exchange",
    modules: ["Blockchain Analysis", "Sanctions Screening"],
    users: 100,
  },
  { id: "enterprise", name: "Enterprise Financial", modules: ["Full Suite", "Advanced Analytics"], users: 200 },
]

export function TenantProvisioningWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    template: "",
    region: "",
    modules: [] as string[],
    adminEmail: "",
    adminName: "",
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Provisioning Wizard */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">New Tenant Provisioning</CardTitle>
            <div className="flex items-center space-x-4 mt-4">
              {provisioningSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        index <= currentStep ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${index <= currentStep ? "text-blue-500" : "text-gray-400"}`} />
                    </div>
                    {index < provisioningSteps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-2 ${index < currentStep ? "bg-blue-500" : "bg-gray-300"}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenant-name">Tenant Name</Label>
                    <Input
                      id="tenant-name"
                      placeholder="e.g., Acme Financial Services"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="domain">Domain</Label>
                    <Input
                      id="domain"
                      placeholder="acme-financial"
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Provisioning Template</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.template === template.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setFormData({ ...formData, template: template.id })}
                      >
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {template.users} users • {template.modules.length} modules
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {template.modules.slice(0, 2).map((module) => (
                            <Badge key={module} variant="secondary" className="text-xs">
                              {module}
                            </Badge>
                          ))}
                          {template.modules.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.modules.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="region">Deployment Region</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => setFormData({ ...formData, region: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                      <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                      <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                      <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>CPU Allocation</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select CPU" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 vCPUs</SelectItem>
                        <SelectItem value="4">4 vCPUs</SelectItem>
                        <SelectItem value="8">8 vCPUs</SelectItem>
                        <SelectItem value="16">16 vCPUs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Memory (RAM)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select RAM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8 GB</SelectItem>
                        <SelectItem value="16">16 GB</SelectItem>
                        <SelectItem value="32">32 GB</SelectItem>
                        <SelectItem value="64">64 GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Storage</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select storage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100 GB SSD</SelectItem>
                        <SelectItem value="500">500 GB SSD</SelectItem>
                        <SelectItem value="1000">1 TB SSD</SelectItem>
                        <SelectItem value="2000">2 TB SSD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Database Configuration</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="backup" />
                        <Label htmlFor="backup" className="text-sm">
                          Automated Backups
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="encryption" />
                        <Label htmlFor="encryption" className="text-sm">
                          Encryption at Rest
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="replication" />
                        <Label htmlFor="replication" className="text-sm">
                          Multi-AZ Replication
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="monitoring" />
                        <Label htmlFor="monitoring" className="text-sm">
                          Performance Monitoring
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(provisioningSteps.length - 1, currentStep + 1))}
                disabled={currentStep === provisioningSteps.length - 1}
              >
                {currentStep === provisioningSteps.length - 1 ? "Provision Tenant" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Provisionings */}
      <div>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Recent Provisionings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProvisionings.map((provisioning) => (
              <div key={provisioning.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(provisioning.status)}
                    <span className="font-medium text-sm">{provisioning.name}</span>
                  </div>
                  <Badge className={getStatusColor(provisioning.status)}>{provisioning.status}</Badge>
                </div>
                <Progress value={provisioning.progress} className="h-2" />
                <div className="text-xs text-gray-500">{provisioning.time}</div>
                {provisioning.id !== recentProvisionings[recentProvisionings.length - 1].id && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="sm">
              Clone Existing Tenant
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Import from Template
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Bulk Provisioning
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
