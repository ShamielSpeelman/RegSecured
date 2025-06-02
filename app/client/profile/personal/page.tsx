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
import { Badge } from "@/components/ui/badge"
import { User, Edit, Save, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function PersonalInformationPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    middleName: "",
    dateOfBirth: "1985-06-15",
    nationality: "US",
    countryOfBirth: "United States",
    placeOfBirth: "New York, NY",
    gender: "male",
    maritalStatus: "married",
    occupation: "Software Engineer",
    employer: "Tech Corp Inc.",
    taxId: "***-**-1234",
    passportNumber: "***456789",
    driverLicense: "***789123",
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
              <BreadcrumbPage>Personal Information</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-slate-800 mb-2">Personal Information</h1>
              <p className="text-slate-600 font-light">Manage your personal information and profile details</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <AlertCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Information
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
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Your basic personal details as they appear on official documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Select
                    value={formData.nationality}
                    onValueChange={(value) => setFormData({ ...formData, nationality: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Birth Information */}
          <Card>
            <CardHeader>
              <CardTitle>Birth Information</CardTitle>
              <CardDescription>Details about your place of birth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="countryOfBirth">Country of Birth *</Label>
                  <Input
                    id="countryOfBirth"
                    value={formData.countryOfBirth}
                    onChange={(e) => setFormData({ ...formData, countryOfBirth: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                  <Input
                    id="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Information</CardTitle>
              <CardDescription>Your current employment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer *</Label>
                  <Input
                    id="employer"
                    value={formData.employer}
                    onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Identification Numbers */}
          <Card>
            <CardHeader>
              <CardTitle>Identification Numbers</CardTitle>
              <CardDescription>Official identification numbers (partially masked for security)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / SSN</Label>
                  <Input id="taxId" value={formData.taxId} disabled className="bg-slate-50" />
                  <p className="text-xs text-slate-500">Contact support to update</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input id="passportNumber" value={formData.passportNumber} disabled className="bg-slate-50" />
                  <p className="text-xs text-slate-500">Contact support to update</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverLicense">Driver's License</Label>
                  <Input id="driverLicense" value={formData.driverLicense} disabled className="bg-slate-50" />
                  <p className="text-xs text-slate-500">Contact support to update</p>
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
                    Changes to personal information may require additional verification and could affect your account
                    status.
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
