"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Eye, Zap, TrendingUp, Activity, Bell, Target, Database, Skull } from "lucide-react"

export function ThreatIntelligenceIntegration() {
  const [alertSettings, setAlertSettings] = useState({
    realTimeAlerts: true,
    emailNotifications: true,
    smsAlerts: false,
    slackIntegration: true,
    autoBlocking: true,
    threatHunting: true,
  })

  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")

  const threatFeeds = [
    {
      name: "MITRE ATT&CK",
      status: "active",
      lastUpdate: "2 minutes ago",
      threats: 1247,
      confidence: 98,
      coverage: "Tactics & Techniques",
    },
    {
      name: "CISA Known Exploited",
      status: "active",
      lastUpdate: "5 minutes ago",
      threats: 89,
      confidence: 99,
      coverage: "CVE Database",
    },
    {
      name: "VirusTotal",
      status: "active",
      lastUpdate: "1 minute ago",
      threats: 2341,
      confidence: 94,
      coverage: "Malware & IOCs",
    },
    {
      name: "Recorded Future",
      status: "active",
      lastUpdate: "3 minutes ago",
      threats: 567,
      confidence: 96,
      coverage: "Dark Web Intelligence",
    },
    {
      name: "CrowdStrike Falcon",
      status: "warning",
      lastUpdate: "15 minutes ago",
      threats: 234,
      confidence: 92,
      coverage: "Endpoint Threats",
    },
    {
      name: "IBM X-Force",
      status: "active",
      lastUpdate: "4 minutes ago",
      threats: 445,
      confidence: 95,
      coverage: "Global Threat Landscape",
    },
  ]

  const realtimeThreats = [
    {
      type: "Malware",
      severity: "critical",
      source: "VirusTotal",
      indicator: "suspicious-file.exe",
      confidence: 98,
      firstSeen: "2 minutes ago",
      affectedSystems: 0,
      action: "Blocked",
      description: "Known ransomware variant detected",
    },
    {
      type: "Phishing",
      severity: "high",
      source: "MITRE ATT&CK",
      indicator: "malicious-domain.com",
      confidence: 94,
      firstSeen: "8 minutes ago",
      affectedSystems: 3,
      action: "Quarantined",
      description: "Credential harvesting campaign",
    },
    {
      type: "APT Activity",
      severity: "critical",
      source: "Recorded Future",
      indicator: "192.168.1.100",
      confidence: 96,
      firstSeen: "12 minutes ago",
      affectedSystems: 1,
      action: "Investigating",
      description: "Advanced persistent threat indicators",
    },
    {
      type: "Vulnerability",
      severity: "medium",
      source: "CISA",
      indicator: "CVE-2024-1234",
      confidence: 99,
      firstSeen: "25 minutes ago",
      affectedSystems: 15,
      action: "Patch Available",
      description: "Remote code execution vulnerability",
    },
  ]

  const threatMetrics = [
    {
      metric: "Threats Detected",
      value: "1,247",
      change: "+12%",
      trend: "up",
      period: "24h",
    },
    {
      metric: "Blocked Attacks",
      value: "89",
      change: "-5%",
      trend: "down",
      period: "24h",
    },
    {
      metric: "False Positives",
      value: "23",
      change: "-18%",
      trend: "down",
      period: "24h",
    },
    {
      metric: "Response Time",
      value: "1.2s",
      change: "-25%",
      trend: "down",
      period: "avg",
    },
  ]

  const automatedActions = [
    {
      action: "IP Blocking",
      triggered: 45,
      success: 98,
      lastAction: "3 minutes ago",
      description: "Automatically block malicious IPs",
    },
    {
      action: "Domain Blacklisting",
      triggered: 23,
      success: 100,
      lastAction: "8 minutes ago",
      description: "Block access to malicious domains",
    },
    {
      action: "File Quarantine",
      triggered: 12,
      success: 95,
      lastAction: "15 minutes ago",
      description: "Isolate suspicious files",
    },
    {
      action: "User Notification",
      triggered: 67,
      success: 89,
      lastAction: "2 minutes ago",
      description: "Alert users of potential threats",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Eye className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">Threat Intelligence Integration</h2>
            <p className="text-sm text-slate-600">Real-time threat detection and automated response</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8">
            <Zap className="h-3 w-3 mr-2" />
            Force Sync
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Threat Metrics */}
        <Card className="col-span-12">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Threat Intelligence Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {threatMetrics.map((metric, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">{metric.metric}</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`h-3 w-3 ${metric.trend === "up" ? "text-red-500" : "text-green-500"}`} />
                      <span className={`text-xs ${metric.trend === "up" ? "text-red-600" : "text-green-600"}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900">{metric.value}</span>
                    <span className="text-xs text-slate-500">{metric.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Threat Feeds Status */}
        <Card className="col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4" />
              Intelligence Feeds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {threatFeeds.map((feed, index) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{feed.name}</span>
                    <Badge variant={feed.status === "active" ? "default" : "secondary"} className="text-xs">
                      {feed.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Threats:</span>
                      <span className="font-medium">{feed.threats.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span className="font-medium">{feed.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coverage:</span>
                      <span className="font-medium">{feed.coverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Update:</span>
                      <span>{feed.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert Settings */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alert Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(alertSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label className="text-xs font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, [key]: checked })}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Real-time Threats */}
        <Card className="col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Skull className="h-4 w-4" />
              Real-time Threat Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {realtimeThreats.map((threat, index) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getSeverityColor(threat.severity)}`}>{threat.severity}</Badge>
                      <span className="text-sm font-medium text-slate-700">{threat.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Confidence: {threat.confidence}%</span>
                      <Badge variant="outline" className="text-xs">
                        {threat.action}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{threat.description}</p>
                  <div className="grid grid-cols-4 gap-2 text-xs text-slate-500">
                    <div>
                      <span>Source: </span>
                      <span className="font-medium">{threat.source}</span>
                    </div>
                    <div>
                      <span>Indicator: </span>
                      <span className="font-medium font-mono">{threat.indicator}</span>
                    </div>
                    <div>
                      <span>Affected: </span>
                      <span className="font-medium">{threat.affectedSystems} systems</span>
                    </div>
                    <div>
                      <span>First Seen: </span>
                      <span className="font-medium">{threat.firstSeen}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Automated Actions */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Automated Response
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {automatedActions.map((action, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{action.action}</span>
                  <Badge variant="outline" className="text-xs">
                    {action.success}% success
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 mb-2">{action.description}</p>
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span>Triggered:</span>
                    <span className="font-medium">{action.triggered} times</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Action:</span>
                    <span>{action.lastAction}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
