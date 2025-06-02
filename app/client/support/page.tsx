import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MessageCenter, type Message } from "@/components/client/communications/message-center"
import type { FAQ } from "@/components/client/help/help-resources"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare, Clock } from "lucide-react"

// Mock data for demonstration
const supportMessages: Message[] = [
  {
    id: "support1",
    content: "Welcome to RegSecured support! How can we assist you today?",
    sender: "compliance",
    senderName: "Support Team",
    timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
    isRead: true,
  },
  {
    id: "support2",
    content: "I'm having trouble uploading my utility bill. The system keeps saying the file is too large.",
    sender: "client",
    senderName: "You",
    timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
    isRead: true,
  },
  {
    id: "support3",
    content:
      "I understand the issue. Please try compressing the file or saving it in a different format (like PDF). The maximum file size is 5MB. Let me know if you need help with this.",
    sender: "compliance",
    senderName: "Support Team",
    timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
    isRead: true,
  },
  {
    id: "support4",
    content: "Thank you, I'll try that and let you know if it works.",
    sender: "client",
    senderName: "You",
    timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
    isRead: true,
  },
]

// Mock FAQs for quick help
const faqs: FAQ[] = [
  {
    id: "faq1",
    question: "How long does the onboarding process typically take?",
    answer:
      "The onboarding process typically takes 3-5 business days to complete, depending on the complexity of your application and how quickly you provide the required information and documents.",
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
]

export default function SupportPage() {
  // These would be actual API calls in a real implementation
  const handleSendMessage = async (content: string, attachments?: File[]) => {
    console.log("Sending message:", content, attachments)
    // In a real app, this would call an API to send the message
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
              <BreadcrumbPage>Support</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Support Center</h1>
          <p className="text-slate-600 font-light">Get help with your account and onboarding process</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="chat">
              <TabsList className="mb-6">
                <TabsTrigger value="chat">Live Support</TabsTrigger>
                <TabsTrigger value="faq">Quick Help</TabsTrigger>
              </TabsList>

              <TabsContent value="chat">
                <MessageCenter messages={supportMessages} onSendMessage={handleSendMessage} />
              </TabsContent>

              <TabsContent value="faq">
                <Card className="border-stone-200/70">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {faqs.map((faq) => (
                        <div key={faq.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                          <h3 className="text-sm font-medium text-slate-800 mb-2">{faq.question}</h3>
                          <p className="text-sm text-slate-600">{faq.answer}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button asChild>
                        <a href="/client/help">View All Help Resources</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-slate-100 p-2 rounded mr-3">
                    <MessageSquare className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Live Chat</p>
                    <p className="text-sm text-slate-600">Available 24/7</p>
                    <p className="text-xs text-slate-500 mt-1">Average response time: 5 minutes</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-slate-100 p-2 rounded mr-3">
                    <Mail className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Email Support</p>
                    <p className="text-sm text-slate-600">support@regsecured.com</p>
                    <p className="text-xs text-slate-500 mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-slate-100 p-2 rounded mr-3">
                    <Phone className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Phone Support</p>
                    <p className="text-sm text-slate-600">+1 (555) 987-6543</p>
                    <p className="text-xs text-slate-500 mt-1">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-slate-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Live Chat Support</p>
                      <p className="text-sm text-slate-600">24 hours / 7 days</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-slate-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Phone Support</p>
                      <p className="text-sm text-slate-600">Monday - Friday: 9am - 5pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-slate-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Email Support</p>
                      <p className="text-sm text-slate-600">24 hours / 7 days</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-xs text-blue-700">
                    For urgent matters outside of business hours, please use the live chat or email support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
