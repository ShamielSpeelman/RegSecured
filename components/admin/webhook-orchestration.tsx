"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Webhook, Play, Pause, Settings, TrendingUp, Activity, GitBranch } from "lucide-react"

const webhookData = {
  endpoints: [
    {
      id: "compliance-alerts",
      name: "Compliance Alerts",
      url: "https://api.client.com/webhooks/compliance",
      events: ["compliance.violation", "compliance.resolved"],
      status: "active",
      successRate: 98.5,
      lastTriggered: "2024-01-15T10:30:00Z",
      totalDeliveries: 15420,
      failedDeliveries: 23,
      avgLatency: 145,
    },
    {
      id: "risk-notifications",
      name: "Risk Notifications",
      url: "https://risk.system.com/api/notifications",
      events: ["risk.high", "risk.critical"],
      status: "active",
      successRate: 99.2,
      lastTriggered: "2024-01-15T10:28:00Z",
      totalDeliveries: 8934,
      failedDeliveries: 7,
      avgLatency: 89,
    },
    {
      id: "user-events",
      name: "User Events",
      url: "https://analytics.platform.com/webhooks/users",
      events: ["user.created", "user.updated", "user.deleted"],
      status: "paused",
      successRate: 95.8,
      lastTriggered: "2024-01-15T09:45:00Z",
      totalDeliveries: 23456,
      failedDeliveries: 98,
      avgLatency: 234,
    },
  ],
  eventTypes: [
    { name: "compliance.violation", count: 1245, description: "Compliance violation detected" },
    { name: "compliance.resolved", count: 1198, description: "Compliance issue resolved" },
    { name: "risk.high", count: 567, description: "High risk alert triggered" },
    { name: "risk.critical", count: 89, description: "Critical risk alert" },
    { name: "user.created", count: 2345, description: "New user account created" },
    { name: "user.updated", count: 4567, description: "User profile updated" },
    { name: "document.processed", count: 8901, description: "Document processing completed" },
  ],
  workflows: [
    {
      id: "compliance-workflow",
      name: "Compliance Violation Workflow",
      triggers: ["compliance.violation"],
      steps: 4,
      status: "active",
      executions: 1245,
      successRate: 97.8,
    },
    {
      id: "risk-escalation",
      name: "Risk Escalation Workflow",
      triggers: ["risk.critical"],
      steps: 6,
      status: "active",
      executions: 89,
      successRate: 100,
    },
    {
      id: "user-onboarding",
      name: "User Onboarding Workflow",
      triggers: ["user.created"],
      steps: 8,
      status: "active",
      executions: 2345,
      successRate: 94.2,
    },
  ],
}

export function WebhookOrchestration() {
  const [selectedWebhook, setSelectedWebhook] = useState(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100"
      case "paused":
        return "text-orange-600 bg-orange-100"
      case "failed":
        return "text-red-600 bg-red-100"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 98) return "text-green-600"
    if (rate >= 95) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Webhook className="h-5 w-5 text-orange-600" />
          <CardTitle>Webhook Orchestration</CardTitle>
        </div>
        <CardDescription>Manage webhook endpoints, event routing, and automated workflows</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="events">Event Types</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="logs">Delivery Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Webhook Endpoints</h3>
              <Button size="sm">
                <Webhook className="h-4 w-4 mr-2" />
                Add Endpoint
              </Button>
            </div>

            <div className="grid gap-4">
              {webhookData.endpoints.map((webhook) => (
                <Card key={webhook.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{webhook.name}</h4>
                          <Badge className={getStatusColor(webhook.status)}>{webhook.status}</Badge>
                        </div>

                        <p className="text-sm text-slate-600 mb-3 font-mono break-all">{webhook.url}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-slate-600">Success Rate</p>
                            <p className={`text-lg font-semibold ${getSuccessRateColor(webhook.successRate)}`}>
                              {webhook.successRate}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Total Deliveries</p>
                            <p className="text-lg font-semibold">{webhook.totalDeliveries.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Failed</p>
                            <p className="text-lg font-semibold text-red-600">{webhook.failedDeliveries}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Avg Latency</p>
                            <p className="text-lg font-semibold">{webhook.avgLatency}ms</p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-500">
                          Last triggered: {new Date(webhook.lastTriggered).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {webhook.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <h3 className="text-lg font-semibold">Event Types</h3>

            <div className="grid gap-3">
              {webhookData.eventTypes.map((event) => (
                <Card key={event.name}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium font-mono">{event.name}</h4>
                          <Badge variant="outline">{event.count.toLocaleString()} events</Badge>
                        </div>
                        <p className="text-sm text-slate-600">{event.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Automated Workflows</h3>
              <Button size="sm">
                <GitBranch className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </div>

            <div className="grid gap-4">
              {webhookData.workflows.map((workflow) => (
                <Card key={workflow.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{workflow.name}</h4>
                          <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                          <Badge variant="outline">{workflow.steps} steps</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {workflow.triggers.map((trigger) => (
                            <Badge key={trigger} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-slate-600">Executions</p>
                            <p className="text-lg font-semibold">{workflow.executions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Success Rate</p>
                            <p className={`text-lg font-semibold ${getSuccessRateColor(workflow.successRate)}`}>
                              {workflow.successRate}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Steps</p>
                            <p className="text-lg font-semibold">{workflow.steps}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <div className="text-center py-8">
              <Activity className="h-12 w-12 mx-auto text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Delivery Logs</h3>
              <p className="text-slate-600">Real-time webhook delivery monitoring and debugging</p>
              <Button className="mt-4">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Live Logs
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
