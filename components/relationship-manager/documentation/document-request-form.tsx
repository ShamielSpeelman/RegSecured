"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, Info, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const clients = [
  { label: "Acme Corporation", value: "acme" },
  { label: "Globex Industries", value: "globex" },
  { label: "Initech Technologies", value: "initech" },
  { label: "Massive Dynamic", value: "massive" },
  { label: "Stark Industries", value: "stark" },
  { label: "Wayne Enterprises", value: "wayne" },
  { label: "Umbrella Corporation", value: "umbrella" },
  { label: "Cyberdyne Systems", value: "cyberdyne" },
  { label: "Soylent Corp", value: "soylent" },
  { label: "Weyland-Yutani", value: "weyland" },
]

const documentTypes = [
  { id: "kyc", label: "KYC Documents" },
  { id: "aml", label: "AML Documents" },
  { id: "tax", label: "Tax Documents" },
  { id: "legal", label: "Legal Documents" },
  { id: "financial", label: "Financial Statements" },
  { id: "regulatory", label: "Regulatory Filings" },
  { id: "ownership", label: "Ownership Structure" },
  { id: "identification", label: "Identification Documents" },
  { id: "address", label: "Address Verification" },
  { id: "business", label: "Business Registration" },
]

const formSchema = z.object({
  client: z.string({
    required_error: "Please select a client.",
  }),
  documentType: z.string({
    required_error: "Please select a document type.",
  }),
  documentSubtype: z.string({
    required_error: "Please select a document subtype.",
  }),
  dueDate: z.date({
    required_error: "Please select a due date.",
  }),
  priority: z.string({
    required_error: "Please select a priority level.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  requestReason: z.string().min(5, {
    message: "Request reason must be at least 5 characters.",
  }),
  selectedDocuments: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one document.",
  }),
  sendNotification: z.boolean().default(true),
  scheduleReminders: z.boolean().default(true),
  requireSignature: z.boolean().default(false),
})

