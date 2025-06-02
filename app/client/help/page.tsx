import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { HelpResources, type HelpArticle, type VideoTutorial, type FAQ } from "@/components/client/help/help-resources"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Mock data for demonstration
const helpArticles: HelpArticle[] = [
  {
    id: "article1",
    title: "Getting Started with Your Onboarding Process",
    content:
      "This guide will walk you through the steps to complete your onboarding process efficiently. The onboarding process consists of several key steps: personal information, document verification, financial information, and risk assessment.",
    category: "Onboarding",
    tags: ["getting started", "onboarding", "guide"],
  },
  {
    id: "article2",
    title: "How to Upload Documents Correctly",
    content:
      "Learn how to properly scan and upload your identification documents to ensure they are accepted on the first try. Make sure your documents are clear, all corners are visible, and the text is readable.",
    category: "Documents",
    tags: ["documents", "upload", "verification"],
  },
  {
    id: "article3",
    title: "Understanding the Risk Assessment Questionnaire",
    content:
      "This article explains the purpose of the risk assessment questionnaire and how to answer each question accurately. The risk assessment helps us understand your risk profile and ensure compliance with regulations.",
    category: "Risk Assessment",
    tags: ["risk", "assessment", "questionnaire"],
  },
  {
    id: "article4",
    title: "Secure Communication in the Client Portal",
    content:
      "Learn about the security features of our messaging system and how to communicate securely with your compliance officer. All communications are encrypted and stored securely.",
    category: "Security",
    tags: ["security", "communication", "privacy"],
  },
]

const videoTutorials: VideoTutorial[] = [
  {
    id: "video1",
    title: "Complete Onboarding Walkthrough",
    description: "A step-by-step guide to completing your onboarding process from start to finish.",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    videoUrl: "#",
    duration: "5:32",
  },
  {
    id: "video2",
    title: "How to Upload and Verify Documents",
    description: "Learn how to properly scan, upload, and verify your identification documents.",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    videoUrl: "#",
    duration: "3:45",
  },
  {
    id: "video3",
    title: "Completing the Financial Information Form",
    description: "A guide to accurately filling out the financial information section of your application.",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    videoUrl: "#",
    duration: "4:18",
  },
  {
    id: "video4",
    title: "Understanding Risk Assessment",
    description: "Learn about the risk assessment process and how to complete the questionnaire.",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    videoUrl: "#",
    duration: "6:10",
  },
]

const faqs: FAQ[] = [
  {
    id: "faq1",
    question: "How long does the onboarding process typically take?",
    answer:
      "The onboarding process typically takes 3-5 business days to complete, depending on the complexity of your application and how quickly you provide the required information and documents. Once all documents are submitted and verified, final approval usually takes 1-2 business days.",
    category: "Onboarding",
  },
  {
    id: "faq2",
    question: "What documents do I need for identity verification?",
    answer:
      "For identity verification, you'll need a government-issued photo ID (passport, driver's license, or national ID card) and proof of address (utility bill, bank statement, or official government correspondence dated within the last 3 months).",
    category: "Documents",
  },
  {
    id: "faq3",
    question: "Can I save my progress and continue later?",
    answer:
      "Yes, you can save your progress at any time by clicking the 'Save Draft' button. Your information will be securely stored, and you can continue from where you left off when you log back in.",
    category: "General",
  },
  {
    id: "faq4",
    question: "What happens if my documents are rejected?",
    answer:
      "If your documents are rejected, you'll receive a notification explaining why. Common reasons include poor image quality, expired documents, or missing information. You can upload new documents directly through the portal.",
    category: "Documents",
  },
  {
    id: "faq5",
    question: "How secure is my personal information?",
    answer:
      "Your personal information is protected with bank-level encryption and security measures. We comply with all relevant data protection regulations, including GDPR. Your data is only accessible to authorized personnel involved in your onboarding process.",
    category: "Security",
  },
  {
    id: "faq6",
    question: "What is a Politically Exposed Person (PEP)?",
    answer:
      "A Politically Exposed Person (PEP) is someone who holds a prominent public position, or is closely related to such a person. This includes heads of state, senior politicians, senior government officials, judicial or military officials, senior executives of state-owned corporations, and important political party officials.",
    category: "Compliance",
  },
  {
    id: "faq7",
    question: "How do I update my contact information?",
    answer:
      "You can update your contact information in the Profile Management section. Navigate to 'Profile' > 'Contact Details' and make the necessary changes. Don't forget to save your updates.",
    category: "Profile",
  },
  {
    id: "faq8",
    question: "Who can I contact if I need help?",
    answer:
      "You can contact our support team through the messaging system in the portal. For urgent matters, you can also reach us by email at support@regsecured.com or by phone at +1 (555) 987-6543.",
    category: "Support",
  },
]

export default function HelpPage() {
  // This would be an actual API call in a real implementation
  const handleContactSupport = () => {
    console.log("Navigating to support page")
    // In a real app, this would navigate to the support page or open a support modal
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
              <BreadcrumbPage>Help & Resources</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Help & Resources</h1>
          <p className="text-slate-600 font-light">
            Find answers to common questions and learn how to use the platform
          </p>
        </div>

        <HelpResources
          articles={helpArticles}
          videos={videoTutorials}
          faqs={faqs}
          onContactSupport={handleContactSupport}
        />
      </div>
    </DashboardLayout>
  )
}
