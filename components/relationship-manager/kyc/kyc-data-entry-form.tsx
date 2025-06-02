"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, X, FileText, CheckCircle } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const individualFormSchema = z.object({
  // Personal Information
  title: z.string().optional(),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  nationality: z.string({
    required_error: "Nationality is required",
  }),
  countryOfResidence: z.string({
    required_error: "Country of residence is required",
  }),

  // Contact Information
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address1: z.string().min(1, { message: "Address line 1 is required" }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().optional(),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string({
    required_error: "Country is required",
  }),

  // Identification
  idType: z.string({
    required_error: "ID type is required",
  }),
  idNumber: z.string().min(1, { message: "ID number is required" }),
  idExpiryDate: z.date({
    required_error: "ID expiry date is required",
  }),

  // Employment & Financial Information
  employmentStatus: z.string({
    required_error: "Employment status is required",
  }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  employerName: z.string().optional(),
  annualIncome: z.string().min(1, { message: "Annual income is required" }),
  sourceOfFunds: z.string({
    required_error: "Source of funds is required",
  }),

  // Risk & Compliance
  isPep: z.boolean().default(false),
  pepDetails: z.string().optional(),
  isHighRiskCountry: z.boolean().default(false),
  highRiskCountryDetails: z.string().optional(),

  // Declarations
  taxResidency: z.string({
    required_error: "Tax residency is required",
  }),
  taxIdentificationNumber: z.string().min(1, { message: "Tax identification number is required" }),
  usCitizen: z.boolean().default(false),
  fatcaStatus: z.string().optional(),

  // Consent
  dataProcessingConsent: z.boolean().refine((val) => val === true, {
    message: "You must confirm client consent has been obtained",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Client must accept terms and conditions",
  }),
})

const entityFormSchema = z.object({
  // Entity Information
  legalName: z.string().min(2, { message: "Legal name must be at least 2 characters" }),
  tradingName: z.string().optional(),
  entityType: z.string({
    required_error: "Entity type is required",
  }),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  dateOfIncorporation: z.date({
    required_error: "Date of incorporation is required",
  }),
  countryOfIncorporation: z.string({
    required_error: "Country of incorporation is required",
  }),
  taxIdentificationNumber: z.string().min(1, { message: "Tax identification number is required" }),

  // Contact Information
  registeredAddress1: z.string().min(1, { message: "Registered address line 1 is required" }),
  registeredAddress2: z.string().optional(),
  registeredCity: z.string().min(1, { message: "City is required" }),
  registeredState: z.string().optional(),
  registeredPostalCode: z.string().min(1, { message: "Postal code is required" }),
  registeredCountry: z.string({
    required_error: "Country is required",
  }),

  businessAddress1: z.string().min(1, { message: "Business address line 1 is required" }),
  businessAddress2: z.string().optional(),
  businessCity: z.string().min(1, { message: "City is required" }),
  businessState: z.string().optional(),
  businessPostalCode: z.string().min(1, { message: "Postal code is required" }),
  businessCountry: z.string({
    required_error: "Country is required",
  }),

  contactPersonName: z.string().min(1, { message: "Contact person name is required" }),
  contactPersonEmail: z.string().email({ message: "Please enter a valid email address" }),
  contactPersonPhone: z.string().min(10, { message: "Please enter a valid phone number" }),

  // Business Information
  natureOfBusiness: z.string().min(1, { message: "Nature of business is required" }),
  industryCategory: z.string({
    required_error: "Industry category is required",
  }),
  annualRevenue: z.string().min(1, { message: "Annual revenue is required" }),
  numberOfEmployees: z.string().min(1, { message: "Number of employees is required" }),

  // Ownership Structure
  hasComplexStructure: z.boolean().default(false),
  structureDetails: z.string().optional(),
  listedOnExchange: z.boolean().default(false),
  exchangeDetails: z.string().optional(),

  // Risk & Compliance
  operatesInHighRiskCountry: z.boolean().default(false),
  highRiskCountryDetails: z.string().optional(),
  politicallyExposedOwnership: z.boolean().default(false),
  pepOwnershipDetails: z.string().optional(),

  // Declarations
  fatcaStatus: z.string({
    required_error: "FATCA status is required",
  }),

  // Consent
  dataProcessingConsent: z.boolean().refine((val) => val === true, {
    message: "You must confirm client consent has been obtained",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Client must accept terms and conditions",
  }),
})

