import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageCircle, Phone, Mail, Clock, Search, BookOpen, Video, Zap } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/shared/hero-section"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <HeroSection
        badge="Support Center"
        title="We're Here to"
        subtitle="Help You Succeed"
        description="Get the support you need to maximize your RegSecured implementation. Our expert team provides comprehensive assistance, from technical support to compliance guidance."
        primaryCta={{ text: "Contact Support" }}
        secondaryCta={{ text: "Browse Knowledge Base" }}
      />

      {/* Support Options */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Live Chat",
                description: "Get instant help from our support team",
                availability: "24/7 for Enterprise",
                action: "Start Chat",
                color: "bg-blue-50/50 text-blue-600",
              },
              {
                icon: Phone,
                title: "Phone Support",
                description: "Speak directly with our experts",
                availability: "Mon-Fri 9AM-6PM EST",
                action: "Call Now",
                color: "bg-emerald-50/50 text-emerald-600",
              },
              {
                icon: Mail,
                title: "Email Support",
                description: "Send us your questions and concerns",
                availability: "Response within 4 hours",
                action: "Send Email",
                color: "bg-purple-50/50 text-purple-600",
              },
              {
                icon: HelpCircle,
                title: "Help Center",
                description: "Browse our comprehensive knowledge base",
                availability: "Available 24/7",
                action: "Browse Articles",
                color: "bg-orange-50/50 text-orange-600",
              },
            ].map((option, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 ${option.color.split(" ")[0]} rounded-xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <option.icon className={`w-6 h-6 ${option.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{option.title}</h3>
                  <p className="text-slate-600 mb-2 font-light text-sm">{option.description}</p>
                  <p className="text-xs text-slate-500 mb-4">{option.availability}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base Search */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Search Knowledge Base</h2>
            <p className="text-xl text-slate-600 font-light mb-8">
              Find answers to common questions and technical documentation
            </p>

            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search for help articles, guides, and documentation..."
                className="pl-12 h-14 text-lg border-stone-300"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Getting Started",
                articles: ["Platform Overview", "Account Setup", "First Steps", "Basic Configuration"],
              },
              {
                icon: Video,
                title: "Video Tutorials",
                articles: ["Platform Demo", "Feature Walkthroughs", "Integration Guides", "Best Practices"],
              },
              {
                icon: Zap,
                title: "Troubleshooting",
                articles: ["Common Issues", "Error Messages", "Performance Tips", "System Requirements"],
              },
            ].map((category, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">{category.title}</h3>
                  <div className="space-y-2">
                    {category.articles.map((article, i) => (
                      <div key={i} className="text-sm text-slate-600 hover:text-slate-800 cursor-pointer font-light">
                        • {article}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Submit a Support Request</h2>
            <p className="text-xl text-slate-600 font-light">
              Can't find what you're looking for? Send us a detailed message and we'll get back to you quickly.
            </p>
          </div>

          <Card className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                    <Input placeholder="Your full name" className="border-stone-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" className="border-stone-300" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                    <Input placeholder="Your company name" className="border-stone-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                    <select className="w-full h-10 px-3 border border-stone-300 rounded-md bg-white text-slate-700">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <Input placeholder="Brief description of your issue" className="border-stone-300" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <Textarea
                    placeholder="Please provide detailed information about your issue, including any error messages and steps to reproduce..."
                    className="border-stone-300 min-h-[120px]"
                  />
                </div>

                <Button className="w-full bg-slate-700 hover:bg-slate-800 text-stone-50 h-12">
                  Submit Support Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support Hours & SLA */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Support Hours & Response Times</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                plan: "Starter",
                hours: "Mon-Fri 9AM-6PM EST",
                response: "Within 24 hours",
                channels: ["Email Support", "Knowledge Base", "Community Forum"],
              },
              {
                plan: "Professional",
                hours: "Mon-Fri 8AM-8PM EST",
                response: "Within 4 hours",
                channels: ["Priority Email", "Live Chat", "Phone Support", "Knowledge Base"],
              },
              {
                plan: "Enterprise",
                hours: "24/7 Support",
                response: "Within 1 hour",
                channels: ["Dedicated Support", "24/7 Phone", "Live Chat", "Account Manager"],
              },
            ].map((tier, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-medium text-slate-800 mb-4">{tier.plan}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 font-light">{tier.hours}</span>
                    </div>
                    <div className="text-lg font-medium text-slate-800">{tier.response}</div>
                    <div className="text-sm text-slate-500">Response Time</div>
                  </div>
                  <div className="space-y-2">
                    {tier.channels.map((channel, i) => (
                      <div key={i} className="text-sm text-slate-600 font-light">
                        • {channel}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
