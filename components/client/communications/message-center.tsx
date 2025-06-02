"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, Clock, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export interface Message {
  id: string
  content: string
  sender: "client" | "compliance" | "system"
  senderName: string
  timestamp: Date
  attachments?: {
    id: string
    name: string
    size: number
    url: string
  }[]
  isRead: boolean
}

interface MessageCenterProps {
  messages: Message[]
  onSendMessage: (content: string, attachments?: File[]) => Promise<void>
  className?: string
}

export function MessageCenter({ messages, onSendMessage, className }: MessageCenterProps) {
  const [newMessage, setNewMessage] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (newMessage.trim() === "" && attachments.length === 0) return

    setIsSending(true)
    try {
      await onSendMessage(newMessage, attachments)
      setNewMessage("")
      setAttachments([])
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {}
  messages.forEach((message) => {
    const dateStr = formatDate(message.timestamp)
    if (!groupedMessages[dateStr]) {
      groupedMessages[dateStr] = []
    }
    groupedMessages[dateStr].push(message)
  })

  return (
    <Card className={cn("border-stone-200/70 flex flex-col h-[600px]", className)}>
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg font-medium">Message Center</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-0">
        <div className="p-4 space-y-6">
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="space-y-4">
              <div className="flex justify-center">
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{date}</span>
              </div>

              {dateMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.sender === "client" ? "justify-end" : "justify-start")}
                >
                  <div className={cn("max-w-[80%]", message.sender === "system" && "w-full")}>
                    {message.sender === "system" ? (
                      <div className="bg-slate-100 p-3 rounded-lg text-sm text-slate-600 text-center">
                        <Clock className="inline-block h-4 w-4 mr-1" />
                        {message.content}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2 mb-1">
                          {message.sender === "compliance" && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={message.senderName} />
                              <AvatarFallback>
                                <UserCircle className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <span
                            className={cn(
                              "text-xs font-medium",
                              message.sender === "client" ? "text-right text-blue-600" : "text-slate-600",
                            )}
                          >
                            {message.senderName}
                          </span>

                          <span className="text-xs text-slate-400">{formatTime(message.timestamp)}</span>
                        </div>

                        <div
                          className={cn(
                            "p-3 rounded-lg text-sm",
                            message.sender === "client"
                              ? "bg-blue-500 text-white rounded-tr-none"
                              : "bg-slate-200 text-slate-800 rounded-tl-none",
                          )}
                        >
                          {message.content}
                        </div>

                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment) => (
                              <a
                                key={attachment.id}
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  "flex items-center p-2 rounded text-xs",
                                  message.sender === "client"
                                    ? "bg-blue-400 text-white"
                                    : "bg-slate-100 text-slate-700",
                                )}
                              >
                                <Paperclip className="h-3 w-3 mr-2" />
                                <span className="truncate">{attachment.name}</span>
                                <span className="ml-1">({(attachment.size / 1024).toFixed(0)} KB)</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <div className="p-4 border-t border-slate-200">
        {attachments.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="bg-slate-100 rounded px-2 py-1 text-xs flex items-center">
                <Paperclip className="h-3 w-3 mr-1 text-slate-500" />
                <span className="truncate max-w-[100px]">{file.name}</span>
                <button onClick={() => removeAttachment(index)} className="ml-1 text-slate-400 hover:text-slate-600">
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="min-h-[80px] resize-none"
          />

          <div className="flex flex-col space-y-2">
            <div>
              <input type="file" id="file-attachment" className="sr-only" onChange={handleFileChange} multiple />
              <label htmlFor="file-attachment">
                <Button type="button" variant="outline" size="icon" className="h-10 w-10" asChild>
                  <span>
                    <Paperclip className="h-4 w-4" />
                  </span>
                </Button>
              </label>
            </div>

            <Button
              type="button"
              size="icon"
              className="h-10 w-10"
              onClick={handleSend}
              disabled={isSending || (newMessage.trim() === "" && attachments.length === 0)}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
