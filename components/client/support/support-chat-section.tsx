"use client"

import { MessageCenter, type Message } from "@/components/client/communications/message-center"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { FAQ } from "@/components/client/help/help-resources"

interface SupportChatSectionProps {
  messages: Message[]
  faqs: FAQ[]
}

export function SupportChatSection({ messages, faqs }: SupportChatSectionProps) {
  const handleSendMessage = async (content: string, attachments?: File[]) => {
    console.log("Sending message:", content, attachments)
    // In a real app, this would call an API to send the message
  }

  return (
    <Tabs defaultValue="chat">
      <TabsList className="mb-6">
        <TabsTrigger value="chat">Live Support</TabsTrigger>
        <TabsTrigger value="faq">Quick Help</TabsTrigger>
      </TabsList>

      <TabsContent value="chat">
        <MessageCenter messages={messages} onSendMessage={handleSendMessage} />
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
  )
}
