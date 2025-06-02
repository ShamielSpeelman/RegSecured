"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, ArrowRight, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { EntityType, RelationshipRole, OnboardingScenario } from "@/lib/types/entities"

export type FieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "phone"
  | "country"
  | "jurisdiction"
  | "currency"
  | "percentage"
  | "entity-search"
  | "relationship-select"
  | "file-upload"
  | "multi-select"
  | "address"

export interface FormFieldDefinition {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  description?: string
  required: boolean
  options?: { label: string; value: string }[]
  validation?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    pattern?: string
    patternMessage?: string
  }
  defaultValue?: any
  dependsOn?: {
    field: string
    value: any
  }
  entityTypes?: EntityType[]
  roles?: RelationshipRole[]
  scenarios?: OnboardingScenario[]
  regulatoryRequirement?: boolean
  jurisdictions?: string[]
  helpText?: string
  infoLink?: string
}

export interface FormSection {
  id: string
  title: string
  description?: string
  fields: FormFieldDefinition[]
  entityTypes?: EntityType[]
  roles?: RelationshipRole[]
  scenarios?: OnboardingScenario[]
  conditionalDisplay?: {
    field: string
    value: any
  }
}

interface EnhancedDynamicFormProps {
  formId: string
  title: string
  description?: string
  sections: FormSection[]
  onSubmit: (data: any) => Promise<void>
  onSaveDraft: (data: any) => Promise<void>
  savedData?: any
  className?: string
  entityType?: EntityType
  role?: RelationshipRole
  scenario?: OnboardingScenario
  jurisdiction?: string
  isRegulatory?: boolean
  showComplianceInfo?: boolean
}

