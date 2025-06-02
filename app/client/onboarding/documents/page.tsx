"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { EnhancedDocumentManager } from "@/components/client/documents/enhanced-document-manager"
import {
  OnboardingProgressTracker,
  type OnboardingStep,
} from "@/components/client/onboarding/onboarding-progress-tracker"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { EntityType, OnboardingScenario, RelationshipRole } from "@/lib/types/entities"
import type { UploadedDocument } from "@/components/client/documents/enhanced-document-manager"

// Mock data - in real app this would come from API/context
const mockClientProfile = {
  entityType: "legal-entity" as EntityType,
  scenario: "direct-client" as OnboardingScenario,
  role: undefined as RelationshipRole | undefined,
  jurisdiction: "us",
  completedForms: ["company-information", "ubo-disclosure"],
}

const mockUploadedDocuments: UploadedDocument[] = [
  {
    id: "doc1",
    documentId: "certificate-of-incorporation",
    fileName: "certificate_of_incorporation.pdf",
    fileSize: 1240000,
    uploadDate: new Date(Date.now() - 86400000 * 2),
    status: "approved",
    previewUrl: "#",
  },
  {
    id: "doc2",
    documentId: "memorandum-articles",
    fileName: "memorandum_articles.pdf",
    fileSize: 2450000,
    uploadDate: new Date(Date.now() - 86400000),
    status: "reviewing",
    previewUrl: "#",
  },
  {
    id: "doc3",
    documentId: "board-resolution",
    fileName: "board_resolution.pdf",
    fileSize: 980000,
    uploadDate: new Date(Date.now() - 3600000 * 5),
    status: "rejected",
    rejectionReason: "The resolution must be dated within the last 6 months and include notarization.",
    previewUrl: "#",
  },
]

// Mock onboarding steps for legal entity
const legalEntityOnboardingSteps: OnboardingStep[] = [
  {
    id: "company-info",
    title: "Company Information",
    description: "Provide basic company details and registration information",
    status: "completed",
    link: "/client/onboarding/forms?step=company-info",
  },
  {
    id: "ubo-disclosure",
    title: "Beneficial Ownership",
    description: "Disclose ultimate beneficial owners and control structure",
    status: "completed",
    link: "/client/onboarding/forms?step=ubo-disclosure",
  },
  {
    id: "document-upload",
    title: "Document Upload",
    description: "Upload required corporate documents and certificates",
    status: "in-progress",
    link: "/client/onboarding/documents",
  },
  {
    id: "directors-officers",
    title: "Directors & Officers",
    description: "Provide information about board members and key personnel",
    status: "pending",
    link: "/client/onboarding/forms?step=directors-officers",
  },
  {
    id: "review-submit",
    title: "Review & Submit",
    description: "Review all information and submit your application",
    status: "pending",
    link: "/client/onboarding/review",
  },
]

export default function DocumentUploadPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")

  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(mockUploadedDocuments)

  const handleDocumentUpload = async (documentId: string, file: File) => {
    console.log(`Uploading file for document ${documentId}:`, file)

    // Simulate upload process
    const newDocument: UploadedDocument = {
      id: `doc-${Date.now()}`,
      documentId,
      fileName: file.name,
      fileSize: file.size,
      uploadDate: new Date(),
      status: "reviewing",
      previewUrl: "#",
    }

    // Remove existing document with same documentId if it exists
    setUploadedDocuments((prev) => prev.filter((doc) => doc.documentId !== documentId).concat(newDocument))

    // In a real app, this would call an API to upload the file
    // await uploadDocumentAPI(documentId, file)
  }

  const handleDocumentRemove = async (documentId: string) => {
    console.log(`Removing document ${documentId}`)

    setUploadedDocuments((prev) => prev.filter((doc) => doc.documentId !== documentId))

    // In a real app, this would call an API to remove the file
    // await removeDocumentAPI(documentId)
  }

  const handleDownloadTemplate = (templateId: string) => {
    console.log(`Downloading template ${templateId}`)
    // In a real app, this would download the template file
    // window.open(`/api/templates/${templateId}/download`, '_blank')
  }

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
              <BreadcrumbPage>Document Upload</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Document Upload</h1>
          <p className="text-slate-600 font-light">
            Upload required documents for your {mockClientProfile.entityType.replace("-", " ")} onboarding
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <EnhancedDocumentManager
              entityType={mockClientProfile.entityType}
              scenario={mockClientProfile.scenario}
              role={mockClientProfile.role}
              jurisdiction={mockClientProfile.jurisdiction}
              completedForms={mockClientProfile.completedForms}
              uploadedDocuments={uploadedDocuments}
              onDocumentUpload={handleDocumentUpload}
              onDocumentRemove={handleDocumentRemove}
              onDownloadTemplate={handleDownloadTemplate}
            />

            <div className="flex justify-between mt-8">
              <Button variant="outline" asChild>
                <a href="/client/onboarding/forms?step=ubo-disclosure">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </a>
              </Button>
              <Button asChild>
                <a href="/client/onboarding/forms?step=directors-officers">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <OnboardingProgressTracker steps={legalEntityOnboardingSteps} currentStepId="document-upload" />

            <Card className="border-stone-200/70 mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Document Upload Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-800">Document Requirements</h3>
                    <ul className="text-sm text-slate-600 mt-1 space-y-2 list-disc pl-4">
                      <li>All documents must be clear and legible</li>
                      <li>Corporate documents may require notarization</li>
                      <li>Foreign documents may need apostille certification</li>
                      <li>File size limit is typically 10-50MB per document</li>
                    </ul>
                  </div>
                </div>

                <div className="flex">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-800">Accepted Formats</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      PDF files are preferred for text documents. High-quality JPG or PNG files are acceptable for
                      scanned documents.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-800">Need Help?</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      If you're having trouble with document requirements or uploads, our support team is available to
                      assist you.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-sm mt-2">
                      Contact Support
                    </Button>
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
