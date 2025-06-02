"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Upload,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Building,
  User,
  Users,
  Shield,
  Settings,
} from "lucide-react"
import type { EntityType } from "@/lib/types/entities"
import { FormOrchestrator } from "@/lib/form-orchestration/form-orchestrator"
import { DocumentRequirementsEngine } from "@/lib/document-definitions/document-requirements"

// Get client profile from localStorage or use defaults
const getClientProfile = () => {
  if (typeof window === "undefined") return null

  const savedProfile = localStorage.getItem("clientProfile")
  if (savedProfile) {
    return JSON.parse(savedProfile)
  }

  return null // Return null if no profile exists
}

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

const getDaysRemaining = (dateString: string) => {
  const deadline = new Date(dateString)
  const today = new Date()
  const diffTime = deadline.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      )
    case "in-progress":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const getEntityIcon = (entityType: EntityType) => {
  switch (entityType) {
    case "individual":
      return User
    case "legal-entity":
      return Building
    case "trust":
      return Shield
    case "foundation":
      return Users
    default:
      return Building
  }
}

const getEntityDisplayName = (entityType: EntityType) => {
  switch (entityType) {
    case "individual":
      return "Individual"
    case "legal-entity":
      return "Legal Entity"
    case "trust":
      return "Trust"
    case "foundation":
      return "Foundation"
    default:
      return "Entity"
  }
}

