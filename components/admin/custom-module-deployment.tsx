"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Package, Upload, Play, Pause, Trash2, Settings, Activity } from "lucide-react"

const moduleData = {
  deployed: [
    {
      id: "custom-risk-engine",
      name: "Custom Risk Engine",
      version: "v2.1.4",
      status: "running",
      health: 98,
      instances: 3,
      lastDeployed: "2024-01-15T10:30:00Z",
      resources: { cpu: 45, memory: 62, storage: 23 },
      environment: "production",
    },
    {
      id: "compliance-automation",
      name: "Compliance Automation Suite",
      version: "v1.8.2",
      status: "running",
      health: 95,
      instances: 2,
      lastDeployed: "2024-01-12T14:20:00Z",
      resources: { cpu: 32, memory: 48, storage: 18 },
      environment: "production",
    },
    {
      id: "data-enrichment",
      name: "Data Enrichment Module",
      version: "v3.0.1",
      status: "updating",
      health: 87,
      instances: 4,
      lastDeployed: "2024-01-10T09:15:00Z",
      resources: { cpu: 67, memory: 71, storage: 34 },
      environment: "staging",
    },
  ],
  deploymentQueue: [
    {
      id: "ml-fraud-detection",
      name: "ML Fraud Detection",
      version: "v1.0.0",
      status: "pending",
      estimatedTime: "15 min",
      priority: "high",
    },
    {
      id: "document-classifier",
      name: "Document Classifier",
      version: "v2.3.1",
      status: "building",
      progress: 67,
      priority: "medium",
    },
  ],
  environments: [
    { name: "Development", modules: 12, status: "healthy" },
    { name: "Staging", modules: 8, status: "healthy" },
    { name: "Production", modules: 15, status: "healthy" },
    { name: "DR", modules: 15, status: "syncing" },
  ],
}

export function CustomModuleDeployment() {
  const [selectedModule, setSelectedModule] = useState(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-600 bg-green-100"
      case "updating":
        return "text-orange-600 bg-orange-100"
      case "stopped":
        return "text-red-600 bg-red-100"
      case "pending":
        return "text-blue-600 bg-blue-100"
      case "building":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 95) return "text-green-600"
    if (health >= 80) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-purple-600" />
          <CardTitle>Custom Module Deployment</CardTitle>
        </div>
        <CardDescription>Deploy, manage, and monitor custom modules across environments</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deployed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deployed">Deployed</TabsTrigger>
            <TabsTrigger value="queue">Deployment Queue</TabsTrigger>
            <TabsTrigger value="environments">Environments</TabsTrigger>
            <TabsTrigger value="upload">Upload Module</TabsTrigger>
          </TabsList>

          <TabsContent value="deployed" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Active Modules</h3>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Deploy New
              </Button>
            </div>

            <div className="grid gap-4">
              {moduleData.deployed.map((module) => (
                <Card key={module.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{module.name}</h4>
                          <Badge variant="outline">{module.version}</Badge>
                          <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                          <Badge variant="outline">{module.environment}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-slate-600">Health Score</p>
                            <p className={`text-lg font-semibold ${getHealthColor(module.health)}`}>{module.health}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Instances</p>
                            <p className="text-lg font-semibold">{module.instances}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">CPU Usage</p>
                            <div className="flex items-center gap-2">
                              <Progress value={module.resources.cpu} className="flex-1" />
                              <span className="text-sm">{module.resources.cpu}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Memory</p>
                            <div className="flex items-center gap-2">
                              <Progress value={module.resources.memory} className="flex-1" />
                              <span className="text-sm">{module.resources.memory}%</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-slate-500">
                          Last deployed: {new Date(module.lastDeployed).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="queue" className="space-y-4">
            <h3 className="text-lg font-semibold">Deployment Queue</h3>

            <div className="space-y-3">
              {moduleData.deploymentQueue.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge variant="outline">{item.version}</Badge>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>
                            {item.priority} priority
                          </Badge>
                        </div>

                        {item.status === "building" && (
                          <div className="flex items-center gap-2">
                            <Progress value={item.progress} className="flex-1" />
                            <span className="text-sm">{item.progress}%</span>
                          </div>
                        )}

                        {item.estimatedTime && (
                          <p className="text-sm text-slate-500">Estimated time: {item.estimatedTime}</p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="environments" className="space-y-4">
            <h3 className="text-lg font-semibold">Environment Overview</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {moduleData.environments.map((env) => (
                <Card key={env.name}>
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold mb-2">{env.name}</h4>
                    <p className="text-2xl font-bold text-blue-600 mb-1">{env.modules}</p>
                    <p className="text-sm text-slate-600 mb-3">Active Modules</p>
                    <Badge
                      className={
                        env.status === "healthy" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      }
                    >
                      {env.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Custom Module</h3>
              <p className="text-slate-600 mb-4">Drag and drop your module package or click to browse</p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Module Name</label>
                <Input placeholder="Enter module name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Version</label>
                <Input placeholder="e.g., v1.0.0" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
