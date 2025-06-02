"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  OnboardingProgressTracker,
  type OnboardingStep,
} from "@/components/client/onboarding/onboarding-progress-tracker"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Edit, FileText, User, Home, Briefcase, AlertTriangle } from "lucide-react"

// Mock onboarding steps for the progress tracker
const onboardingSteps: OnboardingStep[] = [
  {
    id: "personal-info",
    title: "Personal Information",
    description: "Complete your basic personal details",
    status: "completed",
    link: "/client/onboarding/forms?step=personal-info",
  },
  {
    id: "identity-verification",
    title: "Identity Verification",
    description: "Upload identification documents for verification",
    status: "completed",
    link: "/client/onboarding/documents?category=identity",
  },
  {
    id: "address-verification",
    title: "Address Verification",
    description: "Provide proof of address documentation",
    status: "completed",
    link: "/client/onboarding/documents?category=address",
  },
  {
    id: "financial-information",
    title: "Financial Information",
    description: "Share details about your financial situation",
    status: "completed",
    link: "/client/onboarding/forms?step=financial-info",
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment",
    description: "Complete the risk profile questionnaire",
    status: "completed",
    link: "/client/onboarding/forms?step=risk-assessment",
  },
  {
    id: "review-submit",
    title: "Review & Submit",
    description: "Review all information and submit your application",
    status: "in-progress",
    link: "/client/onboarding/review",
  },
]

// Mock personal information data
const personalInfo = {
  title: "Mr.",
  firstName: "John",
  middleName: "",
  lastName: "Doe",
  dateOfBirth: "1985-06-15",
  nationality: "United States",
  email: "john.doe@example.com",
  phoneNumber: "+1 (555) 123-4567",
  alternativePhone: "",
  addressLine1: "123 Main Street",
  addressLine2: "Apt 4B",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  country: "United States",
}

// Mock document information
const documents = [
  {
    id: "passport",
    title: "Passport",
    status: "approved",
    uploadDate: "May 15, 2025",
    verificationDate: "May 16, 2025",
  },
  {
    id: "utility-bill",
    title: "Utility Bill",
    status: "approved",
    uploadDate: "May 15, 2025",
    verificationDate: "May 16, 2025",
  },
]

// Mock financial information
const financialInfo = {
  employmentStatus: "Employed",
  occupation: "Software Engineer",
  employerName: "Tech Solutions Inc.",
  industryType: "Technology",
  annualIncome: "$100,000 - $149,999",
  incomeSource: "Salary",
  wealthSource: "Employment Income",
  wealthDescription: "Primary source of wealth is from employment income and investments in stocks and mutual funds.",
}

// Mock risk assessment information
const riskAssessment = {
  investmentExperience: "Moderate (3-5 years)",
  riskTolerance: "Moderate - Balance between risk and return",
  investmentHorizon: "Long-term (5+ years)",
  politicallyExposed: "No",
  expectedTransactionFrequency: "Monthly",
  expectedTransactionAmount: "$10,000 - $50,000",
  expectedCountries: "United States, Canada, United Kingdom",
}

