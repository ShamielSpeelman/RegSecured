"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  clientType: z.enum(["individual", "entity"], {
    required_error: "Please select a client type",
  }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).optional(),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).optional(),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }).optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  primaryJurisdiction: z.string({
    required_error: "Please select a primary jurisdiction",
  }),
  riskCategory: z.enum(["low", "medium", "high"], {
    required_error: "Please select an initial risk category",
  }),
  productTypes: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one product",
  }),
  notes: z.string().optional(),
  consentObtained: z.boolean().refine((val) => val === true, {
    message: "You must confirm client consent has been obtained",
  }),
})

export function OnboardingInitiationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientType: "individual",
      email: "",
      phone: "",
      primaryJurisdiction: "",
      riskCategory: "low",
      productTypes: [],
      notes: "",
      consentObtained: false,
    },
  })

  const clientType = form.watch("clientType")

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log(values)
      setIsSuccess(true)
      toast({
        title: "Onboarding request created",
        description: `Onboarding request for ${clientType === "individual" ? values.firstName + " " + values.lastName : values.companyName} has been initiated.`,
      })
    } catch (err) {
      setError("There was an error creating the onboarding request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Onboarding Request Created</AlertTitle>
        <AlertDescription className="text-green-700">
          The onboarding request has been successfully created. You can track its progress in the Status Tracking
          section.
        </AlertDescription>
        <div className="mt-4">
          <Button
            onClick={() => {
              setIsSuccess(false)
              form.reset()
            }}
          >
            Create Another Request
          </Button>
        </div>
      </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="clientType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="entity">Entity/Organization</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select whether this is an individual or an entity/organization.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {clientType === "individual" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corporation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="client@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="primaryJurisdiction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Jurisdiction</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select jurisdiction" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="hk">Hong Kong</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the primary jurisdiction for regulatory compliance.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="riskCategory"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Initial Risk Category</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="low" />
                    </FormControl>
                    <FormLabel className="font-normal">Low Risk</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="medium" />
                    </FormControl>
                    <FormLabel className="font-normal">Medium Risk</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="high" />
                    </FormControl>
                    <FormLabel className="font-normal">High Risk</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Select an initial risk category based on your preliminary assessment.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productTypes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Product Types</FormLabel>
                <FormDescription>Select all products the client is interested in.</FormDescription>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Investment Account",
                  "Wealth Management",
                  "Corporate Banking",
                  "Credit Facility",
                  "Trade Finance",
                  "Treasury Services",
                ].map((product) => (
                  <FormField
                    key={product}
                    control={form.control}
                    name="productTypes"
                    render={({ field }) => {
                      return (
                        <FormItem key={product} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(product)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, product])
                                  : field.onChange(field.value?.filter((value) => value !== product))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{product}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional information about the client or specific requirements"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Optional notes to help with the onboarding process.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consentObtained"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I confirm that client consent for data processing has been obtained</FormLabel>
                <FormDescription>
                  You must confirm that the client has provided consent for their data to be processed in accordance
                  with regulatory requirements.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Onboarding Request"}
        </Button>
      </form>
    </Form>
  )
}
