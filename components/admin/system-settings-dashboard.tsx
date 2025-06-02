"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Database, Shield, Bell, Save, RefreshCw, CheckCircle2 } from "lucide-react"

export function SystemSettingsDashboard() {
  const [settings, setSettings] = useState({
    platformName: "RegSecured",
    defaultTimezone: "UTC",
    sessionTimeout: "30",
    maxFileSize: "50",
    enableAuditLogging: true,
    enableRealTimeSync: true,
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    defaultLanguage: "en",
    dataRetentionDays: "2555", // 7 years
    backupFrequency: "daily",
    encryptionLevel: "AES-256",
  })

  const [lastSaved, setLastSaved] = useState("2 minutes ago")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const handleSave = async () => {
    setSaveStatus("saving")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaveStatus("saved")
    setLastSaved("Just now")
    setTimeout(() => setSaveStatus("idle"), 2000)
  }

  const systemHealth = [
    { metric: "Database", status: "healthy", value: "99.9% uptime" },
    { metric: "API Gateway", status: "healthy", value: "< 50ms avg" },
    { metric: "Storage", status: "warning", value: "78% capacity" },
    { metric: "Cache", status: "healthy", value: "Hit rate 94%" },
  ]

  return (
    <div className="space-y-6">
      {/* Header with Save Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="h-5 w-5 text-slate-600" />
          <div>
            <h2 className="text-lg font-medium text-slate-900">System Settings</h2>
            <p className="text-sm text-slate-600">Configure platform-wide settings and preferences</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Last saved: {lastSaved}</span>
          <Button onClick={handleSave} disabled={saveStatus === "saving"} size="sm" className="h-8">
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

      <div className="grid grid-cols-12 gap-6">
        {/* System Health Overview */}
        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemHealth.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.status === "healthy"
                        ? "bg-green-500"
                        : item.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm text-slate-700">{item.metric}</span>
                </div>
                <span className="text-xs text-slate-500">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Core Platform Settings */}
        <Card className="col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Core Platform Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platformName" className="text-xs font-medium">
                  Platform Name
                </Label>
                <Input
                  id="platformName"
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultTimezone" className="text-xs font-medium">
                  Default Timezone
                </Label>
                <Select
                  value={settings.defaultTimezone}
                  onValueChange={(value) => setSettings({ ...settings, defaultTimezone: value })}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                    <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout" className="text-xs font-medium">
                  Session Timeout (min)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxFileSize" className="text-xs font-medium">
                  Max File Size (MB)
                </Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value })}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataRetention" className="text-xs font-medium">
                  Data Retention (days)
                </Label>
                <Input
                  id="dataRetention"
                  type="number"
                  value={settings.dataRetentionDays}
                  onChange={(e) => setSettings({ ...settings, dataRetentionDays: e.target.value })}
                  className="h-8 text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Compliance */}
        <Card className="col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs font-medium">Audit Logging</Label>
                <p className="text-xs text-slate-500">Track all system activities</p>
              </div>
              <Switch
                checked={settings.enableAuditLogging}
                onCheckedChange={(checked) => setSettings({ ...settings, enableAuditLogging: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs font-medium">Real-time Sync</Label>
                <p className="text-xs text-slate-500">Enable live data synchronization</p>
              </div>
              <Switch
                checked={settings.enableRealTimeSync}
                onCheckedChange={(checked) => setSettings({ ...settings, enableRealTimeSync: checked })}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs font-medium">Encryption Level</Label>
              <Select
                value={settings.encryptionLevel}
                onValueChange={(value) => setSettings({ ...settings, encryptionLevel: value })}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AES-128">AES-128</SelectItem>
                  <SelectItem value="AES-256">AES-256</SelectItem>
                  <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Backup Frequency</Label>
              <Select
                value={settings.backupFrequency}
                onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Communication */}
        <Card className="col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications & Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs font-medium">Email Notifications</Label>
                <p className="text-xs text-slate-500">System alerts via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs font-medium">SMS Notifications</Label>
                <p className="text-xs text-slate-500">Critical alerts via SMS</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs font-medium">Default Language</Label>
              <Select
                value={settings.defaultLanguage}
                onValueChange={(value) => setSettings({ ...settings, defaultLanguage: value })}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs font-medium">Maintenance Mode</Label>
                <p className="text-xs text-slate-500">Restrict platform access</p>
              </div>
              <div className="flex items-center gap-2">
                {settings.maintenanceMode && (
                  <Badge variant="destructive" className="text-xs">
                    Active
                  </Badge>
                )}
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
