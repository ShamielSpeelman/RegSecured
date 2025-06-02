"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Clock,
  CheckCircle2,
  Circle,
  Lock,
  ArrowRight,
  FileText,
  AlertCircle,
  Info,
  Users,
  Building2,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  FormOrchestrator,
  type OnboardingWorkflow,
  type FormDefinition,
} from "@/lib/form-orchestration/form-orchestrator"
import type { EntityType, RelationshipRole, OnboardingScenario } from "@/lib/types/entities"

interface WorkflowManagerProps {
  entityType: EntityType
  scenario: OnboardingScenario
  role?: RelationshipRole
  jurisdiction?: string
  completedForms?: string[]
  onFormSelect: (formId: string) => void
  onWorkflowComplete: () => void
  className?: string
}

export function WorkflowManager({
  entityType,
  scenario,
  role,
  jurisdiction,
  completedForms = [],
  onFormSelect,
  onWorkflowComplete,
  className,
}: WorkflowManagerProps) {
  const [workflow, setWorkflow] = useState<OnboardingWorkflow | null>(null)
  const [currentFormIndex, setCurrentFormIndex] = useState(0)

  useEffect(() => {
    const generatedWorkflow = FormOrchestrator.getOnboardingWorkflow(entityType, scenario, role, jurisdiction)
    setWorkflow(generatedWorkflow)

    // Find the current form index based on completed forms
    const nextForm = FormOrchestrator.getNextForm(completedForms, entityType, scenario, role)
    if (nextForm) {
      const nextIndex = generatedWorkflow.forms.findIndex((f) => f.id === nextForm.id)
      setCurrentFormIndex(nextIndex >= 0 ? nextIndex : 0)
    } else {
      setCurrentFormIndex(generatedWorkflow.forms.length)
    }
  }, [entityType, scenario, role, jurisdiction, completedForms])

  if (!workflow) {
    return (
      <Card className={cn("border-stone-200/70", className)}>
        <CardContent className="p-6">
          <div className="text-center text-slate-500">Loading workflow...</div>
        </CardContent>
      </Card>
    )
  }

  const completionPercentage = FormOrchestrator.getCompletionPercentage(completedForms, entityType, scenario, role)

  const estimatedTimeRemaining = FormOrchestrator.getEstimatedTimeRemaining(completedForms, entityType, scenario, role)

  const { isComplete, missingForms } = FormOrchestrator.validateWorkflowCompletion(
    completedForms,
    entityType,
    scenario,
    role,
  )

  const getFormStatus = (form: FormDefinition): "completed" | "current" | "available" | "locked" => {
    if (completedForms.includes(form.id)) return "completed"

    const canAccess = FormOrchestrator.canAccessForm(form.id, completedForms, entityType, scenario, role)
    if (!canAccess) return "locked"

    const nextForm = FormOrchestrator.getNextForm(completedForms, entityType, scenario, role)
    if (nextForm && nextForm.id === form.id) return "current"

    return "available"
  }

  const getEntityIcon = (entityType: EntityType) => {
    switch (entityType) {
      case "individual":
        return <Users className="h-5 w-5" />
      case "legal-entity":
      case "corporation":
      case "llc":
      case "partnership":
        return <Building2 className="h-5 w-5" />
      case "trust":
      case "foundation":
        return <Shield className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const handleFormClick = (form: FormDefinition) => {
    const status = getFormStatus(form)
    if (status === "locked") return

    onFormSelect(form.id)
  }

  const handleCompleteWorkflow = () => {
    if (isComplete) {
      onWorkflowComplete()
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Workflow Header */}
      <Card className="border-stone-200/70">
        <CardHeader>
          <div className="flex items-center space-x-3">
            {getEntityIcon(entityType)}
            <div>
              <CardTitle className="text-xl">{workflow.title}</CardTitle>
              <CardDescription>{workflow.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Progress</span>
                <span>{completionPercentage}% complete</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>

            {/* Workflow Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  {completedForms.length} of {workflow.forms.length} forms completed
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{estimatedTimeRemaining} minutes remaining</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{workflow.regulatoryRequirements.length} regulatory forms</span>
              </div>
            </div>

            {/* Entity Type and Scenario Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                {entityType.replace("-", " ")}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {scenario.replace("-", " ")}
              </Badge>
              {role && (
                <Badge variant="outline" className="text-xs">
                  {role.replace("-", " ")}
                </Badge>
              )}
              {jurisdiction && (
                <Badge variant="outline" className="text-xs">
                  {jurisdiction.toUpperCase()}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completion Status */}
      {isComplete ? (
        <Alert className="bg-emerald-50 border-emerald-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <AlertTitle className="text-emerald-800">Workflow Complete</AlertTitle>
          <AlertDescription className="text-emerald-700">
            All required forms have been completed. You can now proceed to document upload and final review.
          </AlertDescription>
          <Button onClick={handleCompleteWorkflow} className="mt-3 bg-emerald-600 hover:bg-emerald-700">
            Proceed to Document Upload
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Alert>
      ) : (
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Next Steps</AlertTitle>
          <AlertDescription className="text-blue-700">
            Complete the remaining {missingForms.length} form(s) to finish your onboarding process.
          </AlertDescription>
        </Alert>
      )}

      {/* Forms List */}
      <Card className="border-stone-200/70">
        <CardHeader>
          <CardTitle className="text-lg">Required Forms</CardTitle>
          <CardDescription>
            Complete all forms in the order shown. Some forms may be locked until dependencies are completed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workflow.forms.map((form, index) => {
              const status = getFormStatus(form)
              const isLocked = status === "locked"
              const isCompleted = status === "completed"
              const isCurrent = status === "current"

              return (
                <div key={form.id}>
                  <div
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
                      isCompleted && "bg-emerald-50 border-emerald-200",
                      isCurrent && "bg-blue-50 border-blue-200 ring-2 ring-blue-100",
                      isLocked && "bg-slate-50 border-slate-200 cursor-not-allowed opacity-60",
                      !isCompleted && !isCurrent && !isLocked && "hover:bg-slate-50 border-slate-200",
                    )}
                    onClick={() => handleFormClick(form)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : isLocked ? (
                          <Lock className="h-5 w-5 text-slate-400" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4
                            className={cn(
                              "font-medium",
                              isCompleted && "text-emerald-800",
                              isCurrent && "text-blue-800",
                              isLocked && "text-slate-500",
                            )}
                          >
                            {form.title}
                          </h4>
                          {form.isRegulatory && (
                            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-800 border-amber-200">
                              Regulatory
                            </Badge>
                          )}
                        </div>
                        <p
                          className={cn(
                            "text-sm",
                            isCompleted && "text-emerald-600",
                            isCurrent && "text-blue-600",
                            isLocked && "text-slate-400",
                            !isCompleted && !isCurrent && !isLocked && "text-slate-500",
                          )}
                        >
                          {form.description}
                        </p>
                        {form.dependencies && form.dependencies.length > 0 && (
                          <p className="text-xs text-slate-400 mt-1">Requires: {form.dependencies.join(", ")}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{form.estimatedTimeMinutes} min</span>
                      </div>
                      {!isLocked && <ArrowRight className="h-4 w-4" />}
                    </div>
                  </div>

                  {index < workflow.forms.length - 1 && <Separator className="my-2" />}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Regulatory Requirements */}
      {workflow.regulatoryRequirements.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-lg text-amber-800 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Regulatory Requirements
            </CardTitle>
            <CardDescription className="text-amber-700">
              The following forms contain regulatory requirements that must be completed accurately.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {workflow.regulatoryRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-amber-800">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{requirement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
