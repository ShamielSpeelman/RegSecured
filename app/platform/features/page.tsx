import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Shield,
  TrendingUp,
  Database,
  Workflow,
  BarChart3,
  CheckCircle2,
  Brain,
  Eye,
  Target,
  Globe,
  Zap,
  Search,
} from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/shared/hero-section"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <HeroSection
        badge="Platform Features"
        title="Comprehensive AML KYC"
        subtitle="Feature Set"
        description="Discover the complete range of features that make RegSecured the most comprehensive compliance platform. From intelligent onboarding to advanced analytics, every feature is designed to streamline your compliance operations."
        primaryCta={{ text: "Start Free Trial" }}
        secondaryCta={{ text: "Schedule Demo" }}
      />

      {/* Feature Categories */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="onboarding" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-16 bg-stone-100 p-2 rounded-2xl">
              <TabsTrigger
                value="onboarding"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                Onboarding
              </TabsTrigger>
              <TabsTrigger
                value="screening"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                Screening
              </TabsTrigger>
              <TabsTrigger
                value="risk"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                Risk Management
              </TabsTrigger>
              <TabsTrigger
                value="data"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                Data Management
              </TabsTrigger>
              <TabsTrigger
                value="workflow"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                Workflows
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="onboarding" className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-3xl font-light text-slate-800">Intelligent Client Onboarding</h3>
                  </div>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                    Transform your client onboarding with AI-powered workflows that adapt to different client types,
                    jurisdictions, and risk profiles. Reduce onboarding time by up to 85% while maintaining 100%
                    regulatory compliance.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                      {
                        icon: Brain,
                        title: "AI-Powered Forms",
                        description: "Dynamic form generation based on client type and regulatory requirements",
                      },
                      {
                        icon: Eye,
                        title: "Document Intelligence",
                        description: "OCR and AI extraction with 99.5% accuracy across 200+ document types",
                      },
                      {
                        icon: Shield,
                        title: "Identity Verification",
                        description: "Real-time biometric matching and liveness detection",
                      },
                      {
                        icon: Target,
                        title: "UBO Discovery",
                        description: "Automated beneficial ownership mapping and visualization",
                      },
                    ].map((feature, index) => (
                      <div key={index} className="bg-stone-100/50 rounded-xl p-6">
                        <feature.icon className="w-8 h-8 text-blue-600 mb-3" />
                        <h4 className="font-medium text-slate-800 mb-2">{feature.title}</h4>
                        <p className="text-sm text-slate-600 font-light">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Key Capabilities:</h4>
                    {[
                      "Multi-channel onboarding (web, mobile, in-branch)",
                      "Real-time status tracking and notifications",
                      "Automated document collection and verification",
                      "E-signature integration with legal validity",
                      "Multi-language support for 40+ languages",
                      "Configurable approval workflows and escalation rules",
                    ].map((capability, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700 font-light">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=500&width=600&query=client onboarding workflow interface with AI features"
                    alt="Client Onboarding Features"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="screening" className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <Image
                    src="/placeholder.svg?height=500&width=600&query=AML screening dashboard with real-time alerts"
                    alt="AML Screening Features"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-xl"
                  />
                </div>

                <div className="order-1 lg:order-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-purple-50/50 rounded-xl flex items-center justify-center">
                      <Search className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-3xl font-light text-slate-800">Advanced AML Screening</h3>
                  </div>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                    Comprehensive screening against global sanctions, PEP lists, and adverse media with intelligent
                    false positive management. Real-time monitoring ensures continuous compliance.
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Screening Capabilities:</h4>
                    {[
                      "200+ global watchlists including OFAC, UN, EU, HMT",
                      "AI-powered fuzzy matching with 95% accuracy",
                      "Real-time alerts and continuous monitoring",
                      "Adverse media and negative news screening",
                      "Custom watchlists and internal blacklists",
                      "Intelligent false positive reduction",
                    ].map((capability, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700 font-light">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-50/50 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-3xl font-light text-slate-800">Dynamic Risk Assessment</h3>
                  </div>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                    Machine learning-powered risk scoring that evolves with your business and regulatory landscape.
                    Configurable risk models with predictive analytics.
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Risk Management Features:</h4>
                    {[
                      "Configurable risk models with 50+ risk factors",
                      "Real-time risk calculation and automatic updates",
                      "Predictive analytics for emerging risk patterns",
                      "Multi-dimensional risk scoring (AML, fraud, credit)",
                      "Country and jurisdiction risk assessment",
                      "Custom risk appetite configuration",
                    ].map((capability, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700 font-light">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=500&width=600&query=risk assessment dashboard with ML analytics"
                    alt="Risk Assessment Features"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <Image
                    src="/placeholder.svg?height=500&width=600&query=unified data management dashboard"
                    alt="Data Management Features"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-xl"
                  />
                </div>

                <div className="order-1 lg:order-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-orange-50/50 rounded-xl flex items-center justify-center">
                      <Database className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-3xl font-light text-slate-800">Unified Data Management</h3>
                  </div>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                    Single source of truth for all client data with advanced analytics and relationship mapping.
                    Comprehensive data quality management ensures accuracy and consistency.
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Data Management Features:</h4>
                    {[
                      "360-degree client view with relationship hierarchies",
                      "Data quality management and deduplication",
                      "Advanced search and filtering capabilities",
                      "Audit trail and data lineage tracking",
                      "GDPR and data residency compliance",
                      "Real-time data synchronization across systems",
                    ].map((capability, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700 font-light">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="workflow" className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-indigo-50/50 rounded-xl flex items-center justify-center">
                      <Workflow className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-3xl font-light text-slate-800">Flexible Workflow Engine</h3>
                  </div>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                    Visual workflow designer with no-code configuration for complex compliance processes. Create,
                    modify, and deploy workflows without technical expertise.
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Workflow Capabilities:</h4>
                    {[
                      "Drag-and-drop workflow builder",
                      "Conditional logic and decision trees",
                      "SLA management and escalation rules",
                      "Multi-level approval workflows",
                      "Integration with external systems",
                      "Real-time workflow monitoring and analytics",
                    ].map((capability, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700 font-light">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=500&width=600&query=workflow designer interface with visual editor"
                    alt="Workflow Engine Features"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <Image
                    src="/placeholder.svg?height=500&width=600&query=analytics dashboard with charts and KPIs"
                    alt="Analytics Features"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-xl"
                  />
                </div>

                <div className="order-1 lg:order-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-teal-50/50 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-3xl font-light text-slate-800">Advanced Analytics & Reporting</h3>
                  </div>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                    Comprehensive reporting and analytics with customizable dashboards for operational insights and
                    regulatory requirements. Generate detailed compliance reports automatically.
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Analytics Features:</h4>
                    {[
                      "Pre-built regulatory reporting templates",
                      "Custom report builder with drag-and-drop interface",
                      "Real-time KPI dashboards and performance metrics",
                      "Automated report scheduling and distribution",
                      "Export capabilities for various formats",
                      "Advanced analytics with trend analysis and forecasting",
                    ].map((capability, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700 font-light">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Why Choose RegSecured Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Our features are designed with compliance professionals in mind, delivering efficiency, accuracy, and ease
              of use.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Sub-second response times and real-time processing for all compliance operations.",
                metric: "< 500ms response time",
              },
              {
                icon: Brain,
                title: "AI-Powered",
                description:
                  "Machine learning algorithms that continuously improve accuracy and reduce false positives.",
                metric: "95% accuracy rate",
              },
              {
                icon: Globe,
                title: "Global Coverage",
                description: "Support for 150+ jurisdictions with local compliance rules and regulations.",
                metric: "150+ jurisdictions",
              },
            ].map((highlight, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <highlight.icon className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-4">{highlight.title}</h3>
                  <p className="text-slate-600 mb-4 font-light">{highlight.description}</p>
                  <Badge variant="secondary" className="text-sm">
                    {highlight.metric}
                  </Badge>
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
