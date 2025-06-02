"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type OnboardingStep = {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "pending" | "attention"
  link: string
}

interface OnboardingProgressTrackerProps {
  steps: OnboardingStep[]
  currentStepId?: string
  className?: string
}

export function OnboardingProgressTracker({ steps, currentStepId, className }: OnboardingProgressTrackerProps) {
  const [activeStep, setActiveStep] = useState<string | undefined>(currentStepId)

  useEffect(() => {
    if (currentStepId) {
      setActiveStep(currentStepId)
    } else if (steps.length > 0) {
      // Find the first non-completed step
      const firstIncompleteStep = steps.find((step) => step.status !== "completed")
      setActiveStep(firstIncompleteStep?.id || steps[0].id)
    }
  }, [currentStepId, steps])

  const getCompletionPercentage = () => {
    const completedSteps = steps.filter((step) => step.status === "completed").length
    return Math.round((completedSteps / steps.length) * 100)
  }

  const getStepIcon = (status: OnboardingStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-emerald-500" />
      case "in-progress":
        return <Clock className="h-6 w-6 text-blue-500" />
      case "attention":
        return <AlertCircle className="h-6 w-6 text-orange-500" />
      default:
        return <Circle className="h-6 w-6 text-slate-300" />
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-slate-800">Your Onboarding Progress</h3>
        <span className="text-sm font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
          {getCompletionPercentage()}% Complete
        </span>
      </div>

      <div className="bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${getCompletionPercentage()}%` }}
        ></div>
      </div>

      <div className="space-y-3 mt-4">
        {steps.map((step, index) => {
          const isActive = step.id === activeStep

          return (
            <a
              key={step.id}
              href={step.link}
              className={cn(
                "flex items-start p-3 rounded-lg transition-colors",
                isActive ? "bg-slate-50 border border-slate-200" : "hover:bg-slate-50",
              )}
            >
              <div className="mr-3 mt-0.5">{getStepIcon(step.status)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={cn(
                      "font-medium",
                      step.status === "completed"
                        ? "text-slate-700"
                        : step.status === "in-progress"
                          ? "text-blue-700"
                          : step.status === "attention"
                            ? "text-orange-700"
                            : "text-slate-600",
                    )}
                  >
                    {step.title}
                  </h4>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                    Step {index + 1} of {steps.length}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{step.description}</p>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
