"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Edit, Save, AlertCircle, Bell } from "lucide-react"
import { useState } from "react"

export default function ContactDetailsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    alternatePhone: "+1 (555) 987-6543",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    preferredContact: "email",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
  })

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  return (
    <DashboardLayout userRole="client">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/client">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Profile Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contact Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-slate-800 mb-2">Contact Details</h1>
              <p className="text-slate-600 font-light">Update your contact information and communication preferences</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <AlertCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Contact Info
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Email Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Information
              </CardTitle>
              <CardDescription>Your primary email address for account communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Primary Email Address *</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                  <Badge variant="outline" className="text-green-600 border-green-200 self-center">
                    Verified
                  </Badge>
                </div>
                {isEditing && (
                  <p className="text-xs text-slate-500">
                    Changing your email will require verification of the new address
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Phone Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Phone Information
              </CardTitle>
              <CardDescription>Your phone numbers for account verification and communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Primary Phone Number *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                    <Badge variant="outline" className="text-green-600 border-green-200 self-center">
                      Verified
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                  <Input
                    id="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </CardTitle>
              <CardDescription>Your current residential address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Communication Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Communication Preferences
              </CardTitle>
              <CardDescription>Choose how you'd like to receive communications from us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <Select
                  value={formData.preferredContact}
                  onValueChange={(value) => setFormData({ ...formData, preferredContact: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Preferences</h4>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-slate-500">Receive account updates via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-slate-500">Receive urgent alerts via SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={formData.smsNotifications}
                    onCheckedChange={(checked) => setFormData({ ...formData, smsNotifications: checked })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="securityAlerts">Security Alerts</Label>
                    <p className="text-sm text-slate-500">Important security notifications (recommended)</p>
                  </div>
                  <Switch
                    id="securityAlerts"
                    checked={formData.securityAlerts}
                    onCheckedChange={(checked) => setFormData({ ...formData, securityAlerts: checked })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails">Marketing Communications</Label>
                    <p className="text-sm text-slate-500">Product updates and promotional content</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={formData.marketingEmails}
                    onCheckedChange={(checked) => setFormData({ ...formData, marketingEmails: checked })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-amber-800">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">
                    Changes to email or phone number will require verification before taking effect.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