export function DocumentRequestForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      requestReason: "",
      selectedDocuments: [],
      sendNotification: true,
      scheduleReminders: true,
      requireSignature: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Reset form or show success message
      form.reset()
    }, 1500)
  }

  const templates = [
    {
      id: "annual-review",
      name: "Annual Review Documents",
      description: "Standard document package for annual client reviews",
      documents: ["Proof of Address", "Financial Statements", "Tax Returns", "Ownership Declaration"],
      dueDate: 30, // days
      priority: "medium",
    },
    {
      id: "kyc-refresh",
      name: "KYC Refresh Package",
      description: "Complete KYC refresh documentation package",
      documents: ["ID Verification", "Proof of Address", "Source of Funds", "Beneficial Ownership"],
      dueDate: 14, // days
      priority: "high",
    },
    {
      id: "regulatory-filing",
      name: "Regulatory Filing Package",
      description: "Documents required for regulatory compliance filing",
      documents: ["Compliance Certification", "Risk Assessment", "Regulatory Forms", "Audit Reports"],
      dueDate: 21, // days
      priority: "high",
    },
    {
      id: "enhanced-due-diligence",
      name: "Enhanced Due Diligence",
      description: "Additional documentation for high-risk clients",
      documents: ["Source of Wealth", "Transaction History", "Business Activities", "Third-Party Relationships"],
      dueDate: 10, // days
      priority: "critical",
    },
  ]

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = templates.find((t) => t.id === templateId)

    if (template) {
      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + template.dueDate)

      form.setValue("documentType", "template")
      form.setValue("description", template.description)
      form.setValue("dueDate", dueDate)
      form.setValue("priority", template.priority)
      form.setValue("selectedDocuments", template.documents)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Documents</CardTitle>
        <CardDescription>Create a new document request for a client or select from templates</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="custom" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="custom">Custom Request</TabsTrigger>
            <TabsTrigger value="template">Use Template</TabsTrigger>
          </TabsList>
          <TabsContent value="template" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    selectedTemplate === template.id ? "border-primary bg-primary/5" : "hover:border-primary/50",
                  )}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    {selectedTemplate === template.id && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground">Documents included:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.documents.map((doc) => (
                        <Badge key={doc} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <span>Due in {template.dueDate} days</span>
                    <span
                      className={cn(
                        "font-medium",
                        template.priority === "critical"
                          ? "text-red-500"
                          : template.priority === "high"
                            ? "text-amber-500"
                            : "text-blue-500",
                      )}
                    >
                      {template.priority.charAt(0).toUpperCase() + template.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {selectedTemplate && (
              <div className="pt-4">
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Select Client</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                            >
                              {field.value
                                ? clients.find((client) => client.value === field.value)?.label
                                : "Select client"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Search clients..." />
                            <CommandList>
                              <CommandEmpty>No client found.</CommandEmpty>
                              <CommandGroup>
                                {clients.map((client) => (
                                  <CommandItem
                                    value={client.label}
                                    key={client.value}
                                    onSelect={() => {
                                      form.setValue("client", client.value)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        client.value === field.value ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {client.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end mt-6">
                  <Button type="button" onClick={() => form.handleSubmit(onSubmit)()} disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Request
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="custom" className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Client</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                              >
                                {field.value
                                  ? clients.find((client) => client.value === field.value)?.label
                                  : "Select client"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0">
                            <Command>
                              <CommandInput placeholder="Search clients..." />
                              <CommandList>
                                <CommandEmpty>No client found.</CommandEmpty>
                                <CommandGroup>
                                  {clients.map((client) => (
                                    <CommandItem
                                      value={client.label}
                                      key={client.value}
                                      onSelect={() => {
                                        form.setValue("client", client.value)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          client.value === field.value ? "opacity-100" : "opacity-0",
                                        )}
                                      />
                                      {client.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select document category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="kyc">KYC Documents</SelectItem>
                            <SelectItem value="aml">AML Documents</SelectItem>
                            <SelectItem value="tax">Tax Documents</SelectItem>
                            <SelectItem value="legal">Legal Documents</SelectItem>
                            <SelectItem value="financial">Financial Statements</SelectItem>
                            <SelectItem value="regulatory">Regulatory Filings</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="documentSubtype"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="id">Identification Documents</SelectItem>
                            <SelectItem value="address">Proof of Address</SelectItem>
                            <SelectItem value="income">Proof of Income</SelectItem>
                            <SelectItem value="wealth">Source of Wealth</SelectItem>
                            <SelectItem value="business">Business Registration</SelectItem>
                            <SelectItem value="ownership">Ownership Structure</SelectItem>
                            <SelectItem value="financial">Financial Statements</SelectItem>
                            <SelectItem value="tax">Tax Returns</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
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
                              disabled={(date) =>
                                date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 6))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide details about the document request..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Request Reason
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This will be visible to the client</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Explain why these documents are being requested..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a clear explanation that will be shared with the client.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="selectedDocuments"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Required Documents</FormLabel>
                        <FormDescription>Select the specific documents you need from the client.</FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {documentTypes.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="selectedDocuments"
                            render={({ field }) => {
                              return (
                                <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(field.value?.filter((value) => value !== item.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{item.label}</FormLabel>
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

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="sendNotification"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Send notification to client</FormLabel>
                          <FormDescription>Notify the client immediately about this document request.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scheduleReminders"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Schedule automatic reminders</FormLabel>
                          <FormDescription>Send periodic reminders until documents are submitted.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requireSignature"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Require electronic signature</FormLabel>
                          <FormDescription>
                            Client must electronically sign documents before submission.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Request
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// This component is used in the form but not exported
const Badge = ({
  children,
  variant,
  className,
}: { children: React.ReactNode; variant?: string; className?: string }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
        variant === "outline"
          ? "border-input bg-background text-foreground"
          : "border-primary bg-primary text-primary-foreground",
        className,
      )}
    >
      {children}
    </span>
  )
}

export default DocumentRequestForm