export function EnhancedDynamicForm({
  formId,
  title,
  description,
  sections,
  onSubmit,
  onSaveDraft,
  savedData,
  className,
  entityType,
  role,
  scenario,
  jurisdiction,
  isRegulatory = false,
  showComplianceInfo = false,
}: EnhancedDynamicFormProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [filteredSections, setFilteredSections] = useState<FormSection[]>(sections)

  // Filter sections based on entity type, role, and scenario
  useEffect(() => {
    const filtered = sections.filter((section) => {
      // If section has no filters, always include it
      if (!section.entityTypes && !section.roles && !section.scenarios) {
        return true
      }

      // Check entity type compatibility
      const entityTypeMatch = !section.entityTypes || !entityType || section.entityTypes.includes(entityType)

      // Check role compatibility
      const roleMatch = !section.roles || !role || section.roles.includes(role)

      // Check scenario compatibility
      const scenarioMatch = !section.scenarios || !scenario || section.scenarios.includes(scenario)

      return entityTypeMatch && roleMatch && scenarioMatch
    })

    setFilteredSections(filtered)

    // Reset active section if it's now out of bounds
    if (activeSection >= filtered.length) {
      setActiveSection(Math.max(0, filtered.length - 1))
    }
  }, [sections, entityType, role, scenario, activeSection])

  // Filter fields within sections based on entity type, role, and scenario
  const getFilteredFields = (section: FormSection) => {
    return section.fields.filter((field) => {
      // If field has no filters, always include it
      if (!field.entityTypes && !field.roles && !field.scenarios && !field.jurisdictions) {
        return true
      }

      // Check entity type compatibility
      const entityTypeMatch = !field.entityTypes || !entityType || field.entityTypes.includes(entityType)

      // Check role compatibility
      const roleMatch = !field.roles || !role || field.roles.includes(role)

      // Check scenario compatibility
      const scenarioMatch = !field.scenarios || !scenario || field.scenarios.includes(scenario)

      // Check jurisdiction compatibility
      const jurisdictionMatch = !field.jurisdictions || !jurisdiction || field.jurisdictions.includes(jurisdiction)

      return entityTypeMatch && roleMatch && scenarioMatch && jurisdictionMatch
    })
  }

  // Build dynamic schema based on filtered form fields
  const generateSchema = () => {
    const schemaMap: Record<string, any> = {}

    filteredSections.forEach((section) => {
      const filteredFields = getFilteredFields(section)

      filteredFields.forEach((field) => {
        let fieldSchema: any = z.any()

        switch (field.type) {
          case "text":
            fieldSchema = z.string()
            if (field.validation?.minLength)
              fieldSchema = fieldSchema.min(field.validation.minLength, {
                message: `Must be at least ${field.validation.minLength} characters`,
              })
            if (field.validation?.maxLength)
              fieldSchema = fieldSchema.max(field.validation.maxLength, {
                message: `Must be at most ${field.validation.maxLength} characters`,
              })
            if (field.validation?.pattern)
              fieldSchema = fieldSchema.regex(new RegExp(field.validation.pattern), {
                message: field.validation.patternMessage || "Invalid format",
              })
            break
          case "email":
            fieldSchema = z.string().email({ message: "Invalid email address" })
            break
          case "number":
          case "percentage":
            fieldSchema = z.number()
            if (field.validation?.min !== undefined)
              fieldSchema = fieldSchema.min(field.validation.min, {
                message: `Must be at least ${field.validation.min}`,
              })
            if (field.validation?.max !== undefined)
              fieldSchema = fieldSchema.max(field.validation.max, {
                message: `Must be at most ${field.validation.max}`,
              })
            break
          case "date":
            fieldSchema = z.string()
            break
          case "phone":
            fieldSchema = z.string()
            if (field.validation?.pattern)
              fieldSchema = fieldSchema.regex(new RegExp(field.validation.pattern), {
                message: field.validation.patternMessage || "Invalid phone number format",
              })
            break
          case "checkbox":
            fieldSchema = z.boolean().optional()
            break
          case "select":
          case "radio":
          case "country":
          case "jurisdiction":
          case "currency":
          case "entity-search":
          case "relationship-select":
            fieldSchema = z.string()
            break
          case "multi-select":
            fieldSchema = z.array(z.string()).min(1, { message: "Select at least one option" })
            break
          case "textarea":
            fieldSchema = z.string()
            if (field.validation?.maxLength)
              fieldSchema = fieldSchema.max(field.validation.maxLength, {
                message: `Must be at most ${field.validation.maxLength} characters`,
              })
            break
          case "address":
            fieldSchema = z.object({
              street: z.string().min(1, { message: "Street is required" }),
              city: z.string().min(1, { message: "City is required" }),
              state: z.string().optional(),
              postalCode: z.string().min(1, { message: "Postal code is required" }),
              country: z.string().min(1, { message: "Country is required" }),
            })
            break
          case "file-upload":
            fieldSchema = z.any() // File validation handled separately
            break
        }

        if (field.required) {
          if (field.type === "checkbox") {
            fieldSchema = fieldSchema.refine((val) => val === true, {
              message: "This field is required",
            })
          } else {
            fieldSchema = fieldSchema.refine((val) => val !== undefined && val !== null && val !== "", {
              message: "This field is required",
            })
          }
        } else {
          fieldSchema = fieldSchema.optional()
        }

        schemaMap[field.id] = fieldSchema
      })
    })

    return z.object(schemaMap)
  }

  const formSchema = generateSchema()

  // Initialize form with saved data or defaults
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: savedData || {},
  })

  // Load saved data when available
  useEffect(() => {
    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        form.setValue(key, savedData[key])
      })

      // Find the last incomplete section
      let lastIncompleteSection = filteredSections.length - 1
      for (let i = filteredSections.length - 1; i >= 0; i--) {
        const sectionFields = getFilteredFields(filteredSections[i])
        const allFieldsFilled = sectionFields.every((field) => {
          return !field.required || (savedData[field.id] !== undefined && savedData[field.id] !== "")
        })

        if (!allFieldsFilled) {
          lastIncompleteSection = i
          break
        }
      }

      setActiveSection(lastIncompleteSection)
    }
  }, [savedData, form, filteredSections])

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleSaveDraft()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleSaveDraft = async () => {
    const formData = form.getValues()
    setIsSaving(true)

    try {
      await onSaveDraft(formData)
      setLastSaved(new Date())
    } catch (error) {
      console.error("Failed to save draft:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      await onSubmit(data)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextSection = () => {
    if (activeSection >= filteredSections.length - 1) return

    const currentSectionFields = getFilteredFields(filteredSections[activeSection])
    const formData = form.getValues()

    // Check if all required fields in current section are filled
    const allRequiredFieldsFilled = currentSectionFields
      .filter((field) => field.required)
      .every((field) => {
        const value = formData[field.id]
        return value !== undefined && value !== null && value !== ""
      })

    if (allRequiredFieldsFilled) {
      setActiveSection((prev) => Math.min(prev + 1, filteredSections.length - 1))
      window.scrollTo(0, 0)
    } else {
      // Trigger validation for the current section fields
      currentSectionFields.forEach((field) => {
        form.trigger(field.id)
      })
    }
  }

  const prevSection = () => {
    setActiveSection((prev) => Math.max(prev - 1, 0))
    window.scrollTo(0, 0)
  }

  // Check if a field should be shown based on dependencies
  const shouldShowField = (field: FormFieldDefinition) => {
    if (!field.dependsOn) return true

    const dependentValue = form.getValues(field.dependsOn.field)
    return dependentValue === field.dependsOn.value
  }

  // Render the appropriate form control based on field type
  const renderFormControl = (field: FormFieldDefinition, formField: any) => {
    switch (field.type) {
      case "text":
      case "email":
      case "date":
      case "phone":
        return (
          <Input {...formField} type={field.type === "phone" ? "tel" : field.type} placeholder={field.placeholder} />
        )

      case "number":
        return (
          <Input
            {...formField}
            type="number"
            placeholder={field.placeholder}
            onChange={(e) => formField.onChange(e.target.valueAsNumber)}
          />
        )

      case "percentage":
        return (
          <div className="relative">
            <Input
              {...formField}
              type="number"
              placeholder={field.placeholder}
              onChange={(e) => formField.onChange(e.target.valueAsNumber)}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
        )

      case "textarea":
        return <Textarea {...formField} placeholder={field.placeholder} />

      case "select":
      case "country":
      case "jurisdiction":
      case "currency":
        return (
          <Select onValueChange={formField.onChange} defaultValue={formField.value}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "radio":
        return (
          <RadioGroup
            onValueChange={formField.onChange}
            defaultValue={formField.value}
            className="flex flex-col space-y-1"
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                <label htmlFor={`${field.id}-${option.value}`} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        )

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox checked={formField.value} onCheckedChange={formField.onChange} id={field.id} />
            <label htmlFor={field.id} className="text-sm text-slate-500">
              {field.placeholder}
            </label>
          </div>
        )

      case "multi-select":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  checked={(formField.value || []).includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = formField.value || []
                    const newValues = checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((value: string) => value !== option.value)
                    formField.onChange(newValues)
                  }}
                  id={`${field.id}-${option.value}`}
                />
                <label htmlFor={`${field.id}-${option.value}`} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )

      case "entity-search":
      case "relationship-select":
        // These would be implemented with custom components in a real application
        return (
          <Select onValueChange={formField.onChange} defaultValue={formField.value}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Select..."} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "file-upload":
        // This would be implemented with a custom file upload component
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <p className="text-sm text-gray-500">File upload would be implemented here</p>
          </div>
        )

      case "address":
        // This would be implemented with a custom address component
        return (
          <div className="space-y-2">
            <Input
              placeholder="Street address"
              value={formField.value?.street || ""}
              onChange={(e) => formField.onChange({ ...formField.value, street: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="City"
                value={formField.value?.city || ""}
                onChange={(e) => formField.onChange({ ...formField.value, city: e.target.value })}
              />
              <Input
                placeholder="State/Province"
                value={formField.value?.state || ""}
                onChange={(e) => formField.onChange({ ...formField.value, state: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Postal code"
                value={formField.value?.postalCode || ""}
                onChange={(e) => formField.onChange({ ...formField.value, postalCode: e.target.value })}
              />
              <Select
                value={formField.value?.country || ""}
                onValueChange={(value) => formField.onChange({ ...formField.value, country: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  {/* More countries would be added here */}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (filteredSections.length === 0) {
    return (
      <Card className={cn("border-stone-200/70", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No applicable form sections</AlertTitle>
            <AlertDescription>
              There are no form sections applicable to the selected entity type and scenario.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("border-stone-200/70", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>

          {entityType && (
            <Badge variant="outline" className="text-xs">
              {entityType.replace("-", " ")}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2 mt-4">
          {filteredSections.map((section, index) => (
            <div
              key={section.id}
              className={cn(
                "h-2 rounded-full transition-all",
                index <= activeSection ? "bg-blue-500" : "bg-slate-200",
                index === activeSection ? "flex-grow" : "w-8",
              )}
            />
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {showComplianceInfo && isRegulatory && (
          <Alert className="mb-6 bg-amber-50 border-amber-200">
            <Info className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Regulatory Requirement</AlertTitle>
            <AlertDescription className="text-amber-700">
              This information is required for regulatory compliance purposes. Accurate and complete information is
              essential.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-medium text-slate-800">{filteredSections[activeSection].title}</h3>
          {filteredSections[activeSection].description && (
            <p className="text-sm text-slate-500 mt-1">{filteredSections[activeSection].description}</p>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {getFilteredFields(filteredSections[activeSection]).map(
              (field) =>
                shouldShowField(field) && (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={field.id}
                    render={({ field: formField }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                            {field.regulatoryRequirement && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-xs bg-amber-50 text-amber-800 border-amber-200"
                              >
                                Regulatory
                              </Badge>
                            )}
                          </FormLabel>

                          {field.helpText && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-slate-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>{field.helpText}</p>
                                  {field.infoLink && (
                                    <a href={field.infoLink} className="text-blue-500 text-xs block mt-1">
                                      Learn more
                                    </a>
                                  )}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>

                        <FormControl>{renderFormControl(field, formField)}</FormControl>

                        {field.description && <FormDescription>{field.description}</FormDescription>}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ),
            )}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center space-x-2">
          <Button type="button" variant="outline" size="sm" onClick={handleSaveDraft} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </>
            )}
          </Button>

          {lastSaved && <span className="text-xs text-slate-500">Last saved: {lastSaved.toLocaleTimeString()}</span>}
        </div>

        <div className="flex space-x-2">
          {activeSection > 0 && (
            <Button type="button" variant="outline" onClick={prevSection}>
              Previous
            </Button>
          )}

          {activeSection < filteredSections.length - 1 ? (
            <Button type="button" onClick={nextSection}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
