import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Code, Zap, CheckCircle2, ArrowRight, Webhook, Settings, Cloud, Shield, Users } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/shared/hero-section"
import { ConsistentButton } from "@/components/ui/button-consistent"

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <HeroSection
        badge="Platform Integrations"
        title="Connect Everything"
        subtitle="Seamlessly"
        description="RegSecured integrates with your existing technology stack through comprehensive APIs, pre-built connectors, and flexible integration options. Connect with leading financial services platforms and data providers."
        primaryCta={{ text: "View API Documentation" }}
        secondaryCta={{ text: "Request Integration" }}
      />

      {/* Integration Categories */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Integration Categories</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Connect RegSecured with your existing systems through our comprehensive integration ecosystem.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                icon: Database,
                title: "Core Banking Systems",
                description: "Direct integration with major banking platforms",
                count: "15+ Platforms",
                examples: ["Temenos", "FIS", "Finastra", "Oracle FLEXCUBE"],
              },
              {
                icon: Shield,
                title: "Data Providers",
                description: "Premium KYC and AML data sources",
                count: "25+ Providers",
                examples: ["Refinitiv", "LexisNexis", "Dow Jones", "Thomson Reuters"],
              },
              {
                icon: Cloud,
                title: "CRM & Sales",
                description: "Customer relationship management systems",
                count: "10+ Platforms",
                examples: ["Salesforce", "HubSpot", "Microsoft Dynamics", "Pipedrive"],
              },
              {
                icon: Code,
                title: "Identity Verification",
                description: "Leading ID verification services",
                count: "12+ Services",
                examples: ["Jumio", "Onfido", "Veriff", "Trulioo"],
              },
            ].map((category, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{category.title}</h3>
                  <p className="text-slate-600 font-light text-sm mb-3">{category.description}</p>
                  <Badge variant="secondary" className="mb-4 text-xs">
                    {category.count}
                  </Badge>
                  <div className="space-y-1">
                    {category.examples.map((example, i) => (
                      <div key={i} className="text-xs text-slate-500 font-light">
                        {example}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Integrations */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Featured Integrations</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Pre-built connectors for the most popular financial services platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Salesforce",
                category: "CRM",
                description: "Sync customer data and compliance status with Salesforce CRM",
                features: ["Real-time data sync", "Custom field mapping", "Workflow automation"],
                logo: "/placeholder.svg?height=60&width=120&query=Salesforce logo",
              },
              {
                name: "Temenos",
                category: "Core Banking",
                description: "Direct integration with Temenos T24 and Infinity platforms",
                features: ["Account opening automation", "Customer data sync", "Transaction monitoring"],
                logo: "/placeholder.svg?height=60&width=120&query=Temenos logo",
              },
              {
                name: "Refinitiv",
                category: "Data Provider",
                description: "Access to World-Check and other premium screening databases",
                features: ["Real-time screening", "Watchlist updates", "Risk intelligence"],
                logo: "/placeholder.svg?height=60&width=120&query=Refinitiv logo",
              },
              {
                name: "Jumio",
                category: "Identity Verification",
                description: "AI-powered identity verification and document authentication",
                features: ["Document verification", "Biometric matching", "Fraud detection"],
                logo: "/placeholder.svg?height=60&width=120&query=Jumio logo",
              },
              {
                name: "Microsoft Dynamics",
                category: "CRM",
                description: "Seamless integration with Microsoft Dynamics 365",
                features: ["Customer lifecycle management", "Compliance tracking", "Automated workflows"],
                logo: "/placeholder.svg?height=60&width=120&query=Microsoft Dynamics logo",
              },
              {
                name: "LexisNexis",
                category: "Data Provider",
                description: "Comprehensive risk and compliance data solutions",
                features: ["Identity verification", "Risk assessment", "Regulatory screening"],
                logo: "/placeholder.svg?height=60&width=120&query=LexisNexis logo",
              },
            ].map((integration, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Image
                      src={integration.logo || "/placeholder.svg"}
                      alt={`${integration.name} logo`}
                      width={120}
                      height={60}
                      className="opacity-70"
                    />
                    <Badge variant="secondary" className="text-xs">
                      {integration.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{integration.name}</h3>
                  <p className="text-slate-600 font-light text-sm mb-4">{integration.description}</p>
                  <div className="space-y-2 mb-4">
                    {integration.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span className="text-xs text-slate-600 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <ConsistentButton variant="ghost" size="sm" className="w-full justify-between">
                    Learn More
                    <ArrowRight className="w-3 h-3" />
                  </ConsistentButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API & Developer Tools */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">API & Developer Tools</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Comprehensive APIs and developer resources for custom integrations and applications.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: Code,
                title: "RESTful APIs",
                description: "Modern REST APIs with comprehensive documentation and SDKs",
                features: [
                  "OpenAPI 3.0 specification",
                  "Rate limiting and authentication",
                  "Comprehensive error handling",
                  "Real-time webhooks",
                  "SDK libraries for popular languages",
                  "Interactive API explorer",
                ],
              },
              {
                icon: Webhook,
                title: "Webhooks & Events",
                description: "Real-time notifications and event-driven integrations",
                features: [
                  "Real-time event notifications",
                  "Configurable webhook endpoints",
                  "Event filtering and routing",
                  "Retry logic and error handling",
                  "Webhook signature verification",
                  "Event history and debugging",
                ],
              },
              {
                icon: Settings,
                title: "Custom Connectors",
                description: "Build custom integrations with our flexible connector framework",
                features: [
                  "Connector development kit",
                  "Pre-built templates",
                  "Testing and validation tools",
                  "Deployment automation",
                  "Monitoring and analytics",
                  "Community connector marketplace",
                ],
              },
              {
                icon: Zap,
                title: "No-Code Integrations",
                description: "Connect with popular platforms without writing code",
                features: [
                  "Zapier integration",
                  "Microsoft Power Automate",
                  "IFTTT compatibility",
                  "Visual workflow builder",
                  "Pre-configured templates",
                  "Drag-and-drop interface",
                ],
              },
            ].map((tool, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center">
                      <tool.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-slate-800">{tool.title}</h3>
                      <p className="text-slate-600 font-light text-sm">{tool.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {tool.features.map((feature, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-slate-600 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Support */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-slate-800 mb-6">Integration Support</h2>
          <p className="text-xl text-slate-600 mb-8 font-light">
            Our integration team provides comprehensive support to ensure successful implementations.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Technical Consultation",
                description: "Expert guidance on integration architecture and best practices",
                icon: Users,
              },
              {
                title: "Custom Development",
                description: "Bespoke integration development for unique requirements",
                icon: Code,
              },
              {
                title: "Ongoing Support",
                description: "Continuous monitoring and maintenance of your integrations",
                icon: Settings,
              },
            ].map((support, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <support.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{support.title}</h3>
                  <p className="text-slate-600 font-light text-sm">{support.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ConsistentButton size="lg" showArrow>
              View API Documentation
            </ConsistentButton>
            <ConsistentButton variant="outline" size="lg">
              Request Integration
            </ConsistentButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
