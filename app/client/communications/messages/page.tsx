"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MessageCenter, type Message } from "@/components/client/communications/message-center"
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
import { HelpCircle } from "lucide-react"

// Mock data for demonstration
const messages: Message[] = [
  {
    id: "msg1",
    content:
      "Your onboarding process has started. Please complete all required steps to proceed with your application.",
    sender: "system",
    senderName: "System",
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    isRead: true,
  },
  {
    id: "msg2",
    content:
      "Hello! I've reviewed your initial application. Could you please upload a clearer copy of your passport? The current image is a bit blurry.",
    sender: "compliance",
    senderName: "Sarah Thompson",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    isRead: true,
  },
  {
    id: "msg3",
    content: "I've uploaded a new copy of my passport. Please let me know if it's clear enough now.",
    sender: "client",
    senderName: "You",
    timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    isRead: true,
    attachments: [
      {
        id: "att1",
        name: "passport_scan.jpg",
        size: 1240000,
        url: "#",
      },
    ],
  },
  {
    id: "msg4",
    content:
      "Thank you! The new passport copy is perfect. I've verified your identity. Please proceed with the next steps in your onboarding process.",
    sender: "compliance",
    senderName: "Sarah Thompson",
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    isRead: false,
  },
]

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

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("compliance")

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
              <BreadcrumbLink href="#">Communications</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Messages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">Messages</h1>
          <p className="text-slate-600 font-light">Communicate with our team regarding your application</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="compliance" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="compliance">Compliance Team</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>

              <TabsContent value="compliance">
                <MessageCenter messages={messages} onSendMessage={handleSendMessage} />
              </TabsContent>

              <TabsContent value="support">
                <MessageCenter messages={supportMessages} onSendMessage={handleSendMessage} />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="border-stone-200/70">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                {activeTab === "compliance" ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">Your Compliance Officer</h3>
                      <p className="text-sm text-slate-600">Sarah Thompson</p>
                      <p className="text-sm text-slate-600">Available: Mon-Fri, 9am-5pm EST</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">Response Time</h3>
                      <p className="text-sm text-slate-600">Typically within 24 hours</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">Alternative Contact</h3>
                      <p className="text-sm text-slate-600">compliance@regsecured.com</p>
                      <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">Support Team</h3>
                      <p className="text-sm text-slate-600">Available: 24/7</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">Response Time</h3>
                      <p className="text-sm text-slate-600">Typically within 2 hours</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">Alternative Contact</h3>
                      <p className="text-sm text-slate-600">support@regsecured.com</p>
                      <p className="text-sm text-slate-600">+1 (555) 987-6543</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex">
                    <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">Messaging Tips</h3>
                      <ul className="text-sm text-slate-600 mt-1 space-y-2 list-disc pl-4">
                        <li>Be specific about your questions or issues</li>
                        <li>Include relevant reference numbers if applicable</li>
                        <li>Attach screenshots if you're experiencing technical issues</li>
                        <li>All communication is securely encrypted</li>
                      </ul>
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
