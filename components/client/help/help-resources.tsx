"use client"

import { Search, HelpCircle, FileText, Video, MessageSquare, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export interface HelpArticle {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
}

export interface VideoTutorial {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  duration: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

interface HelpResourcesProps {
  articles: HelpArticle[]
  videos: VideoTutorial[]
  faqs: FAQ[]
  onContactSupport: () => void
  className?: string
}

export function HelpResources({ articles, videos, faqs, onContactSupport, className }: HelpResourcesProps) {
  return (
    <Card className={cn("border-stone-200/70", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-medium text-slate-800">Help & Resources</CardTitle>
        <CardDescription>Find answers to common questions and learn how to use the platform</CardDescription>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search for help..." className="pl-9" />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="faqs">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          </TabsList>

          <TabsContent value="faqs" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-sm font-medium text-slate-800">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="articles" className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden border-slate-200">
                <div className="p-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">{article.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{article.content.substring(0, 120)}...</p>
                      <div className="mt-2">
                        <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                          Read full article
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="videos" className="grid grid-cols-2 gap-4">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden border-slate-200">
                <div className="aspect-video relative">
                  <img
                    src={video.thumbnailUrl || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Button variant="ghost" className="text-white rounded-full h-12 w-12 p-0">
                      <Video className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-slate-800">{video.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{video.description}</p>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex items-start">
            <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-slate-800">Need more help?</h3>
              <p className="text-xs text-slate-600 mt-1">
                Our support team is available to assist you with any questions or issues you may have.
              </p>
              <div className="mt-3 flex space-x-3">
                <Button size="sm" onClick={onContactSupport} className="h-8 text-xs">
                  <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                  Contact Support
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Visit Help Center
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
