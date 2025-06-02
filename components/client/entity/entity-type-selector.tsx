"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Building2, Shield, Heart, TrendingUp, Users, Briefcase, ArrowRight, Info } from "lucide-react"
import { type EntityType, type OnboardingScenario, ENTITY_TYPE_CONFIG } from "@/lib/types/entities"

interface EntityTypeSelectorProps {
  onSelect: (entityType: EntityType, scenario: OnboardingScenario) => void
  selectedEntityType?: EntityType
  selectedScenario?: OnboardingScenario
}

const ENTITY_ICONS = {
  individual: User,
  "legal-entity": Building2,
  trust: Shield,
  foundation: Heart,
  "investment-fund": TrendingUp,
  partnership: Users,
  llc: Building2,
  corporation: Building2,
  "limited-partnership": Users,
  "family-office": Briefcase,
} as const

const ONBOARDING_SCENARIOS = [
  {
    id: "direct-client" as OnboardingScenario,
    title: "Direct Application",
    description: "I am applying directly for myself/my entity",
    icon: User,
    supportedEntityTypes: ["individual", "legal-entity", "trust", "foundation", "investment-fund"] as EntityType[],
  },
  {
    id: "representative-acting" as OnboardingScenario,
    title: "Acting as Representative",
    description: "I am a lawyer/solicitor acting on behalf of a client",
    icon: Briefcase,
    supportedEntityTypes: ["individual", "legal-entity", "trust", "foundation", "investment-fund"] as EntityType[],
  },
  {
    id: "administrative-onboarding" as OnboardingScenario,
    title: "Administrative/Management Company",
    description: "I am a management company handling multiple entities",
    icon: Building2,
    supportedEntityTypes: ["legal-entity", "trust", "foundation", "investment-fund"] as EntityType[],
  },
  {
    id: "trust-structure" as OnboardingScenario,
    title: "Trust Structure Setup",
    description: "Setting up a trust with trustees and beneficiaries",
    icon: Shield,
    supportedEntityTypes: ["trust", "foundation"] as EntityType[],
  },
  {
    id: "investment-structure" as OnboardingScenario,
    title: "Investment Structure",
    description: "Fund managers, investors, and stakeholders",
    icon: TrendingUp,
    supportedEntityTypes: ["investment-fund", "legal-entity"] as EntityType[],
  },
  {
    id: "complex-ownership" as OnboardingScenario,
    title: "Complex Ownership Structure",
    description: "Multi-layered corporate structures with multiple UBOs",
    icon: Users,
    supportedEntityTypes: ["legal-entity", "trust", "foundation", "investment-fund"] as EntityType[],
  },
]

export function EntityTypeSelector({ onSelect, selectedEntityType, selectedScenario }: EntityTypeSelectorProps) {
  const [currentStep, setCurrentStep] = useState<"entity-type" | "scenario">("entity-type")
  const [tempEntityType, setTempEntityType] = useState<EntityType | undefined>(selectedEntityType)
  const [tempScenario, setTempScenario] = useState<OnboardingScenario | undefined>(selectedScenario)

  const handleEntityTypeSelect = (entityType: EntityType) => {
    setTempEntityType(entityType)
    setCurrentStep("scenario")
  }

  const handleScenarioSelect = (scenario: OnboardingScenario) => {
    setTempScenario(scenario)
  }

  const handleConfirm = () => {
    if (tempEntityType && tempScenario) {
      onSelect(tempEntityType, tempScenario)
    }
  }

  const handleBack = () => {
    setCurrentStep("entity-type")
    setTempScenario(undefined)
  }

  const getAvailableScenarios = () => {
    if (!tempEntityType) return []
    return ONBOARDING_SCENARIOS.filter((scenario) => scenario.supportedEntityTypes.includes(tempEntityType))
  }

  const getEntityIcon = (entityType: EntityType) => {
    const IconComponent = ENTITY_ICONS[entityType] || Building2
    return <IconComponent className="h-6 w-6" />
  }

  const getScenarioIcon = (scenario: (typeof ONBOARDING_SCENARIOS)[0]) => {
    const IconComponent = scenario.icon
    return <IconComponent className="h-5 w-5" />
  }

  return (
    <Card className="border-stone-200/70">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium">
              {currentStep === "entity-type" ? "Select Entity Type" : "Select Onboarding Scenario"}
            </CardTitle>
            <CardDescription>
              {currentStep === "entity-type"
                ? "Choose the type of entity you're onboarding"
                : "Choose how you're applying for services"}
            </CardDescription>
          </div>
          {currentStep === "scenario" && (
            <Button variant="outline" size="sm" onClick={handleBack}>
              Back
            </Button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center space-x-2 mt-4">
          <div className={`h-2 w-8 rounded-full ${currentStep === "entity-type" ? "bg-blue-500" : "bg-green-500"}`} />
          <div className={`h-2 w-8 rounded-full ${currentStep === "scenario" ? "bg-blue-500" : "bg-slate-200"}`} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {currentStep === "entity-type" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(ENTITY_TYPE_CONFIG).map(([type, config]) => {
              const entityType = type as EntityType
              const isSelected = tempEntityType === entityType

              return (
                <Card
                  key={type}
                  className={`cursor-pointer transition-all border-2 ${
                    isSelected ? "border-blue-500 bg-blue-50" : "border-stone-200 hover:border-stone-300"
                  }`}
                  onClick={() => handleEntityTypeSelect(entityType)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-100" : "bg-slate-100"}`}>
                        {getEntityIcon(entityType)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800">{config.label}</h3>
                        <p className="text-sm text-slate-600 mt-1">{config.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {config.supportedRoles.slice(0, 2).map((role) => (
                            <Badge key={role} variant="outline" className="text-xs">
                              {role.replace("-", " ")}
                            </Badge>
                          ))}
                          {config.supportedRoles.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{config.supportedRoles.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {currentStep === "scenario" && tempEntityType && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Selected Entity Type</p>
                <p className="text-sm text-blue-700">{ENTITY_TYPE_CONFIG[tempEntityType].label}</p>
              </div>
            </div>

            <Separator />

            <RadioGroup
              value={tempScenario}
              onValueChange={(value) => handleScenarioSelect(value as OnboardingScenario)}
            >
              <div className="space-y-3">
                {getAvailableScenarios().map((scenario) => (
                  <div key={scenario.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={scenario.id} id={scenario.id} />
                    <Label htmlFor={scenario.id} className="flex-1 cursor-pointer">
                      <Card className="border-stone-200 hover:border-stone-300 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-lg bg-slate-100">{getScenarioIcon(scenario)}</div>
                            <div>
                              <h4 className="font-medium text-slate-800">{scenario.title}</h4>
                              <p className="text-sm text-slate-600 mt-1">{scenario.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep === "scenario" && tempEntityType && tempScenario && (
          <div className="flex justify-end pt-4 border-t border-stone-200">
            <Button onClick={handleConfirm} className="bg-blue-600 hover:bg-blue-700">
              Continue with Selection
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
