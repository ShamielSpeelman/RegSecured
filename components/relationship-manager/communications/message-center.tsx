import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, Users, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MessageCenter() {
  const conversations = [
    {
      id: 1,
      client: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "Thank you for the update on my application status.",
      time: "2 hours ago",
      unread: 0,
      status: "active",
    },
    {
      id: 2,
      client: "TechCorp Industries",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "We have uploaded the requested compliance documents.",
      time: "4 hours ago",
      unread: 2,
      status: "pending",
    },
    {
      id: 3,
      client: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "When can we schedule the final review meeting?",
      time: "1 day ago",
      unread: 1,
      status: "active",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.client} />
                      <AvatarFallback>
                        {conversation.client
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-slate-900 truncate">{conversation.client}</h4>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-slate-500">{conversation.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">New Message</CardTitle>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Bulk Message
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Recipient</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="techcorp">TechCorp Industries</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="emma">Emma Rodriguez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Message Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Update</SelectItem>
                    <SelectItem value="document">Document Request</SelectItem>
                    <SelectItem value="meeting">Meeting Invitation</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Subject</label>
              <Input placeholder="Enter message subject..." />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
              <Textarea placeholder="Type your message here..." className="min-h-[120px]" />
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4 mr-2" />
                Attach File
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
