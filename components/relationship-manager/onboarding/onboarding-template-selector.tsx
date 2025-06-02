"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { Search, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Template data
const templates = [
  {
    id: "individual-standard",
    name: "Individual Client - Standard",
    description: "Standard onboarding template for individual clients with basic KYC requirements.",
    jurisdictions: ["Global", "US", "UK", "EU"],
    documentRequirements: ["ID Verification", "Proof of Address", "Tax Forms"],
    riskLevel: "Low to Medium",
    estimatedTime: "1-3 days",
  },
  {
    id: "individual-enhanced",
    name: "Individual Client - Enhanced Due Diligence",
    description: "Enhanced onboarding template for high-risk individual clients requiring additional verification.",
    jurisdictions: ["Global", "US", "UK", "EU"],
    documentRequirements: [
      "ID Verification",
      "Proof of Address",
      "Source of Wealth",
      "Tax Forms",
      "Enhanced Screening",
    ],
    riskLevel: "High",
    estimatedTime: "3-7 days",
  },
  {
    id: "corporate-standard",
    name: "Corporate Client - Standard",
    description: "Standard onboarding template for corporate entities with basic KYC requirements.",
    jurisdictions: ["Global", "US", "UK", "EU"],
    documentRequirements: ["Company Registration", "Ownership Structure", "Director IDs", "Financial Statements"],
    riskLevel: "Low to Medium",
    estimatedTime: "3-5 days",
  },
  {
    id: "corporate-enhanced",
    name: "Corporate Client - Enhanced Due Diligence",
    description: "Enhanced onboarding template for high-risk corporate entities requiring additional verification.",
    jurisdictions: ["Global", "US", "UK", "EU"],
    documentRequirements: [
      "Company Registration",
      "Ownership Structure",
      "Director IDs",
      "Financial Statements",
      "UBO Verification",
      "Enhanced Screening",
    ],
    riskLevel: "High",
    estimatedTime: "5-10 days",
  },
  {
    id: "wealth-management",
    name: "Wealth Management Client",
    description: "Specialized onboarding template for wealth management clients with investment portfolios.",
    jurisdictions: ["Global", "US", "UK", "EU", "Singapore", "Hong Kong"],
    documentRequirements: [
      "ID Verification",
      "Proof of Address",
      "Source of Wealth",
      "Investment Profile",
      "Tax Forms",
    ],
    riskLevel: "Medium to High",
    estimatedTime: "3-7 days",
  },
  {
    id: "fintech",
    name: "FinTech Client",
    description: "Specialized onboarding template for fintech companies with digital business models.",
    jurisdictions: ["Global", "US", "UK", "EU"],
    documentRequirements: [
      "Company Registration",
      "Ownership Structure",
      "Director IDs",
      "Technical Documentation",
      "Regulatory Licenses",
    ],
    riskLevel: "Medium to High",
    estimatedTime: "5-10 days",
  },
]

export function OnboardingTemplateSelector() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.jurisdictions.some((j) => j.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSubmit = async () => {
    if (!selectedTemplate) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const template = templates.find((t) => t.id === selectedTemplate)

      setIsSuccess(true)
      toast({
        title: "Template selected",
        description: `${template?.name} template has been selected. You can now proceed with client information.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error selecting the template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    const template = templates.find((t) => t.id === selectedTemplate)

    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Template Selected</AlertTitle>
        <AlertDescription className="text-green-700">
          <p className="mb-2">
            You have selected the <strong>{template?.name}</strong> template.
          </p>
          <p>You will now be prompted to enter client information according to this template's requirements.</p>
        </AlertDescription>
        <div className="mt-4">
          <Button
            onClick={() => {
              setIsSuccess(false)
              setSelectedTemplate(null)
            }}
          >
            Select Another Template
          </Button>
        </div>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search templates by name, description or jurisdiction..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <RadioGroup value={selectedTemplate || ""} onValueChange={setSelectedTemplate}>
        <div className="grid grid-cols-1 gap-4">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all ${selectedTemplate === template.id ? "border-primary ring-1 ring-primary" : ""}`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                    <RadioGroupItem value={template.id} id={template.id} className="mt-1" />
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-slate-500">Jurisdictions</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.jurisdictions.map((jurisdiction) => (
                          <Badge key={jurisdiction} variant="outline" className="text-xs">
                            {jurisdiction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500">Risk Level</Label>
                      <p className="text-sm mt-1">{template.riskLevel}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label className="text-xs text-slate-500">Document Requirements</Label>
                    <ul className="list-disc list-inside text-sm mt-1 grid grid-cols-1 md:grid-cols-2 gap-1">
                      {template.documentRequirements.map((doc) => (
                        <li key={doc}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-between items-center">
                    <div className="text-sm text-slate-500">
                      <span className="font-medium">Estimated time:</span> {template.estimatedTime}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500">No templates found matching your search criteria.</div>
          )}
        </div>
      </RadioGroup>

      <Button onClick={handleSubmit} disabled={!selectedTemplate || isSubmitting} className="w-full">
        {isSubmitting ? "Processing..." : "Use Selected Template"}
      </Button>
    </div>
  )
}
