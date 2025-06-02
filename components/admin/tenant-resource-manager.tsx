"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Slider } from "@/components/ui/slider"
import { Cpu, HardDrive, MemoryStick, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"

const tenants = [
  {
    id: 1,
    name: "Acme Financial",
    plan: "Enterprise",
    status: "active",
    cpu: { used: 75, allocated: 100, limit: 120 },
    memory: { used: 12, allocated: 16, limit: 20 },
    storage: { used: 450, allocated: 500, limit: 1000 },
    billing: { current: 2850, limit: 3000, cycle: "monthly" },
    users: { active: 45, limit: 50 },
  },
  {
    id: 2,
    name: "Global Bank Ltd",
    plan: "Professional",
    status: "active",
    cpu: { used: 45, allocated: 80, limit: 100 },
    memory: { used: 8, allocated: 12, limit: 16 },
    storage: { used: 280, allocated: 300, limit: 500 },
    billing: { current: 1650, limit: 2000, cycle: "monthly" },
    users: { active: 28, limit: 35 },
  },
  {
    id: 3,
    name: "FinTech Innovations",
    plan: "Starter",
    status: "warning",
    cpu: { used: 85, allocated: 40, limit: 50 },
    memory: { used: 7, allocated: 8, limit: 10 },
    storage: { used: 180, allocated: 200, limit: 250 },
    billing: { current: 890, limit: 1000, cycle: "monthly" },
    users: { active: 22, limit: 25 },
  },
]

const billingPlans = [
  { id: "starter", name: "Starter", price: 999, users: 25, features: ["Basic KYC", "Standard Support"] },
  {
    id: "professional",
    name: "Professional",
    price: 1999,
    users: 50,
    features: ["Advanced KYC", "AML Monitoring", "Priority Support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 2999,
    users: 100,
    features: ["Full Suite", "Custom Integrations", "24/7 Support"],
  },
  {
    id: "custom",
    name: "Custom",
    price: "Contact",
    users: "Unlimited",
    features: ["Tailored Solution", "Dedicated Support"],
  },
]

export function TenantResourceManager() {
  const [selectedTenant, setSelectedTenant] = useState(tenants[0])
  const [resourceLimits, setResourceLimits] = useState({
    cpu: [selectedTenant.cpu.limit],
    memory: [selectedTenant.memory.limit],
    storage: [selectedTenant.storage.limit],
  })

  const getUsageColor = (used: number, allocated: number) => {
    const percentage = (used / allocated) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total CPU</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">320</div>
              <div className="text-xs text-gray-500">vCPUs allocated</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MemoryStick className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Total Memory</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">512</div>
              <div className="text-xs text-gray-500">GB allocated</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <HardDrive className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Total Storage</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">2.5</div>
              <div className="text-xs text-gray-500">TB allocated</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Monthly Revenue</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-light">$5,390</div>
              <div className="text-xs text-gray-500">Current month</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="allocation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="allocation">Resource Allocation</TabsTrigger>
          <TabsTrigger value="billing">Billing Management</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="allocation" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tenant List */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Tenants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTenant.id === tenant.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTenant(tenant)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{tenant.name}</span>
                      {getStatusBadge(tenant.status)}
                    </div>
                    <div className="text-xs text-gray-500">{tenant.plan} Plan</div>
                    <div className="text-xs text-gray-500">
                      {tenant.users.active}/{tenant.users.limit} users
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Resource Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium">{selectedTenant.name} - Resource Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* CPU */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center space-x-2">
                        <Cpu className="h-4 w-4" />
                        <span>CPU Allocation</span>
                      </Label>
                      <span
                        className={`text-sm ${getUsageColor(selectedTenant.cpu.used, selectedTenant.cpu.allocated)}`}
                      >
                        {selectedTenant.cpu.used}% used
                      </span>
                    </div>
                    <Progress value={(selectedTenant.cpu.used / selectedTenant.cpu.allocated) * 100} className="mb-2" />
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Limit:</span>
                      <Slider
                        value={resourceLimits.cpu}
                        onValueChange={(value) => setResourceLimits({ ...resourceLimits, cpu: value })}
                        max={200}
                        min={50}
                        step={10}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-16">{resourceLimits.cpu[0]} vCPUs</span>
                    </div>
                  </div>

                  {/* Memory */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center space-x-2">
                        <MemoryStick className="h-4 w-4" />
                        <span>Memory Allocation</span>
                      </Label>
                      <span
                        className={`text-sm ${getUsageColor(selectedTenant.memory.used, selectedTenant.memory.allocated)}`}
                      >
                        {selectedTenant.memory.used}/{selectedTenant.memory.allocated} GB
                      </span>
                    </div>
                    <Progress
                      value={(selectedTenant.memory.used / selectedTenant.memory.allocated) * 100}
                      className="mb-2"
                    />
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Limit:</span>
                      <Slider
                        value={resourceLimits.memory}
                        onValueChange={(value) => setResourceLimits({ ...resourceLimits, memory: value })}
                        max={64}
                        min={8}
                        step={4}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-16">{resourceLimits.memory[0]} GB</span>
                    </div>
                  </div>

                  {/* Storage */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center space-x-2">
                        <HardDrive className="h-4 w-4" />
                        <span>Storage Allocation</span>
                      </Label>
                      <span
                        className={`text-sm ${getUsageColor(selectedTenant.storage.used, selectedTenant.storage.allocated)}`}
                      >
                        {selectedTenant.storage.used}/{selectedTenant.storage.allocated} GB
                      </span>
                    </div>
                    <Progress
                      value={(selectedTenant.storage.used / selectedTenant.storage.allocated) * 100}
                      className="mb-2"
                    />
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Limit:</span>
                      <Slider
                        value={resourceLimits.storage}
                        onValueChange={(value) => setResourceLimits({ ...resourceLimits, storage: value })}
                        max={2000}
                        min={100}
                        step={100}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-16">{resourceLimits.storage[0]} GB</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button size="sm">Apply Changes</Button>
                    <Button variant="outline" size="sm">
                      Reset to Defaults
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Billing Plans */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Billing Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {billingPlans.map((plan) => (
                  <div key={plan.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{plan.name}</span>
                      <span className="text-lg font-light">
                        {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                        {typeof plan.price === "number" && <span className="text-sm text-gray-500">/month</span>}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">Up to {plan.users} users</div>
                    <div className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-600">
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tenant Billing */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Tenant Billing Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">{tenant.name}</TableCell>
                        <TableCell>{tenant.plan}</TableCell>
                        <TableCell>${tenant.billing.current}</TableCell>
                        <TableCell>
                          {tenant.billing.current / tenant.billing.limit > 0.9 ? (
                            <Badge className="bg-yellow-100 text-yellow-800">Near Limit</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">Good</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Avg CPU Usage</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">68%</div>
                  <div className="text-xs text-gray-500">Across all tenants</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MemoryStick className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Avg Memory Usage</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">72%</div>
                  <div className="text-xs text-gray-500">Across all tenants</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Storage Growth</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">+12%</div>
                  <div className="text-xs text-gray-500">This month</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Resource Alerts</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-light">3</div>
                  <div className="text-xs text-gray-500">Active warnings</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
