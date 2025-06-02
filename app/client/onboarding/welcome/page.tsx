"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  ArrowRight,
  FileText,
  Upload,
  Shield,
  Clock,
  User,
  Building,
  Heart,
  TrendingUp,
} from "lucide-react"
import type { EntityType, OnboardingScenario } from "@/lib/types/entities"

// Get client profile
const getClientProfile = () => {
  if (typeof window === "undefined") return null
  const savedProfile = localStorage.getItem("clientProfile")
  return savedProfile ? JSON.parse(savedProfile) : null
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
      return Heart
    case "investment-fund":
      return TrendingUp
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
    case "investment-fund":
      return "Investment Fund"
    default:
      return "Entity"
  }
}

const getScenarioDisplayName = (scenario: OnboardingScenario) => {
  switch (scenario) {
    case "direct-client":
      return "Direct Application"
    case "representative-acting":
      return "Representative Acting"
    case "administrative-onboarding":
      return "Administrative Company"
    case "trust-structure":
      return "Trust Structure Setup"
    case "investment-structure":
      return "Investment Structure"
    case "complex-ownership":
      return "Complex Ownership Structure"
    default:
      return "Standard Onboarding"
  }
}

export default function WelcomePage() {
  const router = useRouter()
  const [clientProfile, setClientProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const profile = getClientProfile()
    if (!profile || !profile.profileSetupComplete) {
      // Redirect to entity selection if no profile exists
      router.push("/client/onboarding/entity-selection")
      return
    }
    setClientProfile(profile)
    setIsLoading(false)
  }, [router])

  const handleContinueOnboarding = () => {
    router.push("/client/onboarding/forms")
  }

  const handleGoToDashboard = () => {
    router.push("/client/dashboard")
  }

  const handleChangeEntityType = () => {
    router.push("/client/onboarding/entity-selection")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!clientProfile) {
    return null // Will redirect to entity selection
  }

  const EntityIcon = getEntityIcon(clientProfile.entityType)
  const nextSteps = [
    {
      id: "forms",
      title: "Complete Required Forms",
      description: "Fill out forms specific to your entity type and scenario",
      icon: FileText,
      status: clientProfile.completedForms?.length > 0 ? "in-progress" : "pending",
      href: "/client/onboarding/forms",
    },
    {
      id: "documents",
      title: "Upload Documents",
      description: "Provide required documentation for verification",
      icon: Upload,
      status: "pending",
      href: "/client/onboarding/documents",
    },
    {
      id: "review",
      title: "Review & Submit",
      description: "Final review of your application before submission",
      icon: CheckCircle,
      status: "pending",
      href: "/client/onboarding/review",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <EntityIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-light text-slate-800 mb-2">Welcome to RegSecured</h1>
          <p className="text-slate-600 font-light">
            Your {getEntityDisplayName(clientProfile.entityType).toLowerCase()} profile has been created successfully
          </p>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8 border-stone-200/70">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Profile Setup Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Entity Type</p>
                <div className="flex items-center gap-2">
                  <EntityIcon className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-800">{getEntityDisplayName(clientProfile.entityType)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Onboarding Scenario</p>
                <span className="text-sm text-slate-800">{getScenarioDisplayName(clientProfile.scenario)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Jurisdiction</p>
                <span className="text-sm text-slate-800 uppercase">{clientProfile.jurisdiction}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-200">
              <Button variant="outline" size="sm" onClick={handleChangeEntityType}>
                Change Entity Type
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="mb-8 border-stone-200/70">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Onboarding Progress</CardTitle>
            <CardDescription>Complete these steps to finish your application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>Overall Progress</span>
                <span>{clientProfile.onboardingProgress}% complete</span>
              </div>
              <Progress value={clientProfile.onboardingProgress} className="h-2" />
            </div>
            <div className="text-sm text-slate-600">
              <Clock className="h-4 w-4 inline mr-1" />
              Deadline:{" "}
              {new Date(clientProfile.onboardingDeadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 border-stone-200/70">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Next Steps</CardTitle>
            <CardDescription>Follow these steps to complete your onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = step.status === "completed"
                const isInProgress = step.status === "in-progress"
                const isPending = step.status === "pending"

                return (
                  <div key={step.id} className="flex items-center gap-4 p-4 rounded-lg border border-stone-200">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${
                          isCompleted
                            ? "bg-green-100 text-green-600"
                            : isInProgress
                              ? "bg-blue-100 text-blue-600"
                              : "bg-slate-100 text-slate-400"
                        }
                      `}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <Icon className="h-5 w-5 text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{step.title}</h4>
                      <p className="text-sm text-slate-600">{step.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          isCompleted
                            ? "bg-green-100 text-green-800 border-green-200"
                            : isInProgress
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                        }
                      >
                        {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Pending"}
                      </Badge>
                      {!isCompleted && (
                        <Button size="sm" asChild>
                          <a href={step.href}>
                            {isInProgress ? "Continue" : "Start"}
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={handleContinueOnboarding}>
            <ArrowRight className="h-4 w-4 mr-2" />
            Continue Onboarding
          </Button>
          <Button variant="outline" size="lg" onClick={handleGoToDashboard}>
            Go to Dashboard
          </Button>
        </div>

        {/* Support */}
        <Card className="mt-8 border-stone-200/70">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-medium text-slate-800 mb-2">Need Help?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Our team is here to assist you throughout the onboarding process.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
                <Button variant="outline" size="sm">
                  View Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
