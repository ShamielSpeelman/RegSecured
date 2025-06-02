"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { FormRouter } from "@/components/client/onboarding/form-router"
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
import { HelpCircle, ArrowLeft } from "lucide-react"
import type { EntityType, OnboardingScenario, RelationshipRole } from "@/lib/types/entities"

// Mock client profile - in real app this would come from API/context
const getClientProfile = () => {
  // Check localStorage for saved profile or use defaults
  const savedProfile = localStorage.getItem("clientProfile")
  if (savedProfile) {
    return JSON.parse(savedProfile)
  }

  return {
    entityType: "legal-entity" as EntityType,
    scenario: "direct-client" as OnboardingScenario,
    role: undefined as RelationshipRole | undefined,
    jurisdiction: "us",
    completedForms: ["company-information"],
    savedFormData: {
      "company-information": {
        companyName: "Acme Holdings Ltd.",
        registrationNumber: "12345678",
        incorporationDate: "2020-01-15",
        jurisdiction: "us",
      },
    },
  }
}

export default function FormCompletionPage() {
  const searchParams = useSearchParams()
  const [clientProfile, setClientProfile] = useState(getClientProfile())
  const [isLoading, setIsLoading] = useState(false)

  // Check if we need to show entity selector
  const forceEntitySelection = searchParams.get("selectEntity") === "true"
  const [showEntitySelector, setShowEntitySelector] = useState(
    forceEntitySelection || !clientProfile.entityType || !clientProfile.scenario,
  )

  useEffect(() => {
    // Save profile changes to localStorage
    localStorage.setItem("clientProfile", JSON.stringify(clientProfile))
  }, [clientProfile])

  const handleFormSubmit = async (formId: string, data: any) => {
    setIsLoading(true)
    try {
      console.log(`Submitting form ${formId}:`, data)

      // Update client profile with completed form
      setClientProfile((prev: any) => ({
        ...prev,
        completedForms: [...(prev.completedForms || []), formId],
        savedFormData: {
          ...prev.savedFormData,
          [formId]: data,
        },
      }))

      // In a real app, this would call an API
      // await submitFormAPI(formId, data)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Form submission error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDraft = async (formId: string, data: any) => {
    try {
      console.log(`Saving draft for form ${formId}:`, data)

      // Update saved form data
      setClientProfile((prev: any) => ({
        ...prev,
        savedFormData: {
          ...prev.savedFormData,
          [formId]: data,
        },
      }))

      // In a real app, this would call an API
      // await saveDraftAPI(formId, data)
    } catch (error) {
      console.error("Draft save error:", error)
      throw error
    }
  }

  const handleWorkflowComplete = () => {
    // Navigate to document upload
    window.location.href = "/client/onboarding/documents"
  }

  const handleEntityChange = (entityType: EntityType, scenario: OnboardingScenario) => {
    setClientProfile((prev: any) => ({
      ...prev,
      entityType,
      scenario,
      completedForms: [], // Reset completed forms when changing entity type
      savedFormData: {},
    }))
    setShowEntitySelector(false)
  }

  const handleBackToDashboard = () => {
    window.location.href = "/client/dashboard"
  }

  if (showEntitySelector) {
    return (
      <DashboardLayout userRole="client">
        <div className="p-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/client/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">My Onboarding</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Entity Selection</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8">
            <h1 className="text-3xl font-light text-slate-800 mb-2">Entity Selection</h1>
            <p className="text-slate-600 font-light">
              Please select your entity type and onboarding scenario to continue
            </p>
          </div>

          <div className="max-w-4xl">
            <FormRouter
              initialEntityType={clientProfile.entityType}
              initialScenario={clientProfile.scenario}
              initialRole={clientProfile.role}
              jurisdiction={clientProfile.jurisdiction}
              savedData={clientProfile.savedFormData}
              onFormSubmit={handleFormSubmit}
              onSaveDraft={handleSaveDraft}
              onWorkflowComplete={handleWorkflowComplete}
            />
          </div>

          <div className="mt-8">
            <Button variant="outline" onClick={handleBackToDashboard}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="client">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/client/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">My Onboarding</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Form Completion</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light text-slate-800 mb-2">Form Completion</h1>
              <p className="text-slate-600 font-light">
                Complete required forms for your {clientProfile.entityType?.replace("-", " ") || "entity"} onboarding
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowEntitySelector(true)}>
                Change Entity Type
              </Button>
              <Button variant="outline" onClick={handleBackToDashboard}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <FormRouter
              initialEntityType={clientProfile.entityType}
              initialScenario={clientProfile.scenario}
              initialRole={clientProfile.role}
              jurisdiction={clientProfile.jurisdiction}
              savedData={clientProfile.savedFormData}
              onFormSubmit={handleFormSubmit}
              onSaveDraft={handleSaveDraft}
              onWorkflowComplete={handleWorkflowComplete}
            />
          </div>

          <div>
            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Current Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-600">Entity Type</p>
                  <p className="text-sm text-slate-800 capitalize">
                    {clientProfile.entityType?.replace("-", " ") || "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Scenario</p>
                  <p className="text-sm text-slate-800 capitalize">
                    {clientProfile.scenario?.replace("-", " ") || "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Jurisdiction</p>
                  <p className="text-sm text-slate-800 uppercase">{clientProfile.jurisdiction}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed Forms</p>
                  <p className="text-sm text-slate-800">{clientProfile.completedForms?.length || 0}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200/70 mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Form Completion Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                      <li>You can save your progress at any time and return later</li>
                      <li>All fields marked with an asterisk (*) are required</li>
                      <li>Your information is securely encrypted and protected</li>
                      <li>Forms are tailored to your specific entity type and scenario</li>
                      <li>Some forms may only become available after completing prerequisites</li>
                    </ul>
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-sm mt-3">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