export default function ReviewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [accuracyAccepted, setAccuracyAccepted] = useState(false)

  const handleSubmit = async () => {
    if (!termsAccepted || !privacyAccepted || !accuracyAccepted) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to submit the application
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      window.location.href = "/client/onboarding/status"
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const allCheckboxesChecked = termsAccepted && privacyAccepted && accuracyAccepted

  return (
    <DashboardLayout userRole="client">
      <div className="p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/client/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">My Onboarding</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Review & Submit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Review & Submit</h1>
          <p className="text-slate-600 font-light">
            Please review all your information before submitting your application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="financial">Financial Information</TabsTrigger>
                <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="border-stone-200/70">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" asChild>
                      <a href="/client/onboarding/forms?step=personal-info">
                        <Edit className="h-4 w-4" />
                        Edit
                      </a>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Full Name</p>
                        <p className="text-sm text-slate-800">
                          {personalInfo.title} {personalInfo.firstName} {personalInfo.middleName}{" "}
                          {personalInfo.lastName}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Date of Birth</p>
                        <p className="text-sm text-slate-800">{personalInfo.dateOfBirth}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Nationality</p>
                        <p className="text-sm text-slate-800">{personalInfo.nationality}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Email Address</p>
                        <p className="text-sm text-slate-800">{personalInfo.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Phone Number</p>
                        <p className="text-sm text-slate-800">{personalInfo.phoneNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Alternative Phone</p>
                        <p className="text-sm text-slate-800">{personalInfo.alternativePhone || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-slate-700 mb-2">Residential Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500">Address Line 1</p>
                          <p className="text-sm text-slate-800">{personalInfo.addressLine1}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500">Address Line 2</p>
                          <p className="text-sm text-slate-800">{personalInfo.addressLine2 || "Not provided"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500">City</p>
                          <p className="text-sm text-slate-800">{personalInfo.city}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500">State/Province</p>
                          <p className="text-sm text-slate-800">{personalInfo.state}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500">Postal Code</p>
                          <p className="text-sm text-slate-800">{personalInfo.postalCode}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500">Country</p>
                          <p className="text-sm text-slate-800">{personalInfo.country}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card className="border-stone-200/70">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Uploaded Documents</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" asChild>
                      <a href="/client/onboarding/documents">
                        <Edit className="h-4 w-4" />
                        Edit
                      </a>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-start border-b border-slate-100 pb-4">
                          <div className="bg-slate-100 p-2 rounded mr-4">
                            <FileText className="h-6 w-6 text-slate-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-slate-800">{doc.title}</h3>
                              <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Approved
                              </span>
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                              <p>Uploaded: {doc.uploadDate}</p>
                              <p>Verified: {doc.verificationDate}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financial">
                <Card className="border-stone-200/70">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Financial Information</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" asChild>
                      <a href="/client/onboarding/forms?step=financial-info">
                        <Edit className="h-4 w-4" />
                        Edit
                      </a>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Employment Status</p>
                        <p className="text-sm text-slate-800">{financialInfo.employmentStatus}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Occupation</p>
                        <p className="text-sm text-slate-800">{financialInfo.occupation}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Employer Name</p>
                        <p className="text-sm text-slate-800">{financialInfo.employerName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Industry</p>
                        <p className="text-sm text-slate-800">{financialInfo.industryType}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Annual Income</p>
                        <p className="text-sm text-slate-800">{financialInfo.annualIncome}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Primary Source of Income</p>
                        <p className="text-sm text-slate-800">{financialInfo.incomeSource}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-slate-700 mb-2">Source of Wealth</h3>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Primary Source of Wealth</p>
                        <p className="text-sm text-slate-800">{financialInfo.wealthSource}</p>
                      </div>
                      <div className="space-y-1 mt-2">
                        <p className="text-sm font-medium text-slate-500">Wealth Description</p>
                        <p className="text-sm text-slate-800">{financialInfo.wealthDescription}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risk">
                <Card className="border-stone-200/70">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Risk Assessment</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" asChild>
                      <a href="/client/onboarding/forms?step=risk-assessment">
                        <Edit className="h-4 w-4" />
                        Edit
                      </a>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Investment Experience</p>
                        <p className="text-sm text-slate-800">{riskAssessment.investmentExperience}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Risk Tolerance</p>
                        <p className="text-sm text-slate-800">{riskAssessment.riskTolerance}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Investment Time Horizon</p>
                        <p className="text-sm text-slate-800">{riskAssessment.investmentHorizon}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500">Politically Exposed Person</p>
                        <p className="text-sm text-slate-800">{riskAssessment.politicallyExposed}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-slate-700 mb-2">Expected Transaction Profile</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500">Transaction Frequency</p>
                          <p className="text-sm text-slate-800">{riskAssessment.expectedTransactionFrequency}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500">Average Transaction Amount</p>
                          <p className="text-sm text-slate-800">{riskAssessment.expectedTransactionAmount}</p>
                        </div>
                      </div>
                      <div className="space-y-1 mt-2">
                        <p className="text-sm font-medium text-slate-500">Expected Countries</p>
                        <p className="text-sm text-slate-800">{riskAssessment.expectedCountries}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="border-stone-200/70 mt-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-top space-x-2">
                    <Checkbox id="terms" checked={termsAccepted} onCheckedChange={setTermsAccepted} />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Terms and Conditions
                      </label>
                      <p className="text-xs text-slate-500">
                        I have read and agree to the{" "}
                        <a
                          href="/legal/terms"
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Terms and Conditions
                        </a>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex items-top space-x-2">
                    <Checkbox id="privacy" checked={privacyAccepted} onCheckedChange={setPrivacyAccepted} />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="privacy"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Privacy Policy
                      </label>
                      <p className="text-xs text-slate-500">
                        I have read and agree to the{" "}
                        <a
                          href="/legal/privacy"
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex items-top space-x-2">
                    <Checkbox id="accuracy" checked={accuracyAccepted} onCheckedChange={setAccuracyAccepted} />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="accuracy"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Information Accuracy
                      </label>
                      <p className="text-xs text-slate-500">
                        I confirm that all information provided is accurate, complete, and true to the best of my
                        knowledge.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" asChild>
                    <a href="/client/onboarding/forms?step=risk-assessment">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </a>
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !allCheckboxesChecked}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <OnboardingProgressTracker steps={onboardingSteps} currentStepId="review-submit" />

            <Card className="border-stone-200/70 mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Personal Information</p>
                    <p className="text-xs text-slate-500">Complete</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Documents</p>
                    <p className="text-xs text-slate-500">2 documents verified</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Address Verification</p>
                    <p className="text-xs text-slate-500">Complete</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Financial Information</p>
                    <p className="text-xs text-slate-500">Complete</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Important Notice</p>
                      <p className="text-xs text-slate-500 mt-1">
                        After submission, your application will be reviewed by our compliance team. This process
                        typically takes 1-2 business days. You will be notified once the review is complete.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