export function KYCDataEntryForm() {
  const [clientType, setClientType] = useState<"individual" | "entity">("individual")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedDocuments, setUploadedDocuments] = useState<{ name: string; type: string }[]>([])

  const individualForm = useForm<z.infer<typeof individualFormSchema>>({
    resolver: zodResolver(individualFormSchema),
    defaultValues: {
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      employmentStatus: "",
      occupation: "",
      employerName: "",
      annualIncome: "",
      sourceOfFunds: "",
      isPep: false,
      pepDetails: "",
      isHighRiskCountry: false,
      highRiskCountryDetails: "",
      taxResidency: "",
      taxIdentificationNumber: "",
      usCitizen: false,
      fatcaStatus: "",
      dataProcessingConsent: false,
      termsAccepted: false,
    },
  })

  const entityForm = useForm<z.infer<typeof entityFormSchema>>({
    resolver: zodResolver(entityFormSchema),
    defaultValues: {
      legalName: "",
      tradingName: "",
      entityType: "",
      registrationNumber: "",
      taxIdentificationNumber: "",
      registeredAddress1: "",
      registeredAddress2: "",
      registeredCity: "",
      registeredState: "",
      registeredPostalCode: "",
      registeredCountry: "",
      businessAddress1: "",
      businessAddress2: "",
      businessCity: "",
      businessState: "",
      businessPostalCode: "",
      businessCountry: "",
      contactPersonName: "",
      contactPersonEmail: "",
      contactPersonPhone: "",
      natureOfBusiness: "",
      industryCategory: "",
      annualRevenue: "",
      numberOfEmployees: "",
      hasComplexStructure: false,
      structureDetails: "",
      listedOnExchange: false,
      exchangeDetails: "",
      operatesInHighRiskCountry: false,
      highRiskCountryDetails: "",
      politicallyExposedOwnership: false,
      pepOwnershipDetails: "",
      fatcaStatus: "",
      dataProcessingConsent: false,
      termsAccepted: false,
    },
  })

  const onSubmitIndividual = async (values: z.infer<typeof individualFormSchema>) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log(values)
      setIsSuccess(true)
      toast({
        title: "KYC data submitted",
        description: `KYC information for ${values.firstName} ${values.lastName} has been saved.`,
      })
    } catch (err) {
      setError("There was an error submitting the KYC data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmitEntity = async (values: z.infer<typeof entityFormSchema>) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log(values)
      setIsSuccess(true)
      toast({
        title: "KYC data submitted",
        description: `KYC information for ${values.legalName} has been saved.`,
      })
    } catch (err) {
      setError("There was an error submitting the KYC data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const newDocuments = files.map((file) => ({
      name: file.name,
      type: file.type,
    }))
    setUploadedDocuments((prevDocuments) => [...prevDocuments, ...newDocuments])
  }

  const removeDocument = (index: number) => {
    setUploadedDocuments((prevDocuments) => prevDocuments.filter((_, i) => i !== index))
  }

  return (
    <Tabs defaultValue="individual" className="w-full">
      <TabsList>
        <TabsTrigger value="individual" onClick={() => setClientType("individual")}>
          Individual
        </TabsTrigger>
        <TabsTrigger value="entity" onClick={() => setClientType("entity")}>
          Entity
        </TabsTrigger>
      </TabsList>
      <TabsContent value="individual">
        <Form {...individualForm}>
          <form onSubmit={individualForm.handleSubmit(onSubmitIndividual)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={individualForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Middle Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={individualForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a nationality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={individualForm.control}
                name="countryOfResidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Residence</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={individualForm.control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Address 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="address2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address 2</FormLabel>
                    <FormControl>
                      <Input placeholder="Address 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={individualForm.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormField
                control={individualForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Identification */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={individualForm.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="driversLicense">Driver's License</SelectItem>
                        <SelectItem value="nationalId">National ID</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ID Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="idExpiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Expiry Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Employment & Financial Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={individualForm.control}
                name="employmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                        <SelectItem value="selfEmployed">Self-Employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="Occupation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="employerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Employer Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={individualForm.control}
                name="annualIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income</FormLabel>
                    <FormControl>
                      <Input placeholder="Annual Income" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="sourceOfFunds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source of Funds</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="investments">Investments</SelectItem>
                        <SelectItem value="businessIncome">Business Income</SelectItem>
                        <SelectItem value="inheritance">Inheritance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Risk & Compliance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={individualForm.control}
                name="isPep"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Is PEP (Politically Exposed Person)?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="pepDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PEP Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Details" value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={individualForm.control}
                name="isHighRiskCountry"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Is from High-Risk Country?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="highRiskCountryDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>High-Risk Country Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Details" value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Declarations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={individualForm.control}
                name="taxResidency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Residency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="taxIdentificationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Identification Number</FormLabel>
                    <FormControl>
                      <Input placeholder="TIN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="usCitizen"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>US Citizen?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormField
                control={individualForm.control}
                name="fatcaStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FATCA Status</FormLabel>
                    <FormControl>
                      <Input placeholder="FATCA Status" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Consent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={individualForm.control}
                name="dataProcessingConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Data Processing Consent</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Terms & Conditions Accepted</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Document Upload */}
            <div>
              <Label htmlFor="documentUpload">Upload Documents</Label>
              <Input type="file" id="documentUpload" multiple onChange={handleDocumentUpload} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-1">
                Supported formats: PDF, JPG, PNG. Max file size: 5MB.
              </p>

              {uploadedDocuments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Uploaded Documents:</h4>
                  <ul>
                    {uploadedDocuments.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          <span>{doc.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            {isSuccess && (
              <Alert variant="success" className="mt-4">
                <CheckCircle className="h-4 w-4 mr-2" />
                <AlertDescription>KYC data submitted successfully!</AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </TabsContent>

      {/* Entity Form */}
      <TabsContent value="entity">
        <Form {...entityForm}>
          <form onSubmit={entityForm.handleSubmit(onSubmitEntity)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {/* Entity Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={entityForm.control}
                name="legalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Legal Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="tradingName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trading Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Trading Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="entityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Entity Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={entityForm.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Registration Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="dateOfIncorporation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Incorporation</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="countryOfIncorporation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Incorporation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={entityForm.control}
                name="taxIdentificationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Identification Number</FormLabel>
                    <FormControl>
                      <Input placeholder="TIN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information - Registered Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={entityForm.control}
                name="registeredAddress1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered Address 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Address 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="registeredAddress2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered Address 2</FormLabel>
                    <FormControl>
                      <Input placeholder="Address 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={entityForm.control}
                name="registeredCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="registeredState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="registeredPostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormField
                control={entityForm.control}
                name="registeredCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information - Business Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={entityForm.control}
                name="businessAddress1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Address 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="businessAddress2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address 2</FormLabel>
                    <FormControl>
                      <Input placeholder="Address 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={entityForm.control}
                name="businessCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="businessState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="businessPostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormField
                control={entityForm.control}
                name="businessCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Person Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={entityForm.control}
                name="contactPersonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Person Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="contactPersonEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Person Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="contactPersonPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Person Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={entityForm.control}
                name="natureOfBusiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nature of Business</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nature of Business" value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="industryCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={entityForm.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Revenue</FormLabel>
                    <FormControl>
                      <Input placeholder="Annual Revenue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="numberOfEmployees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Employees</FormLabel>
                    <FormControl>
                      <Input placeholder="Number of Employees" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Ownership Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={entityForm.control}
                name="hasComplexStructure"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Has Complex Structure?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="structureDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Structure Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Details" value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={entityForm.control}
                name="listedOnExchange"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Listed on Exchange?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="exchangeDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exchange Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Details" value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Risk & Compliance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={entityForm.control}
                name="operatesInHighRiskCountry"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Operates in High-Risk Country?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="highRiskCountryDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>High-Risk Country Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Details" value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={entityForm.control}
                name="politicallyExposedOwnership"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Politically Exposed Ownership?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="pepOwnershipDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PEP Ownership Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Details" value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Declarations */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormField
                control={entityForm.control}
                name="fatcaStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FATCA Status</FormLabel>
                    <FormControl>
                      <Input placeholder="FATCA Status" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Consent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={entityForm.control}
                name="dataProcessingConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Data Processing Consent</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={entityForm.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Terms & Conditions Accepted</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Document Upload */}
            <div>
              <Label htmlFor="documentUpload">Upload Documents</Label>
              <Input type="file" id="documentUpload" multiple onChange={handleDocumentUpload} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-1">
                Supported formats: PDF, JPG, PNG. Max file size: 5MB.
              </p>

              {uploadedDocuments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Uploaded Documents:</h4>
                  <ul>
                    {uploadedDocuments.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          <span>{doc.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            {isSuccess && (
              <Alert variant="success" className="mt-4">
                <CheckCircle className="h-4 w-4 mr-2" />
                <AlertDescription>KYC data submitted successfully!</AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}
