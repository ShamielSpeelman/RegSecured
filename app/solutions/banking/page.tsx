import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, CheckCircle2, Users, Shield, Globe, TrendingUp, Database, Clock } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function BankingSolutionsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-blue-50 text-blue-700 px-4 py-2 border-0">Banking Solutions</Badge>
              <h1 className="text-4xl lg:text-5xl font-light mb-8 text-slate-800">
                Modernize Banking
                <br />
                <span className="font-normal text-slate-600">Compliance Operations</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
                Transform traditional banking compliance with RegSecured's comprehensive platform. Integrate seamlessly
                with core banking systems while meeting evolving regulatory requirements across multiple jurisdictions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm h-12 px-6">
                  Schedule Banking Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-6 border-slate-300">
                  Download Case Study
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-medium text-slate-800">200+</div>
                  <div className="text-sm text-slate-600 font-light">Banking Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium text-slate-800">75%</div>
                  <div className="text-sm text-slate-600 font-light">Time Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium text-slate-800">99.9%</div>
                  <div className="text-sm text-slate-600 font-light">Compliance Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600&query=banking compliance dashboard with core system integration"
                alt="Banking Compliance Dashboard"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Banking-Specific Features */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Built for Banking Excellence</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Comprehensive compliance solutions designed specifically for traditional banking operations and regulatory
              requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: Building2,
                title: "Core Banking Integration",
                description:
                  "Seamless integration with major core banking platforms including Temenos, FIS, and Finastra.",
                features: [
                  "Real-time data synchronization",
                  "Account opening automation",
                  "Customer data consistency",
                  "Transaction monitoring integration",
                  "Regulatory reporting automation",
                ],
              },
              {
                icon: Users,
                title: "Multi-Channel Onboarding",
                description: "Consistent compliance across branch, online, and mobile banking channels.",
                features: [
                  "Branch staff workflow tools",
                  "Digital customer portals",
                  "Mobile-optimized processes",
                  "Omnichannel status tracking",
                  "Unified customer experience",
                ],
              },
              {
                icon: Shield,
                title: "Regulatory Compliance",
                description:
                  "Comprehensive coverage of banking regulations including BSA, CIP, CDD, and EDD requirements.",
                features: [
                  "BSA/AML compliance automation",
                  "Customer Identification Program (CIP)",
                  "Customer Due Diligence (CDD)",
                  "Enhanced Due Diligence (EDD)",
                  "Suspicious Activity Reporting (SAR)",
                ],
              },
              {
                icon: Globe,
                title: "Multi-Jurisdiction Support",
                description: "Navigate complex regulatory landscapes across different countries and regions.",
                features: [
                  "Country-specific compliance rules",
                  "Cross-border transaction monitoring",
                  "Local regulatory reporting",
                  "Currency transaction reporting",
                  "International sanctions screening",
                ],
              },
            ].map((feature, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 mb-6 font-light">{feature.description}</p>
                  <div className="space-y-3">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600 font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Banking Use Cases</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Real-world applications of RegSecured in banking environments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Retail Banking",
                description: "Streamline individual customer onboarding and account opening processes.",
                metrics: { time: "3 days to 2 hours", accuracy: "99.8%", satisfaction: "4.9/5" },
              },
              {
                icon: Database,
                title: "Commercial Banking",
                description: "Handle complex business relationships and beneficial ownership requirements.",
                metrics: { time: "2 weeks to 3 days", accuracy: "99.9%", satisfaction: "4.8/5" },
              },
              {
                icon: Clock,
                title: "Private Banking",
                description: "Enhanced due diligence for high-net-worth individuals and sophisticated clients.",
                metrics: { time: "4 weeks to 1 week", accuracy: "100%", satisfaction: "4.9/5" },
              },
            ].map((useCase, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-50/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <useCase.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-4">{useCase.title}</h3>
                  <p className="text-slate-600 mb-6 font-light">{useCase.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Processing Time:</span>
                      <span className="text-slate-800 font-medium">{useCase.metrics.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Accuracy:</span>
                      <span className="text-slate-800 font-medium">{useCase.metrics.accuracy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Satisfaction:</span>
                      <span className="text-slate-800 font-medium">{useCase.metrics.satisfaction}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Implementation Process</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Our proven methodology ensures smooth deployment with minimal disruption to banking operations.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Assessment & Planning",
                description: "Comprehensive analysis of current systems and compliance requirements.",
                duration: "2-4 weeks",
              },
              {
                step: "02",
                title: "System Integration",
                description: "Connect RegSecured with core banking systems and existing infrastructure.",
                duration: "4-6 weeks",
              },
              {
                step: "03",
                title: "Configuration & Testing",
                description: "Customize workflows and conduct thorough testing with sample data.",
                duration: "3-4 weeks",
              },
              {
                step: "04",
                title: "Training & Go-Live",
                description: "Staff training and phased rollout with ongoing support.",
                duration: "2-3 weeks",
              },
            ].map((phase, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-700 text-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-medium">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{phase.title}</h3>
                  <p className="text-slate-600 mb-2 font-light text-sm">{phase.description}</p>
                  <div className="text-xs text-slate-500 font-light">{phase.duration}</div>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-stone-200 -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-slate-800 mb-6">Transform Your Banking Compliance</h2>
          <p className="text-xl text-slate-600 mb-8 font-light">
            Join 200+ banks already using RegSecured to modernize their compliance operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm h-14 px-8 text-lg">
              Schedule Banking Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 border-slate-300">
              Download ROI Calculator
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
