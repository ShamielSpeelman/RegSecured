"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Globe, Key, BarChart3, Shield, Zap, Users, Settings } from "lucide-react"

const apiData = {
  endpoints: [
    {
      id: "user-management",
      name: "User Management API",
      path: "/api/v1/users",
      method: "GET",
      status: "active",
      rateLimit: "1000/hour",
      usage: 87,
      latency: 145,
      errorRate: 0.2,
      lastAccessed: "2024-01-15T10:30:00Z",
    },
    {
      id: "compliance-check",
      name: "Compliance Check API",
      path: "/api/v1/compliance/check",
      method: "POST",
      status: "active",
      rateLimit: "500/hour",
      usage: 92,
      latency: 234,
      errorRate: 0.1,
      lastAccessed: "2024-01-15T10:28:00Z",
    },
    {
      id: "risk-assessment",
      name: "Risk Assessment API",
      path: "/api/v1/risk/assess",
      method: "POST",
      status: "maintenance",
      rateLimit: "200/hour",
      usage: 45,
      latency: 189,
      errorRate: 1.2,
      lastAccessed: "2024-01-15T09:45:00Z",
    },
  ],
  analytics: {
    totalRequests: 2847392,
    avgLatency: 178,
    errorRate: 0.3,
    uptime: 99.97,
    topConsumers: [
      { name: "Mobile App", requests: 1245678, percentage: 43.7 },
      { name: "Web Portal", requests: 987432, percentage: 34.7 },
      { name: "Third-party Integrations", requests: 614282, percentage: 21.6 },
    ],
  },
  rateLimits: [
    {
      id: "basic-tier",
      name: "Basic Tier",
      limit: "1000 requests/hour",
      burst: "100 requests/minute",
      clients: 245,
      status: "active",
    },
    {
      id: "premium-tier",
      name: "Premium Tier",
      limit: "10000 requests/hour",
      burst: "500 requests/minute",
      clients: 89,
      status: "active",
    },
    {
      id: "enterprise-tier",
      name: "Enterprise Tier",
      limit: "Unlimited",
      burst: "1000 requests/minute",
      clients: 12,
      status: "active",
    },
  ],
}

export function ApiGatewayManagement() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100"
      case "maintenance":
        return "text-orange-600 bg-orange-100"
      case "deprecated":
        return "text-red-600 bg-red-100"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return "text-red-600"
    if (usage >= 70) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-green-600" />
          <CardTitle>API Gateway Management</CardTitle>
        </div>
        <CardDescription>
          Monitor, secure, and optimize API endpoints with advanced rate limiting and analytics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">API Endpoints</h3>
              <Button size="sm">
                <Key className="h-4 w-4 mr-2" />
                Create Endpoint
              </Button>
            </div>

            <div className="grid gap-4">
              {apiData.endpoints.map((endpoint) => (
                <Card key={endpoint.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{endpoint.name}</h4>
                          <Badge variant="outline">{endpoint.method}</Badge>
                          <Badge className={getStatusColor(endpoint.status)}>{endpoint.status}</Badge>
                        </div>

                        <p className="text-sm text-slate-600 mb-3 font-mono">{endpoint.path}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-slate-600">Rate Limit</p>
                            <p className="font-semibold">{endpoint.rateLimit}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Usage</p>
                            <div className="flex items-center gap-2">
                              <Progress value={endpoint.usage} className="flex-1" />
                              <span className={`text-sm font-semibold ${getUsageColor(endpoint.usage)}`}>
                                {endpoint.usage}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Avg Latency</p>
                            <p className="font-semibold">{endpoint.latency}ms</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Error Rate</p>
                            <p className="font-semibold">{endpoint.errorRate}%</p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-500">
                          Last accessed: {new Date(endpoint.lastAccessed).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Shield className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {apiData.analytics.totalRequests.toLocaleString()}
                  </h3>
                  <p className="text-sm text-slate-600">Total Requests</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-green-600">{apiData.analytics.avgLatency}ms</h3>
                  <p className="text-sm text-slate-600">Avg Latency</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-orange-600">{apiData.analytics.errorRate}%</h3>
                  <p className="text-sm text-slate-600">Error Rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-2xl font-bold text-purple-600">{apiData.analytics.uptime}%</h3>
                  <p className="text-sm text-slate-600">Uptime</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top API Consumers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiData.analytics.topConsumers.map((consumer, index) => (
                    <div key={consumer.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{consumer.name}</p>
                          <p className="text-sm text-slate-500">{consumer.requests.toLocaleString()} requests</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{consumer.percentage}%</p>
                        <Progress value={consumer.percentage} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rate-limits" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Rate Limit Tiers</h3>
              <Button size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Create Tier
              </Button>
            </div>

            <div className="grid gap-4">
              {apiData.rateLimits.map((tier) => (
                <Card key={tier.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{tier.name}</h4>
                          <Badge className={getStatusColor(tier.status)}>{tier.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-slate-600">Rate Limit</p>
                            <p className="font-semibold">{tier.limit}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Burst Limit</p>
                            <p className="font-semibold">{tier.burst}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Active Clients</p>
                            <p className="font-semibold">{tier.clients}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Authentication Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>API Keys</span>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>OAuth 2.0</span>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>JWT Tokens</span>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>mTLS</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Security Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>IP Whitelisting</span>
                    <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CORS Protection</span>
                    <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Request Validation</span>
                    <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>DDoS Protection</span>
                    <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
