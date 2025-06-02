import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Users,
  Database,
  TrendingUp,
  Globe,
  Zap,
  Lock,
  Search,
  AlertTriangle,
  BarChart3,
  Settings,
  Clock,
  Brain,
  Eye,
  Target,
  Workflow,
} from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-br from-stone-50 via-white to-stone-100">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-stone-100 text-slate-700 px-4 py-2 border-0">Enterprise AML KYC Platform</Badge>
          <h1 className="text-4xl lg:text-5xl font-light mb-8 text-slate-800">
            The Complete
            <br />
            <span className="font-normal text-slate-600">Compliance Platform</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            RegSecured delivers end-to-end AML KYC automation with enterprise-grade security, global regulatory
            coverage, and intelligent workflow orchestration. Built for modern financial institutions that demand both
            compliance excellence and operational efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button size="lg" className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm h-14 px-8 text-lg">
              Explore Platform
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 border-slate-300">
              Schedule Demo
            </Button>
          </div>

          {/* Platform Overview Image */}
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200/30 to-stone-300/30 rounded-3xl blur-3xl"></div>
            <Image
              src="/placeholder.svg?height=600&width=1200&query=comprehensive AML KYC platform dashboard with multiple modules"
              alt="RegSecured Platform Overview"
              width={1200}
              height={600}
              className="relative rounded-3xl shadow-2xl border border-stone-200/50"
            />
          </div>
        </div>
      </section>

      {/* Platform Modules */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Modular Architecture for Maximum Flexibility</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Deploy individual modules or the complete suite. Each component is designed to work independently or as
              part of an integrated compliance ecosystem.
            </p>
          </div>

          <Tabs defaultValue="onboarding" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-16 bg-stone-100 p-2 rounded-2xl">
              <TabsTrigger
                value="onboarding"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                Client Onboarding
              </TabsTrigger>
              <TabsTrigger
                value="screening"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                AML Screening
              </TabsTrigger>
              <TabsTrigger
                value="risk"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                Risk Assessment
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
                Workflow Engine
              </TabsTrigger>
              <TabsTrigger
                value="reporting"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl"
              >
                Analytics & Reporting
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
                    Streamline client acquisition with AI-powered workflows that automatically adapt to client types,
                    jurisdictions, and risk profiles. Reduce onboarding time from weeks to hours while maintaining 100%
                    regulatory compliance.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                      {
                        icon: Brain,
                        title: "AI-Powered Forms",
                        description:
                          "Dynamic form generation based on client type, jurisdiction, and regulatory requirements",
                      },
                      {
                        icon: Eye,
                        title: "Document Intelligence",
                        description: "OCR and AI extraction with 99.5% accuracy across 200+ document types",
                      },
                      {
                        icon: Shield,
                        title: "Identity Verification",
                        description: "Real-time biometric matching and liveness detection with fraud prevention",
                      },
                      {
                        icon: Target,
                        title: "UBO Discovery",
                        description: "Automated beneficial ownership mapping with relationship visualization",
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
                    alt="Client Onboarding Module"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-xl"
                  />

                  {/* Floating metrics */}
                  <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-stone-200/50">
                    <div className="text-center">
                      <div className="text-2xl font-medium text-emerald-600">85%</div>
                      <div className="text-xs text-slate-600">Time Reduction</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-stone-200/50">
                    <div className="text-center">
                      <div className="text-2xl font-medium text-blue-600">99.5%</div>
                      <div className="text-xs text-slate-600">Accuracy Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="screening" className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <Image
                    src="/placeholder.svg?height=500&width=600&query=AML screening dashboard with real-time alerts and watchlist management"
                    alt="AML Screening Module"
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
                    <h3 className="text-3xl font-light text-slate-800">Advanced AML Screening Engine</h3>
                  </div>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                    Comprehensive screening against global sanctions, PEP lists, and adverse media with intelligent
                    false positive management. Real-time monitoring ensures continuous compliance with evolving
                    regulatory requirements.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                      {
                        icon: Globe,
                        title: "Global Coverage",
                        description: "200+ watchlists including OFAC, UN, EU, HMT, and regional sanctions",
                      },
                      {
                        icon: Brain,
                        title: "AI Matching",
                        description: "Machine learning-powered fuzzy matching with 95% accuracy",
                      },
                      {
                        icon: AlertTriangle,
                        title: "Real-time Alerts",
                        description: "Instant notifications for new matches and watchlist updates",
                      },
                      {
                        icon: Settings,
                        title: "Smart Filtering",
                        description: "Intelligent false positive reduction with learning algorithms",
                      },
                    ].map((feature, index) => (
                      <div key={index} className="bg-stone-100/50 rounded-xl p-6">
                        <feature.icon className="w-8 h-8 text-purple-600 mb-3" />
                        <h4 className="font-medium text-slate-800 mb-2">{feature.title}</h4>
                        <p className="text-sm text-slate-600 font-light">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Screening Capabilities:</h4>
                    {[
                      "Sanctions and embargo lists (OFAC, UN, EU, HMT)",
                      "Politically Exposed Persons (PEP) databases",
                      "Adverse media and negative news screening",
                      "Custom watchlists and internal blacklists",
                      "Ongoing monitoring with daily rescreening",
                      "Case management for alert investigation",
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
                    Configurable risk models with predictive analytics for emerging risk patterns and regulatory change
                    impact assessment.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                      {
                        icon: BarChart3,
                        title: "Risk Modeling",
                        description: "Configurable models with 50+ risk factors and custom weightings",
                      },
                      {
                        icon: Brain,
                        title: "ML Analytics",
                        description: "Predictive analytics for emerging risk patterns and trends",
                      },
                      {
                        icon: Clock,
                        title: "Real-time Scoring",
                        description: "Instant risk calculation with automatic updates and alerts",
                      },
                      {
                        icon: Target,
                        title: "Risk Appetite",
                        description: "Custom risk appetite configuration and threshold management",
                      },
                    ].map((feature, index) => (
                      <div key={index} className="bg-stone-100/50 rounded-xl p-6">
                        <feature.icon className="w-8 h-8 text-emerald-600 mb-3" />
                        <h4 className="font-medium text-slate-800 mb-2">{feature.title}</h4>
                        <p className="text-sm text-slate-600 font-light">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Risk Assessment Features:</h4>
                    {[
                      "Multi-dimensional risk scoring (AML, fraud, credit, operational)",
                      "Country and jurisdiction risk assessment",
                      "Product and service risk evaluation",
                      "Customer behavior and transaction pattern analysis",
                      "Regulatory change impact assessment",
                      "Risk trend analysis and reporting",
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
                    src="/placeholder.svg?height=500&width=600&query=risk assessment dashboard with ML analytics and scoring"
                    alt="Risk Assessment Module"
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
                    src="/placeholder.svg?height=500&width=600&query=unified data management dashboard with client relationships"
                    alt="Data Management Module"
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
                    Comprehensive data quality management ensures accuracy and consistency across your entire compliance
                    ecosystem.
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
                    modify, and deploy workflows without technical expertise while maintaining enterprise-grade
                    reliability and audit trails.
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
                    alt="Workflow Designer"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reporting" className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <Image
                    src="/placeholder.svg?height=500&width=600&query=compliance reporting dashboard with charts and analytics"
                    alt="Reporting Dashboard"
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
                    <h3 className="text-3xl font-light text-slate-800">Analytics & Reporting</h3>
                  </div>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                    Comprehensive reporting and analytics with customizable dashboards for operational insights and
                    regulatory requirements. Generate detailed compliance reports with automated scheduling and
                    distribution capabilities.
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Reporting Features:</h4>
                    {[
                      "Pre-built regulatory reporting templates",
                      "Custom report builder with drag-and-drop interface",
                      "Real-time KPI dashboards and performance metrics",
                      "Automated report scheduling and distribution",
                      "Export capabilities for various formats (PDF, Excel, CSV)",
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

      {/* Technical Architecture */}
      <section className="py-24 bg-white/50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Enterprise-Grade Architecture</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Built on modern cloud-native architecture with microservices, API-first design, and enterprise security
              standards.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: "Security & Compliance",
                features: [
                  "SOC 2 Type II certified",
                  "ISO 27001 compliance",
                  "End-to-end encryption",
                  "GDPR and data residency",
                  "Multi-factor authentication",
                  "Role-based access control",
                ],
              },
              {
                icon: Zap,
                title: "Performance & Scale",
                features: [
                  "99.9% uptime SLA",
                  "Auto-scaling infrastructure",
                  "Global CDN deployment",
                  "Sub-second response times",
                  "Concurrent user support",
                  "Load balancing",
                ],
              },
              {
                icon: Database,
                title: "Integration & APIs",
                features: [
                  "RESTful and GraphQL APIs",
                  "Webhook notifications",
                  "Pre-built connectors",
                  "SDK libraries",
                  "Real-time data sync",
                  "Event-driven architecture",
                ],
              },
            ].map((pillar, index) => (
              <Card key={index} className="border-stone-200/50 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                    <pillar.icon className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="text-2xl font-medium text-slate-800 mb-6">{pillar.title}</h3>
                  <div className="space-y-3">
                    {pillar.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-slate-800 mb-6">Experience the Future of Compliance</h2>
          <p className="text-xl text-slate-600 mb-8 font-light">
            See how RegSecured can transform your compliance operations with a personalized demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm h-14 px-8 text-lg">
              Schedule Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 border-slate-300">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
