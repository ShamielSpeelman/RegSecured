"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { EnhancedDynamicForm } from "@/components/client/forms/enhanced-dynamic-form"
import { WorkflowManager } from "@/components/client/onboarding/workflow-manager"
import { EntityTypeSelector } from "@/components/client/entity/entity-type-selector"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { FormOrchestrator, FORM_DEFINITIONS } from "@/lib/form-orchestration/form-orchestrator"
import type { EntityType, RelationshipRole, OnboardingScenario } from "@/lib/types/entities"

interface FormRouterProps {
  initialEntityType?: EntityType
  initialScenario?: OnboardingScenario
  initialRole?: RelationshipRole
  jurisdiction?: string
  savedData?: Record<string, any>
  onFormSubmit?: (formId: string, data: any) => Promise<void>
  onSaveDraft?: (formId: string, data: any) => Promise<void>
  onWorkflowComplete?: () => void
}

export function FormRouter({
  initialEntityType,
  initialScenario,
  initialRole,
  jurisdiction = "us",
  savedData = {},
  onFormSubmit,
  onSaveDraft,
  onWorkflowComplete,
}: FormRouterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [entityType, setEntityType] = useState<EntityType | null>(initialEntityType || null)
  const [scenario, setScenario] = useState<OnboardingScenario | null>(initialScenario || null)
  const [role, setRole] = useState<RelationshipRole | undefined>(initialRole)
  const [currentFormId, setCurrentFormId] = useState<string | null>(null)
  const [completedForms, setCompletedForms] = useState<string[]>([])
  const [showWorkflow, setShowWorkflow] = useState(true)

  // Initialize from URL parameters
  useEffect(() => {
    const formId = searchParams.get("form")
    const entityTypeParam = searchParams.get("entityType") as EntityType
    const scenarioParam = searchParams.get("scenario") as OnboardingScenario
    const roleParam = searchParams.get("role") as RelationshipRole

    if (entityTypeParam) setEntityType(entityTypeParam)
    if (scenarioParam) setScenario(scenarioParam)
    if (roleParam) setRole(roleParam)
    if (formId) {
      setCurrentFormId(formId)
      setShowWorkflow(false)
    }
  }, [searchParams])

  // Load completed forms from saved data
  useEffect(() => {
    if (savedData.completedForms) {
      setCompletedForms(savedData.completedForms)
    }
  }, [savedData])

  const handleEntitySelection = (selectedEntityType: EntityType, selectedScenario: OnboardingScenario) => {
    setEntityType(selectedEntityType)
    setScenario(selectedScenario)
    setShowWorkflow(true)
    setCurrentFormId(null)

    // Update URL
    const params = new URLSearchParams()
    params.set("entityType", selectedEntityType)
    params.set("scenario", selectedScenario)
    if (role) params.set("role", role)
    router.push(`?${params.toString()}`)
  }

  const handleFormSelect = (formId: string) => {
    setCurrentFormId(formId)
    setShowWorkflow(false)

    // Update URL
    const params = new URLSearchParams()
    if (entityType) params.set("entityType", entityType)
    if (scenario) params.set("scenario", scenario)
    if (role) params.set("role", role)
    params.set("form", formId)
    router.push(`?${params.toString()}`)
  }

  const handleFormSubmit = async (data: any) => {
    if (!currentFormId) return

    try {
      if (onFormSubmit) {
        await onFormSubmit(currentFormId, data)
      }

      // Mark form as completed
      const newCompletedForms = [...completedForms, currentFormId]
      setCompletedForms(newCompletedForms)

      // Check if workflow is complete
      if (entityType && scenario) {
        const { isComplete } = FormOrchestrator.validateWorkflowCompletion(
          newCompletedForms,
          entityType,
          scenario,
          role,
        )

        if (isComplete) {
          if (onWorkflowComplete) {
            onWorkflowComplete()
          }
        } else {
          // Navigate to next form or back to workflow
          const nextForm = FormOrchestrator.getNextForm(newCompletedForms, entityType, scenario, role)
          if (nextForm) {
            handleFormSelect(nextForm.id)
          } else {
            setShowWorkflow(true)
            setCurrentFormId(null)
          }
        }
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const handleSaveDraft = async (data: any) => {
    if (!currentFormId) return

    try {
      if (onSaveDraft) {
        await onSaveDraft(currentFormId, data)
      }
    } catch (error) {
      console.error("Draft save error:", error)
    }
  }

  const handleBackToWorkflow = () => {
    setShowWorkflow(true)
    setCurrentFormId(null)

    // Update URL
    const params = new URLSearchParams()
    if (entityType) params.set("entityType", entityType)
    if (scenario) params.set("scenario", scenario)
    if (role) params.set("role", role)
    router.push(`?${params.toString()}`)
  }

  const handleWorkflowComplete = () => {
    if (onWorkflowComplete) {
      onWorkflowComplete()
    } else {
      // Default behavior - navigate to document upload
      router.push("/client/onboarding/documents")
    }
  }

  // Show entity type selector if no entity type is selected
  if (!entityType || !scenario) {
    return (
      <div className="max-w-4xl mx-auto">
        <EntityTypeSelector
          onSelect={handleEntitySelection}
          selectedEntityType={entityType}
          selectedScenario={scenario}
        />
      </div>
    )
  }

  // Show specific form
  if (currentFormId && !showWorkflow) {
    const formDefinition = FORM_DEFINITIONS.find((f) => f.id === currentFormId)

    if (!formDefinition) {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Form Not Found</AlertTitle>
              <AlertDescription>
                The requested form could not be found. Please return to the workflow overview.
              </AlertDescription>
            </Alert>
            <Button onClick={handleBackToWorkflow} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Workflow
            </Button>
          </CardContent>
        </Card>
      )
    }

    // Check if form can be accessed
    const canAccess = FormOrchestrator.canAccessForm(currentFormId, completedForms, entityType, scenario, role)

    if (!canAccess) {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Form Not Available</AlertTitle>
              <AlertDescription>
                This form is not yet available. Please complete the required prerequisite forms first.
              </AlertDescription>
            </Alert>
            <Button onClick={handleBackToWorkflow} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Workflow
            </Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBackToWorkflow}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workflow
          </Button>
        </div>

        <EnhancedDynamicForm
          formId={formDefinition.id}
          title={formDefinition.title}
          description={formDefinition.description}
          sections={formDefinition.sections}
          onSubmit={handleFormSubmit}
          onSaveDraft={handleSaveDraft}
          savedData={savedData[currentFormId]}
          entityType={entityType}
          role={role}
          scenario={scenario}
          jurisdiction={jurisdiction}
          isRegulatory={formDefinition.isRegulatory}
          showComplianceInfo={true}
        />
      </div>
    )
  }

  // Show workflow overview
  return (
    <div className="max-w-6xl mx-auto">
      <WorkflowManager
        entityType={entityType}
        scenario={scenario}
        role={role}
        jurisdiction={jurisdiction}
        completedForms={completedForms}
        onFormSelect={handleFormSelect}
        onWorkflowComplete={handleWorkflowComplete}
      />
    </div>
  )
}
