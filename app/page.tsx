import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Zap,
  Globe,
  Users,
  CheckCircle2,
  Play,
  Star,
  TrendingUp,
  Database,
  Workflow,
  Shield,
} from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-stone-100 text-slate-700 px-3 py-1.5 rounded-full text-sm">
                <Zap className="w-3.5 h-3.5" />
                <span>Enterprise AML KYC Platform</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-light leading-relaxed text-slate-800">
                Intelligent Compliance
                <br />
                <span className="font-normal text-slate-600">Made Simple</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl font-light">
                Transform your AML KYC operations with our enterprise-grade platform. Reduce onboarding time by 85%,
                ensure complete regulatory compliance, and scale globally with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm h-12 px-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 border-slate-300 text-slate-700 hover:bg-stone-100"
                >
                  <Play className="mr-2 w-4 h-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-6">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 border-2 border-stone-50"
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 font-light">Trusted by 500+ institutions</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm text-slate-600 ml-2 font-light">4.9/5 rating</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/30 to-stone-300/30 rounded-2xl blur-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-stone-200/50">
                <Image
                  src="/placeholder.svg?height=450&width=600&query=clean minimal AML KYC dashboard interface with soft colors"
                  alt="RegSecured Platform Dashboard"
                  width={600}
                  height={450}
                  className="rounded-xl"
                />

                {/* Floating UI Elements */}
                <div className="absolute -top-3 -left-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-3 border border-stone-200/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs font-medium text-slate-700">Live Monitoring</span>
                  </div>
                </div>

                <div className="absolute -bottom-3 -right-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-3 border border-stone-200/50">
                  <div className="text-center">
                    <div className="text-xl font-medium text-slate-700">85%</div>
                    <div className="text-xs text-slate-500">Time Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "85%", label: "Faster Onboarding", sublabel: "Average time reduction" },
              { number: "99.9%", label: "Compliance Rate", sublabel: "Regulatory accuracy" },
              { number: "150+", label: "Jurisdictions", sublabel: "Global coverage" },
              { number: "24/7", label: "Monitoring", sublabel: "Real-time alerts" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-slate-700 mb-2">{stat.number}</div>
                <div className="text-base font-medium text-slate-800 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-500 font-light">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Platform Features */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-6 bg-stone-100 text-slate-700 px-3 py-1 border-0">
              Platform Capabilities
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-800 mb-6">
              Complete AML KYC Lifecycle Management
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              From client onboarding to ongoing monitoring, RegSecured provides end-to-end compliance automation with
              enterprise-grade security and global regulatory coverage.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Intelligent Client Onboarding",
                description:
                  "AI-powered workflows that adapt to client types, jurisdictions, and risk profiles with automated document processing and verification.",
                features: [
                  "Dynamic form generation based on regulatory requirements",
                  "OCR and AI document extraction with 99.5% accuracy",
                  "Real-time identity verification and biometric matching",
                  "Automated beneficial ownership discovery and mapping",
                  "Multi-language support for 40+ languages",
                ],
                bgColor: "bg-blue-50/50",
                iconColor: "text-blue-600",
              },
              {
                icon: Shield,
                title: "Advanced AML Screening Engine",
                description:
                  "Comprehensive screening against global sanctions, PEP lists, and adverse media with intelligent false positive management.",
                features: [
                  "Real-time screening against 200+ global watchlists",
                  "AI-powered fuzzy matching with 95% accuracy",
                  "Continuous monitoring with instant alert notifications",
                  "Advanced entity resolution and relationship mapping",
                  "Customizable screening rules and thresholds",
                ],
                bgColor: "bg-purple-50/50",
                iconColor: "text-purple-600",
              },
              {
                icon: TrendingUp,
                title: "Dynamic Risk Assessment",
                description:
                  "Machine learning-powered risk scoring that evolves with your business and regulatory landscape.",
                features: [
                  "Configurable risk models with 50+ risk factors",
                  "Real-time risk calculation and automatic updates",
                  "Predictive analytics for emerging risk patterns",
                  "Regulatory change impact assessment",
                  "Custom risk appetite configuration",
                ],
                bgColor: "bg-emerald-50/50",
                iconColor: "text-emerald-600",
              },
              {
                icon: Database,
                title: "Unified Data Management",
                description:
                  "Single source of truth for all client data with advanced analytics and relationship mapping.",
                features: [
                  "360-degree client view with relationship hierarchies",
                  "Data quality management and deduplication",
                  "Advanced search and filtering capabilities",
                  "Audit trail and data lineage tracking",
                  "GDPR and data residency compliance",
                ],
                bgColor: "bg-orange-50/50",
                iconColor: "text-orange-600",
              },
              {
                icon: Workflow,
                title: "Flexible Workflow Engine",
                description: "Visual workflow designer with no-code configuration for complex compliance processes.",
                features: [
                  "Drag-and-drop workflow builder",
                  "Conditional logic and decision trees",
                  "SLA management and escalation rules",
                  "Multi-level approval workflows",
                  "Integration with external systems",
                ],
                bgColor: "bg-indigo-50/50",
                iconColor: "text-indigo-600",
              },
              {
                icon: Globe,
                title: "Global Compliance Framework",
                description:
                  "Pre-configured compliance rules for 150+ jurisdictions with automatic regulatory updates.",
                features: [
                  "Jurisdiction-specific compliance templates",
                  "Automatic regulatory change notifications",
                  "Cross-border compliance orchestration",
                  "Local language and cultural adaptations",
                  "Regulatory reporting automation",
                ],
                bgColor: "bg-teal-50/50",
                iconColor: "text-teal-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-md transition-all duration-300 border-stone-200/50 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-medium text-slate-800 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed font-light">{feature.description}</p>

                  <div className="space-y-3">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-slate-600 leading-relaxed font-light">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="ghost" className="mt-6 p-0 h-auto text-slate-600 hover:text-slate-800 font-light">
                    Learn more <ArrowRight className="ml-1 w-3.5 h-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Seamless Integration Ecosystem</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Connect RegSecured with your existing technology stack through our comprehensive API and pre-built
              integrations with leading financial services providers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
            {[
              "Salesforce",
              "Microsoft",
              "Oracle",
              "SAP",
              "Temenos",
              "FIS",
              "Refinitiv",
              "LexisNexis",
              "Dow Jones",
              "Jumio",
              "Onfido",
              "Veriff",
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-stone-200/50"
              >
                <Image
                  src={`/placeholder.svg?height=50&width=100&query=${partner} logo grayscale`}
                  alt={partner}
                  width={100}
                  height={50}
                  className="opacity-60 hover:opacity-80 transition-opacity mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&query=subtle geometric pattern')] opacity-5"></div>
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-light text-stone-50 mb-6">
                Ready to Transform Your Compliance Operations?
              </h2>
              <p className="text-lg text-stone-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Join 500+ financial institutions already using RegSecured to automate compliance, reduce costs, and
                accelerate growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-stone-50 text-slate-800 hover:bg-white h-12 px-6 font-medium">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-stone-300 text-stone-100 hover:bg-stone-600/20 h-12 px-6"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
