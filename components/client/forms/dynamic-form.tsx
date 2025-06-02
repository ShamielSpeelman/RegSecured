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
import { Loader2, Save, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type FieldType = "text" | "email" | "number" | "date" | "textarea" | "select" | "radio" | "checkbox" | "phone"

export type FormFieldDefinition = {
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
}

export type FormSection = {
  id: string
  title: string
  description?: string
  fields: FormFieldDefinition[]
}

interface DynamicFormProps {
  formId: string
  title: string
  description?: string
  sections: FormSection[]
  onSubmit: (data: any) => Promise<void>
  onSaveDraft: (data: any) => Promise<void>
  savedData?: any
  className?: string
}

export function DynamicForm({
  formId,
  title,
  description,
  sections,
  onSubmit,
  onSaveDraft,
  savedData,
  className,
}: DynamicFormProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Build dynamic schema based on form fields
  const generateSchema = () => {
    const schemaMap: Record<string, any> = {}

    sections.forEach((section) => {
      section.fields.forEach((field) => {
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
            fieldSchema = z.string()
            break
          case "textarea":
            fieldSchema = z.string()
            if (field.validation?.maxLength)
              fieldSchema = fieldSchema.max(field.validation.maxLength, {
                message: `Must be at most ${field.validation.maxLength} characters`,
              })
            break
        }

        if (field.required) {
          fieldSchema = fieldSchema.refine((val) => val !== undefined && val !== null && val !== "", {
            message: "This field is required",
          })
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
      let lastIncompleteSection = sections.length - 1
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionFields = sections[i].fields
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
  }, [savedData, form, sections])

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
    const currentSectionFields = sections[activeSection].fields
    const formData = form.getValues()

    // Check if all required fields in current section are filled
    const allRequiredFieldsFilled = currentSectionFields
      .filter((field) => field.required)
      .every((field) => {
        const value = formData[field.id]
        return value !== undefined && value !== null && value !== ""
      })

    if (allRequiredFieldsFilled) {
      setActiveSection((prev) => Math.min(prev + 1, sections.length - 1))
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

  return (
    <Card className={cn("border-stone-200/70", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}

        <div className="flex items-center space-x-2 mt-4">
          {sections.map((section, index) => (
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
        <div className="mb-6">
          <h3 className="text-lg font-medium text-slate-800">{sections[activeSection].title}</h3>
          {sections[activeSection].description && (
            <p className="text-sm text-slate-500 mt-1">{sections[activeSection].description}</p>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {sections[activeSection].fields.map(
              (field) =>
                shouldShowField(field) && (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={field.id}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </FormLabel>

                        <FormControl>
                          {field.type === "text" ||
                          field.type === "email" ||
                          field.type === "date" ||
                          field.type === "phone" ? (
                            <Input
                              {...formField}
                              type={field.type === "phone" ? "tel" : field.type}
                              placeholder={field.placeholder}
                            />
                          ) : field.type === "number" ? (
                            <Input
                              {...formField}
                              type="number"
                              placeholder={field.placeholder}
                              onChange={(e) => formField.onChange(e.target.valueAsNumber)}
                            />
                          ) : field.type === "textarea" ? (
                            <Textarea {...formField} placeholder={field.placeholder} />
                          ) : field.type === "select" ? (
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
                          ) : field.type === "radio" ? (
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
                          ) : field.type === "checkbox" ? (
                            <div className="flex items-center space-x-2">
                              <Checkbox checked={formField.value} onCheckedChange={formField.onChange} id={field.id} />
                              <label htmlFor={field.id} className="text-sm text-slate-500">
                                {field.placeholder}
                              </label>
                            </div>
                          ) : null}
                        </FormControl>

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

          {activeSection < sections.length - 1 ? (
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
                "Submit Application"
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
