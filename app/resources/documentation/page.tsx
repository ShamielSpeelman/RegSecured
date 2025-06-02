import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Code, Download, ExternalLink, Search, FileText, Video, Zap, Users, Settings } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/shared/hero-section"
import { ConsistentButton } from "@/components/ui/button-consistent"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <HeroSection
        badge="Documentation"
        title="Developer Documentation"
        subtitle="& Guides"
        description="Comprehensive documentation, API references, and integration guides to help you implement and maximize RegSecured's compliance platform."
        primaryCta={{ text: "Browse API Docs" }}
        secondaryCta={{ text: "Download SDK" }}
      />

      {/* Search Documentation */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Search Documentation</h2>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search documentation, guides, and API references..."
                className="pl-12 h-14 text-lg border-stone-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Getting Started",
                description: "Quick start guides and platform overview",
                items: [
                  { title: "Platform Overview", type: "Guide", time: "5 min read" },
                  { title: "Account Setup", type: "Tutorial", time: "10 min" },
                  { title: "First Client Onboarding", type: "Walkthrough", time: "15 min" },
                  { title: "Basic Configuration", type: "Guide", time: "8 min read" },
                  { title: "User Management", type: "Tutorial", time: "12 min" },
                ],
                color: "bg-blue-50/50 text-blue-600",
              },
              {
                icon: Code,
                title: "API Reference",
                description: "Complete API documentation and examples",
                items: [
                  { title: "Authentication", type: "API", time: "Reference" },
                  { title: "Client Onboarding API", type: "API", time: "Reference" },
                  { title: "Screening API", type: "API", time: "Reference" },
                  { title: "Webhooks", type: "API", time: "Reference" },
                  { title: "Error Handling", type: "Guide", time: "6 min read" },
                ],
                color: "bg-purple-50/50 text-purple-600",
              },
              {
                icon: Settings,
                title: "Integration Guides",
                description: "Step-by-step integration tutorials",
                items: [
                  { title: "Core Banking Integration", type: "Tutorial", time: "30 min" },
                  { title: "CRM Integration", type: "Tutorial", time: "20 min" },
                  { title: "Webhook Setup", type: "Guide", time: "10 min read" },
                  { title: "SSO Configuration", type: "Tutorial", time: "25 min" },
                  { title: "Data Migration", type: "Guide", time: "15 min read" },
                ],
                color: "bg-emerald-50/50 text-emerald-600",
              },
            ].map((category, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div
                    className={`w-12 h-12 ${category.color.split(" ")[0]} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <category.icon className={`w-6 h-6 ${category.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-4">{category.title}</h3>
                  <p className="text-slate-600 mb-6 font-light">{category.description}</p>

                  <div className="space-y-3">
                    {category.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-stone-50/50 rounded-lg hover:bg-stone-100/50 cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-slate-800">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.time}</div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Downloads */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">SDKs & Libraries</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Official SDKs and libraries to accelerate your integration with RegSecured.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "JavaScript", version: "v2.1.0", downloads: "15k", icon: "JS" },
              { name: "Python", version: "v1.8.2", downloads: "12k", icon: "PY" },
              { name: "Java", version: "v1.5.1", downloads: "8k", icon: "JA" },
              { name: "C#", version: "v1.3.0", downloads: "5k", icon: "C#" },
              { name: "PHP", version: "v1.2.4", downloads: "4k", icon: "PHP" },
              { name: "Ruby", version: "v1.1.0", downloads: "2k", icon: "RB" },
              { name: "Go", version: "v1.0.5", downloads: "3k", icon: "GO" },
              { name: "Swift", version: "v1.0.2", downloads: "1k", icon: "SW" },
            ].map((sdk, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-sm font-bold text-slate-600">{sdk.icon}</span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{sdk.name}</h3>
                  <div className="text-sm text-slate-500 mb-1">{sdk.version}</div>
                  <div className="text-xs text-slate-400 mb-4">{sdk.downloads} downloads</div>
                  <ConsistentButton variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 w-3 h-3" />
                    Download
                  </ConsistentButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Popular Guides</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "Quick Start Guide",
                description: "Get up and running with RegSecured in under 30 minutes",
                time: "30 min",
                difficulty: "Beginner",
                topics: ["Account setup", "First API call", "Basic configuration", "Test environment"],
              },
              {
                icon: Users,
                title: "Client Onboarding Implementation",
                description: "Complete guide to implementing automated client onboarding",
                time: "45 min",
                difficulty: "Intermediate",
                topics: ["Workflow design", "Document processing", "Identity verification", "Risk assessment"],
              },
              {
                icon: FileText,
                title: "Compliance Reporting Setup",
                description: "Configure automated compliance reporting and monitoring",
                time: "35 min",
                difficulty: "Intermediate",
                topics: ["Report templates", "Scheduling", "Data export", "Regulatory requirements"],
              },
              {
                icon: Video,
                title: "Advanced Integration Patterns",
                description: "Best practices for complex enterprise integrations",
                time: "60 min",
                difficulty: "Advanced",
                topics: ["Microservices", "Event-driven architecture", "Error handling", "Performance optimization"],
              },
            ].map((guide, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <guide.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-slate-800 mb-2">{guide.title}</h3>
                      <p className="text-slate-600 font-light mb-4">{guide.description}</p>
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="secondary" className="text-xs">
                          {guide.time}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {guide.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="text-sm font-medium text-slate-800">What you'll learn:</div>
                    {guide.topics.map((topic, i) => (
                      <div key={i} className="text-sm text-slate-600 font-light">
                        • {topic}
                      </div>
                    ))}
                  </div>

                  <ConsistentButton variant="ghost" className="w-full justify-between">
                    Read Guide
                    <ExternalLink className="w-4 h-4" />
                  </ConsistentButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-slate-800 mb-6">Need Help?</h2>
          <p className="text-xl text-slate-600 mb-8 font-light">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ConsistentButton size="lg" showArrow>
              Contact Support
            </ConsistentButton>
            <ConsistentButton variant="outline" size="lg">
              Join Community
            </ConsistentButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