export default function ClientDashboard() {
  const router = useRouter()
  const [clientProfile, setClientProfile] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [workflowMetrics, setWorkflowMetrics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const profile = getClientProfile()

    // If no profile exists or profile setup is not complete, redirect to entity selection
    if (!profile || !profile.profileSetupComplete) {
      router.push("/client/onboarding/entity-selection")
      return
    }

    setClientProfile(profile)

    if (profile) {
      // Calculate workflow metrics
      const workflowProgress = FormOrchestrator.getWorkflowProgress(
        profile.completedForms || [],
        profile.entityType,
        profile.scenario,
        profile.role,
      )

      const requiredDocuments = DocumentRequirementsEngine.getRequiredDocuments(
        profile.entityType,
        profile.scenario,
        profile.role,
        profile.jurisdiction,
      )

      setWorkflowMetrics({
        formProgress: workflowProgress.progress,
        nextForms: workflowProgress.nextForms,
        completedForms: workflowProgress.completedCount,
        totalForms: workflowProgress.totalCount,
        requiredDocuments: requiredDocuments.length,
        pendingDocuments: requiredDocuments.filter((doc: any) => doc.required).length,
      })
    }

    setIsLoading(false)
  }, [router])

  const handleSetupProfile = () => {
    router.push("/client/onboarding/entity-selection")
  }

  const handleContinueOnboarding = () => {
    router.push("/client/onboarding/forms")
  }

  const handleChangeEntityType = () => {
    router.push("/client/onboarding/entity-selection")
  }

  if (isLoading) {
    return (
      <DashboardLayout userRole="client">
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // If no profile, show setup screen
  if (!clientProfile) {
    return (
      <DashboardLayout userRole="client">
        <div className="p-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-light text-slate-800 mb-2">Welcome to RegSecured</h1>
              <p className="text-slate-600 font-light">Let's get started by setting up your entity profile</p>
            </div>

            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Profile Setup Required</CardTitle>
                <CardDescription>
                  Before you can access your dashboard, we need to set up your entity profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-left">
                    <h4 className="font-medium text-slate-800 mb-2">What we'll need:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Your entity type (Individual, Legal Entity, Trust, etc.)</li>
                      <li>• Your onboarding scenario (Direct client, Representative, etc.)</li>
                      <li>• Basic entity information</li>
                    </ul>
                  </div>
                  <div className="pt-4">
                    <Button onClick={handleSetupProfile} size="lg">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Set Up Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const daysRemaining = getDaysRemaining(clientProfile.onboardingDeadline)
  const EntityIcon = getEntityIcon(clientProfile.entityType)

  return (
    <DashboardLayout userRole="client">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <EntityIcon className="h-6 w-6 text-slate-600" />
                <h1 className="text-3xl font-light text-slate-800">{clientProfile.entityName}</h1>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-slate-600 font-light">ID: {clientProfile.entityId}</p>
                <Badge variant="outline" className="text-xs">
                  {getEntityDisplayName(clientProfile.entityType)}
                </Badge>
                {getStatusBadge(clientProfile.onboardingStatus)}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm" onClick={handleChangeEntityType}>
                <Settings className="h-4 w-4 mr-2" />
                Change Entity Type
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Manager
              </Button>
              <Button size="sm" onClick={handleContinueOnboarding}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Continue Onboarding
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6 border-stone-200/50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-medium text-slate-800">Onboarding Progress</h2>
                <p className="text-sm text-slate-600">
                  {workflowMetrics?.formProgress || clientProfile.onboardingProgress}% complete • Deadline:{" "}
                  {formatDate(clientProfile.onboardingDeadline)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium">
                  {daysRemaining} {daysRemaining === 1 ? "day" : "days"} remaining
                </span>
              </div>
            </div>
            <Progress value={workflowMetrics?.formProgress || clientProfile.onboardingProgress} className="h-2" />
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-stone-200/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Completed Forms</p>
                      <p className="text-2xl font-semibold text-slate-800">
                        {workflowMetrics?.completedForms || 0}
                        <span className="text-sm font-normal text-slate-500">/{workflowMetrics?.totalForms || 0}</span>
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-emerald-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Pending Documents</p>
                      <p className="text-2xl font-semibold text-slate-800">{workflowMetrics?.pendingDocuments || 0}</p>
                    </div>
                    <Upload className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Next Actions</p>
                      <p className="text-2xl font-semibold text-slate-800">{workflowMetrics?.nextForms?.length || 0}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Messages</p>
                      <p className="text-2xl font-semibold text-slate-800">
                        {clientProfile.unreadMessages + clientProfile.unreadNotifications}
                      </p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Actions */}
            {workflowMetrics?.nextForms && workflowMetrics.nextForms.length > 0 && (
              <Card className="border-stone-200/50">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Next Actions Required</CardTitle>
                  <CardDescription>Complete these items to continue your onboarding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflowMetrics.nextForms.slice(0, 3).map((form: any) => (
                      <div key={form.id} className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-slate-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-800">{form.title}</p>
                            <p className="text-sm text-slate-600">{form.description}</p>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <a href={`/client/onboarding/forms?form=${form.id}`}>Complete</a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Entity Information */}
            <Card className="border-stone-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Entity Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Entity Type</p>
                      <p className="text-sm text-slate-800">{getEntityDisplayName(clientProfile.entityType)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Onboarding Scenario</p>
                      <p className="text-sm text-slate-800 capitalize">{clientProfile.scenario?.replace("-", " ")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Jurisdiction</p>
                      <p className="text-sm text-slate-800 uppercase">{clientProfile.jurisdiction}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Risk Rating</p>
                      <Badge
                        className={
                          clientProfile.riskRating === "high"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : clientProfile.riskRating === "medium"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-green-100 text-green-800 border-green-200"
                        }
                      >
                        {clientProfile.riskRating?.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Last Activity</p>
                      <p className="text-sm text-slate-800">
                        {new Date(clientProfile.lastActivity).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Relationship Manager */}
            <Card className="border-stone-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Your Relationship Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-slate-600">
                        {clientProfile.relationshipManager
                          ?.split(" ")
                          ?.map((n: string) => n[0])
                          ?.join("") || "RM"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{clientProfile.relationshipManager}</p>
                      <p className="text-sm text-slate-600">Available Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-stone-200/50">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Required Forms</CardTitle>
                  <CardDescription>Forms needed to complete your onboarding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflowMetrics?.nextForms?.slice(0, 3).map((form: any) => (
                      <div key={form.id} className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-slate-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-800">{form.title}</p>
                            <p className="text-sm text-slate-600">{form.description}</p>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <a href={`/client/onboarding/forms?form=${form.id}`}>Complete</a>
                        </Button>
                      </div>
                    )) || (
                      <p className="text-sm text-slate-600 text-center py-4">All required forms have been completed!</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-stone-200/50">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Required Documents</CardTitle>
                  <CardDescription>Documents needed to complete your onboarding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Upload className="h-5 w-5 text-slate-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-800">Corporate Documents</p>
                          <p className="text-sm text-slate-600">
                            {workflowMetrics?.pendingDocuments || 0} documents pending upload
                          </p>
                        </div>
                      </div>
                      <Button size="sm" asChild>
                        <a href="/client/onboarding/documents">Upload</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-stone-200/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Onboarding Progress</CardTitle>
                <CardDescription>Step-by-step progress of your application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l border-slate-200 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-white">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Profile Setup Completed</p>
                      <p className="text-xs text-slate-500">{formatDate(clientProfile.createdAt)}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Your {getEntityDisplayName(clientProfile.entityType).toLowerCase()} profile has been created.
                      </p>
                    </div>
                  </div>

                  {clientProfile.completedForms?.includes("company-information") && (
                    <div className="relative">
                      <div className="absolute -left-[25px] p-1 rounded-full bg-white">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Company Information Completed</p>
                        <p className="text-xs text-slate-500">May 12, 2025</p>
                        <p className="text-sm text-slate-600 mt-1">
                          Basic company information has been successfully submitted.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute -left-[25px] p-1 rounded-full bg-white">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Document Collection In Progress</p>
                      <p className="text-xs text-slate-500">Current</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Collecting required documents for your{" "}
                        {getEntityDisplayName(clientProfile.entityType).toLowerCase()}.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
