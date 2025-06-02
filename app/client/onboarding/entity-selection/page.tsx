"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { EntityTypeSelector } from "@/components/client/entity/entity-type-selector"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Info } from "lucide-react"
import type { EntityType, OnboardingScenario } from "@/lib/types/entities"

export default function EntitySelectionPage() {
  const router = useRouter()
  const [selectedEntityType, setSelectedEntityType] = useState<EntityType | undefined>()
  const [selectedScenario, setSelectedScenario] = useState<OnboardingScenario | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [existingProfile, setExistingProfile] = useState<any>(null)

  useEffect(() => {
    // Check if user already has a profile
    const savedProfile = localStorage.getItem("clientProfile")
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setExistingProfile(profile)
      setSelectedEntityType(profile.entityType)
      setSelectedScenario(profile.scenario)
    }
  }, [])

  const handleEntityScenarioSelect = async (entityType: EntityType, scenario: OnboardingScenario) => {
    setIsLoading(true)

    try {
      // Create or update client profile
      const profileData = {
        entityType,
        scenario,
        entityName: existingProfile?.entityName || `New ${entityType.replace("-", " ")}`,
        entityId: existingProfile?.entityId || `${entityType.toUpperCase()}-${Date.now()}`,
        jurisdiction: existingProfile?.jurisdiction || "us",
        onboardingStatus: "in-progress",
        onboardingProgress: 5, // Just started
        onboardingDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        relationshipManager: existingProfile?.relationshipManager || "Sarah Thompson",
        riskRating: "medium",
        completedForms: existingProfile?.completedForms || [],
        lastActivity: new Date().toISOString(),
        unreadMessages: 0,
        unreadNotifications: 0,
        savedFormData: existingProfile?.savedFormData || {},
        profileSetupComplete: true,
        createdAt: existingProfile?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Save to localStorage (in real app, this would be an API call)
      localStorage.setItem("clientProfile", JSON.stringify(profileData))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to dashboard
      router.push("/client/dashboard")
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToDashboard = () => {
    if (existingProfile) {
      router.push("/client/dashboard")
    } else {
      router.push("/auth")
    }
  }

  const handleStartOver = () => {
    setSelectedEntityType(undefined)
    setSelectedScenario(undefined)
    setExistingProfile(null)
    localStorage.removeItem("clientProfile")
  }

  return (
    <DashboardLayout userRole="client">
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-light text-slate-800 mb-2">
                  {existingProfile ? "Update Entity Information" : "Welcome to RegSecured"}
                </h1>
                <p className="text-slate-600 font-light">
                  {existingProfile
                    ? "You can change your entity type and onboarding scenario below"
                    : "Let's get started by setting up your entity profile"}
                </p>
              </div>
              <Button variant="outline" onClick={handleBackToDashboard}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {existingProfile ? "Back to Dashboard" : "Back to Login"}
              </Button>
            </div>

            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>Setup Progress</span>
                <span>Step 1 of 3</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>

            {/* Existing profile warning */}
            {existingProfile && (
              <Card className="border-amber-200 bg-amber-50 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Existing Profile Detected</p>
                      <p className="text-sm text-amber-700 mt-1">
                        You currently have a profile set up as a{" "}
                        <strong>{existingProfile.entityType?.replace("-", " ")}</strong> with
                        <strong> {existingProfile.scenario?.replace("-", " ")}</strong> scenario. Changing your entity
                        type may reset some of your progress.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleStartOver}
                        className="mt-3 border-amber-300 text-amber-800 hover:bg-amber-100"
                      >
                        Start Fresh
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Entity Selection */}
          <EntityTypeSelector
            onSelect={handleEntityScenarioSelect}
            selectedEntityType={selectedEntityType}
            selectedScenario={selectedScenario}
          />

          {/* Loading state */}
          {isLoading && (
            <Card className="mt-6 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <p className="text-sm text-blue-800">Setting up your profile...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help section */}
          <Card className="mt-8 border-stone-200/70">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Need Help Choosing?</CardTitle>
              <CardDescription>
                Not sure which entity type or scenario applies to you? Here are some guidelines:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Entity Types</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>
                      <strong>Individual:</strong> You are a natural person applying for services
                    </li>
                    <li>
                      <strong>Legal Entity:</strong> You represent a company, corporation, or LLC
                    </li>
                    <li>
                      <strong>Trust:</strong> You are setting up or managing a trust structure
                    </li>
                    <li>
                      <strong>Foundation:</strong> You represent a private or charitable foundation
                    </li>
                    <li>
                      <strong>Investment Fund:</strong> You manage an investment fund or similar vehicle
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Onboarding Scenarios</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>
                      <strong>Direct Application:</strong> You are applying for yourself/your entity
                    </li>
                    <li>
                      <strong>Representative:</strong> You are a lawyer or advisor acting for a client
                    </li>
                    <li>
                      <strong>Administrative:</strong> You are a management company handling multiple entities
                    </li>
                    <li>
                      <strong>Trust Structure:</strong> You are setting up complex trust arrangements
                    </li>
                    <li>
                      <strong>Investment Structure:</strong> You are establishing investment vehicles
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200">
                <p className="text-sm text-slate-600">
                  Still have questions?{" "}
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    Contact our support team
                  </Button>{" "}
                  for personalized assistance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
