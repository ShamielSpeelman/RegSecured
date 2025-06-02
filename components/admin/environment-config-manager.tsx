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
import { Textarea } from "@/components/ui/textarea"
import { Server, Database, Shield, Monitor, Copy, RefreshCw, CheckCircle2, Clock, Zap, Globe } from "lucide-react"

interface Environment {
  id: string
  name: string
  type: "development" | "staging" | "production"
  status: "healthy" | "warning" | "error"
  url: string
  lastDeployment: string
  version: string
  uptime: string
  resources: {
    cpu: number
    memory: number
    storage: number
  }
}

export function EnvironmentConfigManager() {
  const [selectedEnvironment, setSelectedEnvironment] = useState("production")

  const environments: Environment[] = [
    {
      id: "env-prod",
      name: "Production",
      type: "production",
      status: "healthy",
      url: "https://app.regsecured.com",
      lastDeployment: "2024-01-22 14:30",
      version: "v2.1.4",
      uptime: "99.9%",
      resources: { cpu: 45, memory: 62, storage: 78 },
    },
    {
      id: "env-staging",
      name: "Staging",
      type: "staging",
      status: "healthy",
      url: "https://staging.regsecured.com",
      lastDeployment: "2024-01-23 09:15",
      version: "v2.2.0-rc1",
      uptime: "99.5%",
      resources: { cpu: 32, memory: 48, storage: 45 },
    },
    {
      id: "env-dev",
      name: "Development",
      type: "development",
      status: "warning",
      url: "https://dev.regsecured.com",
      lastDeployment: "2024-01-23 16:45",
      version: "v2.2.0-dev",
      uptime: "98.2%",
      resources: { cpu: 28, memory: 35, storage: 23 },
    },
  ]

  const currentEnv = environments.find((env) => env.type === selectedEnvironment) || environments[0]

  const [envConfig, setEnvConfig] = useState({
    apiRateLimit: "1000",
    maxConcurrentUsers: "500",
    sessionTimeout: "30",
    enableDebugMode: selectedEnvironment !== "production",
    enableMetrics: true,
    logLevel: selectedEnvironment === "production" ? "error" : "debug",
    cacheTimeout: "3600",
    databasePoolSize: "20",
    enableSsl: true,
    corsOrigins: "https://app.regsecured.com",
    webhookTimeout: "30",
    fileUploadLimit: "50",
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Server className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">Environment Configuration</h2>
            <p className="text-sm text-slate-600">Manage settings across development, staging, and production</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
            <SelectTrigger className="w-48 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="development">Development</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8">
            <Copy className="h-3 w-3 mr-2" />
            Clone Config
          </Button>
        </div>
      </div>

      {/* Environment Status Overview */}
      <div className="grid grid-cols-3 gap-4">
        {environments.map((env) => (
          <Card
            key={env.id}
            className={`cursor-pointer transition-all ${
              selectedEnvironment === env.type ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedEnvironment(env.type)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      env.status === "healthy"
                        ? "bg-green-500"
                        : env.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <h3 className="font-medium text-slate-900">{env.name}</h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  {env.version}
                </Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Uptime</span>
                  <span className="text-slate-900">{env.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">CPU</span>
                  <span className="text-slate-900">{env.resources.cpu}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Memory</span>
                  <span className="text-slate-900">{env.resources.memory}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Last Deploy</span>
                  <span className="text-slate-900">{env.lastDeployment}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="application" className="space-y-4">
        <TabsList className="grid w-fit grid-cols-4 bg-slate-50">
          <TabsTrigger value="application" className="text-xs">
            Application
          </TabsTrigger>
          <TabsTrigger value="database" className="text-xs">
            Database
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs">
            Security
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="text-xs">
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="application" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Performance Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Performance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit" className="text-xs font-medium">
                      API Rate Limit (req/min)
                    </Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      value={envConfig.apiRateLimit}
                      onChange={(e) => setEnvConfig({ ...envConfig, apiRateLimit: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxUsers" className="text-xs font-medium">
                      Max Concurrent Users
                    </Label>
                    <Input
                      id="maxUsers"
                      type="number"
                      value={envConfig.maxConcurrentUsers}
                      onChange={(e) => setEnvConfig({ ...envConfig, maxConcurrentUsers: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout" className="text-xs font-medium">
                      Session Timeout (min)
                    </Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={envConfig.sessionTimeout}
                      onChange={(e) => setEnvConfig({ ...envConfig, sessionTimeout: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cacheTimeout" className="text-xs font-medium">
                      Cache Timeout (sec)
                    </Label>
                    <Input
                      id="cacheTimeout"
                      type="number"
                      value={envConfig.cacheTimeout}
                      onChange={(e) => setEnvConfig({ ...envConfig, cacheTimeout: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logLevel" className="text-xs font-medium">
                    Log Level
                  </Label>
                  <Select
                    value={envConfig.logLevel}
                    onValueChange={(value) => setEnvConfig({ ...envConfig, logLevel: value })}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-medium">Debug Mode</Label>
                    <p className="text-xs text-slate-500">Enable detailed error reporting</p>
                  </div>
                  <Switch
                    checked={envConfig.enableDebugMode}
                    onCheckedChange={(checked) => setEnvConfig({ ...envConfig, enableDebugMode: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Network & Integration */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Network & Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="corsOrigins" className="text-xs font-medium">
                    CORS Origins
                  </Label>
                  <Textarea
                    id="corsOrigins"
                    value={envConfig.corsOrigins}
                    onChange={(e) => setEnvConfig({ ...envConfig, corsOrigins: e.target.value })}
                    className="h-20 text-sm resize-none"
                    placeholder="https://app.regsecured.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhookTimeout" className="text-xs font-medium">
                      Webhook Timeout (sec)
                    </Label>
                    <Input
                      id="webhookTimeout"
                      type="number"
                      value={envConfig.webhookTimeout}
                      onChange={(e) => setEnvConfig({ ...envConfig, webhookTimeout: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fileUploadLimit" className="text-xs font-medium">
                      File Upload Limit (MB)
                    </Label>
                    <Input
                      id="fileUploadLimit"
                      type="number"
                      value={envConfig.fileUploadLimit}
                      onChange={(e) => setEnvConfig({ ...envConfig, fileUploadLimit: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-medium">SSL/TLS Encryption</Label>
                    <p className="text-xs text-slate-500">Force HTTPS connections</p>
                  </div>
                  <Switch
                    checked={envConfig.enableSsl}
                    onCheckedChange={(checked) => setEnvConfig({ ...envConfig, enableSsl: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-medium">Metrics Collection</Label>
                    <p className="text-xs text-slate-500">Enable performance monitoring</p>
                  </div>
                  <Switch
                    checked={envConfig.enableMetrics}
                    onCheckedChange={(checked) => setEnvConfig({ ...envConfig, enableMetrics: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="h-4 w-4" />
                Database Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <Database className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">Database connection and optimization settings</p>
                <p className="text-xs mt-1">Configure connection pools, timeouts, and performance parameters</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <Shield className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">Security policies and access controls</p>
                <p className="text-xs mt-1">Manage authentication, authorization, and security headers</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Monitoring & Alerting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <Monitor className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">System monitoring and alert configuration</p>
                <p className="text-xs mt-1">Set up health checks, alerts, and performance thresholds</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="h-4 w-4" />
          <span>Last saved: 2 minutes ago</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <RefreshCw className="h-3 w-3 mr-2" />
            Reset to Defaults
          </Button>
          <Button size="sm" className="h-8">
            <CheckCircle2 className="h-3 w-3 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  )
}
