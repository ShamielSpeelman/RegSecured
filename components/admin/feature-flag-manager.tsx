"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Flag, Plus, Search, TrendingUp, Eye, Edit, Trash2, BarChart3, Target, Zap } from "lucide-react"

interface FeatureFlag {
  id: string
  name: string
  description: string
  status: "enabled" | "disabled" | "testing"
  environment: string[]
  rolloutPercentage: number
  targetAudience: string
  createdDate: string
  lastModified: string
  usageCount: number
  category: string
}

export function FeatureFlagManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEnvironment, setSelectedEnvironment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const featureFlags: FeatureFlag[] = [
    {
      id: "ff-001",
      name: "Enhanced Risk Scoring",
      description: "AI-powered risk assessment with machine learning models",
      status: "testing",
      environment: ["staging", "production"],
      rolloutPercentage: 25,
      targetAudience: "Premium Tier",
      createdDate: "2024-01-10",
      lastModified: "2024-01-20",
      usageCount: 1250,
      category: "Risk Management",
    },
    {
      id: "ff-002",
      name: "Real-time Document OCR",
      description: "Instant document processing with advanced OCR capabilities",
      status: "enabled",
      environment: ["production"],
      rolloutPercentage: 100,
      targetAudience: "All Users",
      createdDate: "2024-01-05",
      lastModified: "2024-01-15",
      usageCount: 5420,
      category: "Document Processing",
    },
    {
      id: "ff-003",
      name: "Multi-language Support",
      description: "Platform localization for global markets",
      status: "disabled",
      environment: ["development"],
      rolloutPercentage: 0,
      targetAudience: "International Users",
      createdDate: "2024-01-12",
      lastModified: "2024-01-18",
      usageCount: 0,
      category: "Localization",
    },
    {
      id: "ff-004",
      name: "Advanced Analytics Dashboard",
      description: "Enhanced reporting with predictive analytics",
      status: "testing",
      environment: ["staging"],
      rolloutPercentage: 50,
      targetAudience: "Enterprise Clients",
      createdDate: "2024-01-08",
      lastModified: "2024-01-22",
      usageCount: 890,
      category: "Analytics",
    },
  ]

  const environments = ["development", "staging", "production"]
  const categories = ["Risk Management", "Document Processing", "Analytics", "Localization", "Security", "Integration"]

  const filteredFlags = featureFlags.filter((flag) => {
    const matchesSearch =
      flag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEnvironment = selectedEnvironment === "all" || flag.environment.includes(selectedEnvironment)
    const matchesStatus = selectedStatus === "all" || flag.status === selectedStatus

    return matchesSearch && matchesEnvironment && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Flag className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">Feature Flag Management</h2>
            <p className="text-sm text-slate-600">Control feature rollouts and A/B testing across environments</p>
          </div>
        </div>
        <Button size="sm" className="h-8">
          <Plus className="h-3 w-3 mr-2" />
          New Feature Flag
        </Button>
      </div>

      <Tabs defaultValue="flags" className="space-y-4">
        <TabsList className="grid w-fit grid-cols-3 bg-slate-50">
          <TabsTrigger value="flags" className="text-xs">
            Feature Flags
          </TabsTrigger>
          <TabsTrigger value="experiments" className="text-xs">
            A/B Experiments
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs">
            Usage Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flags" className="space-y-4">
          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-600">Total Flags</p>
                    <p className="text-2xl font-semibold text-slate-900">{featureFlags.length}</p>
                  </div>
                  <Flag className="h-8 w-8 text-slate-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-600">Active Flags</p>
                    <p className="text-2xl font-semibold text-green-600">
                      {featureFlags.filter((f) => f.status === "enabled").length}
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-600">In Testing</p>
                    <p className="text-2xl font-semibold text-yellow-600">
                      {featureFlags.filter((f) => f.status === "testing").length}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-600">Total Usage</p>
                    <p className="text-2xl font-semibold text-slate-900">
                      {featureFlags.reduce((sum, f) => sum + f.usageCount, 0).toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search feature flags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="w-48">
                  <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All Environments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Environments</SelectItem>
                      {environments.map((env) => (
                        <SelectItem key={env} value={env}>
                          {env}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-48">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Flags List */}
          <div className="space-y-3">
            {filteredFlags.map((flag) => (
              <Card key={flag.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-slate-900">{flag.name}</h3>
                        <Badge
                          variant={
                            flag.status === "enabled" ? "default" : flag.status === "testing" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {flag.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {flag.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{flag.description}</p>

                      <div className="grid grid-cols-4 gap-6 text-sm">
                        <div>
                          <Label className="text-xs font-medium text-slate-600">Rollout Progress</Label>
                          <div className="mt-1">
                            <div className="flex items-center gap-2">
                              <Progress value={flag.rolloutPercentage} className="flex-1 h-2" />
                              <span className="text-xs text-slate-700 w-10">{flag.rolloutPercentage}%</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs font-medium text-slate-600">Target Audience</Label>
                          <div className="mt-1">
                            <span className="text-xs text-slate-700">{flag.targetAudience}</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs font-medium text-slate-600">Usage Count</Label>
                          <div className="mt-1">
                            <span className="text-xs text-slate-700">{flag.usageCount.toLocaleString()}</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs font-medium text-slate-600">Environments</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {flag.environment.map((env, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {env}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Switch
                        checked={flag.status === "enabled"}
                        onCheckedChange={() => {}}
                        disabled={flag.status === "testing"}
                      />
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experiments" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">A/B Testing Experiments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">A/B testing framework</p>
                <p className="text-xs mt-1">Design and monitor controlled experiments</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Feature Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">Feature adoption metrics</p>
                <p className="text-xs mt-1">Track feature usage and performance impact</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
