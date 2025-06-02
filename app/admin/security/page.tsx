"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Key,
  Smartphone,
  Mail,
  Clock,
  Lock,
  RefreshCw,
  Save,
  CheckCircle2,
  Download,
  Upload,
  Settings,
  Database,
  Globe,
  Activity,
  Plus,
  Edit,
  RotateCcw,
} from "lucide-react"

export default function SecurityPage() {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [lastSaved, setLastSaved] = useState("2 minutes ago")

  // MFA Settings State
  const [mfaSettings, setMfaSettings] = useState({
    totpEnabled: true,
    smsEnabled: true,
    emailEnabled: false,
    hardwareTokenEnabled: true,
    backupCodesEnabled: true,
    emergencyBypassEnabled: false,
    enforcementByRole: {
      superadmin: true,
      admin: true,
      reviewer: false,
      analyst: false,
      relationshipManager: false,
      client: false,
    },
    emergencyBypassDuration: "24",
    backupCodeCount: "10",
  })

  // SSO Settings State
  const [ssoSettings, setSsoSettings] = useState({
    samlEnabled: true,
    oauthEnabled: true,
    adEnabled: false,
    autoProvisioning: true,
    sessionTimeout: "480",
    singleLogout: true,
    encryptAssertions: true,
    signRequests: true,
  })

  // Password Policy State
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: "12",
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventCommonPasswords: true,
    passwordExpiration: "90",
    passwordHistory: "12",
    maxFailedAttempts: "5",
    lockoutDuration: "30",
    resetTokenExpiration: "24",
  })

  // Session Management State
  const [sessionSettings, setSessionSettings] = useState({
    sessionTimeout: "30",
    idleTimeout: "15",
    maxConcurrentSessions: "3",
    deviceTrustEnabled: true,
    rememberDeviceDuration: "30",
    forceLogoutOnPolicyChange: true,
    sessionMonitoringEnabled: true,
  })

  // Encryption Settings State
  const [encryptionSettings, setEncryptionSettings] = useState({
    algorithm: "AES-256-GCM",
    keyRotationInterval: "90",
    hsmEnabled: false,
    keyEscrowEnabled: true,
    certificateAutoRenewal: true,
    certificateValidityPeriod: "365",
    encryptionAtRest: true,
    encryptionInTransit: true,
  })

  const [identityProviders, setIdentityProviders] = useState([
    {
      id: "1",
      name: "Corporate Azure AD",
      type: "SAML 2.0",
      status: "active",
      lastSync: "2 minutes ago",
      users: 1247,
    },
    {
      id: "2",
      name: "Google Workspace",
      type: "OAuth 2.0",
      status: "active",
      lastSync: "5 minutes ago",
      users: 89,
    },
    {
      id: "3",
      name: "Okta Enterprise",
      type: "SAML 2.0",
      status: "inactive",
      lastSync: "2 hours ago",
      users: 0,
    },
  ])

  const [encryptionKeys, setEncryptionKeys] = useState([
    {
      id: "1",
      name: "Primary Database Key",
      algorithm: "AES-256-GCM",
      status: "active",
      created: "2024-01-15",
      expires: "2024-04-15",
      rotationDue: false,
    },
    {
      id: "2",
      name: "Document Encryption Key",
      algorithm: "AES-256-GCM",
      status: "active",
      created: "2024-02-01",
      expires: "2024-05-01",
      rotationDue: true,
    },
    {
      id: "3",
      name: "API Token Signing Key",
      algorithm: "RSA-4096",
      status: "active",
      created: "2024-01-01",
      expires: "2025-01-01",
      rotationDue: false,
    },
  ])

  const [certificates, setCertificates] = useState([
    {
      id: "1",
      name: "SSL Certificate - *.regsecured.com",
      type: "TLS/SSL",
      issuer: "Let's Encrypt",
      status: "valid",
      expires: "2024-06-15",
      autoRenewal: true,
    },
    {
      id: "2",
      name: "SAML Signing Certificate",
      type: "SAML",
      issuer: "Internal CA",
      status: "valid",
      expires: "2024-12-31",
      autoRenewal: false,
    },
  ])

  const handleSave = async () => {
    setSaveStatus("saving")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaveStatus("saved")
    setLastSaved("Just now")
    setTimeout(() => setSaveStatus("idle"), 2000)
  }

  const generateBackupCodes = () => {
    // Simulate backup code generation
    const codes = Array.from({ length: 10 }, () => Math.random().toString(36).substring(2, 10).toUpperCase())
    alert(`Backup codes generated: ${codes.join(", ")}`)
  }

  const rotateKey = (keyId: string) => {
    setEncryptionKeys((prev) =>
      prev.map((key) =>
        key.id === keyId
          ? {
              ...key,
              created: new Date().toISOString().split("T")[0],
              expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              rotationDue: false,
            }
          : key,
      ),
    )
  }

  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/superadmin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">System Administration</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Security Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header with Save Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-slate-600" />
            <div>
              <h1 className="text-3xl font-light text-slate-800">Security Settings</h1>
              <p className="text-slate-600 font-light">Configure platform-wide security policies and controls</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">Last saved: {lastSaved}</span>
            <Button onClick={handleSave} disabled={saveStatus === "saving"} size="sm">
              {saveStatus === "saving" ? (
                <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
              ) : saveStatus === "saved" ? (
                <CheckCircle2 className="h-3 w-3 mr-2" />
              ) : (
                <Save className="h-3 w-3 mr-2" />
              )}
              {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Save Changes"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="authentication" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="authentication">Authentication & Access</TabsTrigger>
            <TabsTrigger value="policies">Security Policies</TabsTrigger>
            <TabsTrigger value="encryption">Encryption & Keys</TabsTrigger>
            <TabsTrigger value="monitoring">Security Monitoring</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Authentication & Access Tab */}
          <TabsContent value="authentication" className="space-y-6">
            {/* Multi-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Multi-Factor Authentication (MFA)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* MFA Methods */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Authentication Methods</h4>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-slate-500" />
                        <div>
                          <Label className="text-sm font-medium">TOTP Authenticator</Label>
                          <p className="text-xs text-slate-500">Google Authenticator, Authy, etc.</p>
                        </div>
                      </div>
                      <Switch
                        checked={mfaSettings.totpEnabled}
                        onCheckedChange={(checked) => setMfaSettings({ ...mfaSettings, totpEnabled: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <div>
                          <Label className="text-sm font-medium">SMS Authentication</Label>
                          <p className="text-xs text-slate-500">Text message verification</p>
                        </div>
                      </div>
                      <Switch
                        checked={mfaSettings.smsEnabled}
                        onCheckedChange={(checked) => setMfaSettings({ ...mfaSettings, smsEnabled: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <div>
                          <Label className="text-sm font-medium">Email Authentication</Label>
                          <p className="text-xs text-slate-500">Email verification codes</p>
                        </div>
                      </div>
                      <Switch
                        checked={mfaSettings.emailEnabled}
                        onCheckedChange={(checked) => setMfaSettings({ ...mfaSettings, emailEnabled: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-slate-500" />
                        <div>
                          <Label className="text-sm font-medium">Hardware Tokens</Label>
                          <p className="text-xs text-slate-500">YubiKey, FIDO2 devices</p>
                        </div>
                      </div>
                      <Switch
                        checked={mfaSettings.hardwareTokenEnabled}
                        onCheckedChange={(checked) => setMfaSettings({ ...mfaSettings, hardwareTokenEnabled: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Backup & Recovery</h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Backup Codes</Label>
                        <p className="text-xs text-slate-500">One-time recovery codes</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={mfaSettings.backupCodesEnabled}
                          onCheckedChange={(checked) => setMfaSettings({ ...mfaSettings, backupCodesEnabled: checked })}
                        />
                        <Button size="sm" variant="outline" onClick={generateBackupCodes}>
                          Generate
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Backup Code Count</Label>
                      <Select
                        value={mfaSettings.backupCodeCount}
                        onValueChange={(value) => setMfaSettings({ ...mfaSettings, backupCodeCount: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 codes</SelectItem>
                          <SelectItem value="10">10 codes</SelectItem>
                          <SelectItem value="15">15 codes</SelectItem>
                          <SelectItem value="20">20 codes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Emergency Bypass</Label>
                        <p className="text-xs text-slate-500">Temporary MFA bypass for emergencies</p>
                      </div>
                      <Switch
                        checked={mfaSettings.emergencyBypassEnabled}
                        onCheckedChange={(checked) =>
                          setMfaSettings({ ...mfaSettings, emergencyBypassEnabled: checked })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Emergency Bypass Duration (hours)</Label>
                      <Input
                        type="number"
                        value={mfaSettings.emergencyBypassDuration}
                        onChange={(e) => setMfaSettings({ ...mfaSettings, emergencyBypassDuration: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* MFA Enforcement by Role */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">MFA Enforcement by Role</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(mfaSettings.enforcementByRole).map(([role, enabled]) => (
                      <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <Label className="text-sm font-medium capitalize">
                            {role.replace(/([A-Z])/g, " $1").trim()}
                          </Label>
                          <p className="text-xs text-slate-500">{enabled ? "MFA Required" : "MFA Optional"}</p>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={(checked) =>
                            setMfaSettings({
                              ...mfaSettings,
                              enforcementByRole: {
                                ...mfaSettings.enforcementByRole,
                                [role]: checked,
                              },
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Single Sign-On Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Single Sign-On (SSO) Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* SSO Configuration */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">SSO Protocols</h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">SAML 2.0</Label>
                        <p className="text-xs text-slate-500">Security Assertion Markup Language</p>
                      </div>
                      <Switch
                        checked={ssoSettings.samlEnabled}
                        onCheckedChange={(checked) => setSsoSettings({ ...ssoSettings, samlEnabled: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">OAuth 2.0 / OpenID Connect</Label>
                        <p className="text-xs text-slate-500">Modern authentication protocol</p>
                      </div>
                      <Switch
                        checked={ssoSettings.oauthEnabled}
                        onCheckedChange={(checked) => setSsoSettings({ ...ssoSettings, oauthEnabled: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Active Directory</Label>
                        <p className="text-xs text-slate-500">LDAP/AD integration</p>
                      </div>
                      <Switch
                        checked={ssoSettings.adEnabled}
                        onCheckedChange={(checked) => setSsoSettings({ ...ssoSettings, adEnabled: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">SSO Settings</h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Auto User Provisioning</Label>
                        <p className="text-xs text-slate-500">Automatically create user accounts</p>
                      </div>
                      <Switch
                        checked={ssoSettings.autoProvisioning}
                        onCheckedChange={(checked) => setSsoSettings({ ...ssoSettings, autoProvisioning: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Single Logout (SLO)</Label>
                        <p className="text-xs text-slate-500">Logout from all connected services</p>
                      </div>
                      <Switch
                        checked={ssoSettings.singleLogout}
                        onCheckedChange={(checked) => setSsoSettings({ ...ssoSettings, singleLogout: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Encrypt SAML Assertions</Label>
                        <p className="text-xs text-slate-500">Encrypt SAML response data</p>
                      </div>
                      <Switch
                        checked={ssoSettings.encryptAssertions}
                        onCheckedChange={(checked) => setSsoSettings({ ...ssoSettings, encryptAssertions: checked })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">SSO Session Timeout (minutes)</Label>
                      <Input
                        type="number"
                        value={ssoSettings.sessionTimeout}
                        onChange={(e) => setSsoSettings({ ...ssoSettings, sessionTimeout: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Identity Providers */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-900">Identity Providers</h4>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Provider
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {identityProviders.map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              provider.status === "active" ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                          <div>
                            <div className="font-medium">{provider.name}</div>
                            <div className="text-sm text-slate-500">
                              {provider.type} • {provider.users} users • Last sync: {provider.lastSync}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={provider.status === "active" ? "default" : "secondary"}>
                            {provider.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Policies Tab */}
          <TabsContent value="policies" className="space-y-6">
            {/* Password Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Password Policy Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Password Requirements</h4>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Minimum Length</Label>
                      <Input
                        type="number"
                        value={passwordPolicy.minLength}
                        onChange={(e) => setPasswordPolicy({ ...passwordPolicy, minLength: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Require Uppercase Letters</Label>
                      <Switch
                        checked={passwordPolicy.requireUppercase}
                        onCheckedChange={(checked) =>
                          setPasswordPolicy({ ...passwordPolicy, requireUppercase: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Require Lowercase Letters</Label>
                      <Switch
                        checked={passwordPolicy.requireLowercase}
                        onCheckedChange={(checked) =>
                          setPasswordPolicy({ ...passwordPolicy, requireLowercase: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Require Numbers</Label>
                      <Switch
                        checked={passwordPolicy.requireNumbers}
                        onCheckedChange={(checked) => setPasswordPolicy({ ...passwordPolicy, requireNumbers: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Require Special Characters</Label>
                      <Switch
                        checked={passwordPolicy.requireSpecialChars}
                        onCheckedChange={(checked) =>
                          setPasswordPolicy({ ...passwordPolicy, requireSpecialChars: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Prevent Common Passwords</Label>
                      <Switch
                        checked={passwordPolicy.preventCommonPasswords}
                        onCheckedChange={(checked) =>
                          setPasswordPolicy({ ...passwordPolicy, preventCommonPasswords: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Password Lifecycle</h4>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Password Expiration (days)</Label>
                      <Input
                        type="number"
                        value={passwordPolicy.passwordExpiration}
                        onChange={(e) => setPasswordPolicy({ ...passwordPolicy, passwordExpiration: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Password History Count</Label>
                      <Input
                        type="number"
                        value={passwordPolicy.passwordHistory}
                        onChange={(e) => setPasswordPolicy({ ...passwordPolicy, passwordHistory: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Max Failed Attempts</Label>
                      <Input
                        type="number"
                        value={passwordPolicy.maxFailedAttempts}
                        onChange={(e) => setPasswordPolicy({ ...passwordPolicy, maxFailedAttempts: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Account Lockout Duration (minutes)</Label>
                      <Input
                        type="number"
                        value={passwordPolicy.lockoutDuration}
                        onChange={(e) => setPasswordPolicy({ ...passwordPolicy, lockoutDuration: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Reset Token Expiration (hours)</Label>
                      <Input
                        type="number"
                        value={passwordPolicy.resetTokenExpiration}
                        onChange={(e) => setPasswordPolicy({ ...passwordPolicy, resetTokenExpiration: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Session Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Session Configuration</h4>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Session Timeout (minutes)</Label>
                      <Input
                        type="number"
                        value={sessionSettings.sessionTimeout}
                        onChange={(e) => setSessionSettings({ ...sessionSettings, sessionTimeout: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Idle Timeout (minutes)</Label>
                      <Input
                        type="number"
                        value={sessionSettings.idleTimeout}
                        onChange={(e) => setSessionSettings({ ...sessionSettings, idleTimeout: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Max Concurrent Sessions</Label>
                      <Input
                        type="number"
                        value={sessionSettings.maxConcurrentSessions}
                        onChange={(e) =>
                          setSessionSettings({ ...sessionSettings, maxConcurrentSessions: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Force Logout on Policy Change</Label>
                        <p className="text-xs text-slate-500">Logout users when security policies change</p>
                      </div>
                      <Switch
                        checked={sessionSettings.forceLogoutOnPolicyChange}
                        onCheckedChange={(checked) =>
                          setSessionSettings({ ...sessionSettings, forceLogoutOnPolicyChange: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Device Trust & Monitoring</h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Device Trust Management</Label>
                        <p className="text-xs text-slate-500">Track and trust user devices</p>
                      </div>
                      <Switch
                        checked={sessionSettings.deviceTrustEnabled}
                        onCheckedChange={(checked) =>
                          setSessionSettings({ ...sessionSettings, deviceTrustEnabled: checked })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Remember Device Duration (days)</Label>
                      <Input
                        type="number"
                        value={sessionSettings.rememberDeviceDuration}
                        onChange={(e) =>
                          setSessionSettings({ ...sessionSettings, rememberDeviceDuration: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Session Monitoring</Label>
                        <p className="text-xs text-slate-500">Monitor active user sessions</p>
                      </div>
                      <Switch
                        checked={sessionSettings.sessionMonitoringEnabled}
                        onCheckedChange={(checked) =>
                          setSessionSettings({ ...sessionSettings, sessionMonitoringEnabled: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Encryption & Keys Tab */}
          <TabsContent value="encryption" className="space-y-6">
            {/* Encryption Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Encryption Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Encryption Settings</h4>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Default Encryption Algorithm</Label>
                      <Select
                        value={encryptionSettings.algorithm}
                        onValueChange={(value) => setEncryptionSettings({ ...encryptionSettings, algorithm: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AES-256-GCM">AES-256-GCM</SelectItem>
                          <SelectItem value="AES-256-CBC">AES-256-CBC</SelectItem>
                          <SelectItem value="ChaCha20-Poly1305">ChaCha20-Poly1305</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Key Rotation Interval (days)</Label>
                      <Input
                        type="number"
                        value={encryptionSettings.keyRotationInterval}
                        onChange={(e) =>
                          setEncryptionSettings({ ...encryptionSettings, keyRotationInterval: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Hardware Security Module (HSM)</Label>
                        <p className="text-xs text-slate-500">Use HSM for key management</p>
                      </div>
                      <Switch
                        checked={encryptionSettings.hsmEnabled}
                        onCheckedChange={(checked) =>
                          setEncryptionSettings({ ...encryptionSettings, hsmEnabled: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Key Escrow</Label>
                        <p className="text-xs text-slate-500">Backup encryption keys securely</p>
                      </div>
                      <Switch
                        checked={encryptionSettings.keyEscrowEnabled}
                        onCheckedChange={(checked) =>
                          setEncryptionSettings({ ...encryptionSettings, keyEscrowEnabled: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Data Protection</h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Encryption at Rest</Label>
                        <p className="text-xs text-slate-500">Encrypt stored data</p>
                      </div>
                      <Switch
                        checked={encryptionSettings.encryptionAtRest}
                        onCheckedChange={(checked) =>
                          setEncryptionSettings({ ...encryptionSettings, encryptionAtRest: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Encryption in Transit</Label>
                        <p className="text-xs text-slate-500">Encrypt data transmission</p>
                      </div>
                      <Switch
                        checked={encryptionSettings.encryptionInTransit}
                        onCheckedChange={(checked) =>
                          setEncryptionSettings({ ...encryptionSettings, encryptionInTransit: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Certificate Auto-Renewal</Label>
                        <p className="text-xs text-slate-500">Automatically renew SSL certificates</p>
                      </div>
                      <Switch
                        checked={encryptionSettings.certificateAutoRenewal}
                        onCheckedChange={(checked) =>
                          setEncryptionSettings({ ...encryptionSettings, certificateAutoRenewal: checked })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Certificate Validity Period (days)</Label>
                      <Input
                        type="number"
                        value={encryptionSettings.certificateValidityPeriod}
                        onChange={(e) =>
                          setEncryptionSettings({ ...encryptionSettings, certificateValidityPeriod: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Encryption Keys Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Encryption Keys
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Key
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {encryptionKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${key.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                        />
                        <div>
                          <div className="font-medium">{key.name}</div>
                          <div className="text-sm text-slate-500">
                            {key.algorithm} • Created: {key.created} • Expires: {key.expires}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {key.rotationDue && <Badge variant="destructive">Rotation Due</Badge>}
                        <Badge variant={key.status === "active" ? "default" : "secondary"}>{key.status}</Badge>
                        <Button size="sm" variant="outline" onClick={() => rotateKey(key.id)}>
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificate Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    SSL/TLS Certificates
                  </div>
                  <Button size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Certificate
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${cert.status === "valid" ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <div>
                          <div className="font-medium">{cert.name}</div>
                          <div className="text-sm text-slate-500">
                            {cert.type} • Issuer: {cert.issuer} • Expires: {cert.expires}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={cert.status === "valid" ? "default" : "destructive"}>{cert.status}</Badge>
                        {cert.autoRenewal && <Badge variant="secondary">Auto-Renewal</Badge>}
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Security Monitoring & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Security Monitoring Dashboard</h3>
                  <p className="text-slate-600 mb-4">
                    Real-time security monitoring, threat detection, and incident response capabilities.
                  </p>
                  <Button>Configure Monitoring</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Compliance Framework</h3>
                  <p className="text-slate-600 mb-4">
                    Security compliance tracking, audit trails, and regulatory reporting.
                  </p>
                  <Button>Configure Compliance</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
