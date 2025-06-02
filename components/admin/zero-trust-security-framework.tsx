"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Shield,
  Eye,
  Lock,
  Users,
  Network,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Zap,
  Globe,
} from "lucide-react"

export function ZeroTrustSecurityFramework() {
  const [verificationSettings, setVerificationSettings] = useState({
    continuousAuth: true,
    deviceTrust: true,
    networkSegmentation: true,
    dataEncryption: true,
    behaviorAnalysis: true,
    riskBasedAccess: true,
  })

  const securityPillars = [
    {
      name: "Identity Verification",
      status: "active",
      score: 94,
      lastVerified: "2 minutes ago",
      threats: 0,
      icon: Users,
      color: "green",
    },
    {
      name: "Device Trust",
      status: "active",
      score: 89,
      lastVerified: "5 minutes ago",
      threats: 2,
      icon: Lock,
      color: "green",
    },
    {
      name: "Network Security",
      status: "warning",
      score: 76,
      lastVerified: "12 minutes ago",
      threats: 5,
      icon: Network,
      color: "yellow",
    },
    {
      name: "Data Protection",
      status: "active",
      score: 97,
      lastVerified: "1 minute ago",
      threats: 0,
      icon: Shield,
      color: "green",
    },
    {
      name: "Application Security",
      status: "active",
      score: 91,
      lastVerified: "3 minutes ago",
      threats: 1,
      icon: Globe,
      color: "green",
    },
    {
      name: "Analytics & Visibility",
      status: "active",
      score: 88,
      lastVerified: "4 minutes ago",
      threats: 0,
      icon: Eye,
      color: "green",
    },
  ]

  const realtimeVerifications = [
    {
      user: "john.doe@acmecorp.com",
      action: "Document Access",
      riskScore: 12,
      status: "verified",
      timestamp: "2 seconds ago",
      factors: ["MFA", "Device Trust", "Location"],
    },
    {
      user: "sarah.wilson@fintech.com",
      action: "API Call",
      riskScore: 8,
      status: "verified",
      timestamp: "5 seconds ago",
      factors: ["Certificate", "IP Whitelist"],
    },
    {
      user: "mike.chen@crypto.io",
      action: "Data Export",
      riskScore: 45,
      status: "challenged",
      timestamp: "12 seconds ago",
      factors: ["Unusual Location", "High-Risk Action"],
    },
    {
      user: "system.integration",
      action: "Bulk Processing",
      riskScore: 3,
      status: "verified",
      timestamp: "18 seconds ago",
      factors: ["Service Account", "Scheduled"],
    },
  ]

  const threatDetections = [
    {
      type: "Anomalous Behavior",
      severity: "medium",
      description: "Unusual access pattern detected for user group",
      affected: 12,
      action: "Additional verification required",
      timestamp: "3 minutes ago",
    },
    {
      type: "Device Compromise",
      severity: "high",
      description: "Potentially compromised device attempting access",
      affected: 1,
      action: "Device quarantined",
      timestamp: "8 minutes ago",
    },
    {
      type: "Network Intrusion",
      severity: "critical",
      description: "Unauthorized network access attempt",
      affected: 0,
      action: "Access blocked, investigation initiated",
      timestamp: "15 minutes ago",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">Zero-Trust Security Framework</h2>
            <p className="text-sm text-slate-600">Continuous verification and adaptive security controls</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
            <Activity className="h-3 w-3 mr-1" />
            Active Monitoring
          </Badge>
          <Button size="sm" className="h-8">
            <Zap className="h-3 w-3 mr-2" />
            Force Re-verification
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Security Pillars Overview */}
        <Card className="col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Security Pillars Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {securityPillars.map((pillar, index) => {
                const IconComponent = pillar.icon
                return (
                  <div key={index} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-slate-600" />
                        <span className="text-xs font-medium text-slate-700">{pillar.name}</span>
                      </div>
                      {pillar.status === "active" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : pillar.status === "warning" ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Trust Score</span>
                        <span className="text-xs font-medium">{pillar.score}%</span>
                      </div>
                      <Progress value={pillar.score} className="h-1" />
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Last verified: {pillar.lastVerified}</span>
                        {pillar.threats > 0 && (
                          <Badge variant="destructive" className="text-xs h-4">
                            {pillar.threats} threats
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Verification Settings */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Verification Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(verificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label className="text-xs font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => setVerificationSettings({ ...verificationSettings, [key]: checked })}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Real-time Verifications */}
        <Card className="col-span-7">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Real-time Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {realtimeVerifications.map((verification, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-700">{verification.user}</span>
                      <Badge
                        variant={verification.status === "verified" ? "default" : "destructive"}
                        className="text-xs h-4"
                      >
                        {verification.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{verification.action}</span>
                      <span>Risk: {verification.riskScore}%</span>
                      <span>{verification.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {verification.factors.map((factor, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs h-4">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Progress value={100 - verification.riskScore} className="w-16 h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Threat Detections */}
        <Card className="col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Active Threat Detections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {threatDetections.map((threat, index) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{threat.type}</span>
                    <Badge
                      variant={
                        threat.severity === "critical"
                          ? "destructive"
                          : threat.severity === "high"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {threat.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{threat.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Affected: {threat.affected} users</span>
                    <span>{threat.timestamp}</span>
                  </div>
                  <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">Action: {threat.action}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
