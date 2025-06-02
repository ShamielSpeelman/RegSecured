import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Building2,
  Smartphone,
  TrendingUp,
  Shield,
  Coins,
  CheckCircle2,
  Users,
  Globe,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-stone-100 text-slate-700 px-4 py-2 border-0">Industry Solutions</Badge>
          <h1 className="text-4xl lg:text-5xl font-light mb-8 text-slate-800">
            Tailored for Your
            <br />
            <span className="font-normal text-slate-600">Industry Needs</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            RegSecured adapts to the unique compliance requirements of different financial sectors. From traditional
            banking to emerging fintech, our platform provides industry-specific workflows, templates, and integrations.
          </p>
        </div>
      </section>

      {/* Industry Solutions Grid */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: Building2,
                title: "Traditional Banking",
                description:
                  "Comprehensive compliance solutions for retail and commercial banks with legacy system integration.",
                features: [
                  "Core banking system integration",
                  "Branch and digital channel support",
                  "Regulatory reporting automation",
                  "Multi-jurisdiction compliance",
                  "Legacy system modernization",
                ],
                stats: { clients: "200+", reduction: "75%", compliance: "99.9%" },
                href: "/solutions/banking",
                bgColor: "bg-blue-50/50",
                iconColor: "text-blue-600",
              },
              {
                icon: Smartphone,
                title: "Fintech & Digital Banks",
                description:
                  "Agile compliance solutions designed for digital-first financial services and rapid scaling.",
                features: [
                  "API-first architecture",
                  "Mobile-optimized workflows",
                  "Rapid deployment capabilities",
                  "Scalable infrastructure",
                  "Developer-friendly integration",
                ],
                stats: { clients: "150+", reduction: "85%", compliance: "100%" },
                href: "/solutions/fintech",
                bgColor: "bg-purple-50/50",
                iconColor: "text-purple-600",
              },
              {
                icon: TrendingUp,
                title: "Asset Management",
                description:
                  "Specialized compliance workflows for investment managers, hedge funds, and wealth management firms.",
                features: [
                  "Investor onboarding automation",
                  "Sophisticated person screening",
                  "Fund compliance management",
                  "Accredited investor verification",
                  "Portfolio monitoring integration",
                ],
                stats: { clients: "80+", reduction: "70%", compliance: "99.8%" },
                href: "/solutions/asset-management",
                bgColor: "bg-emerald-50/50",
                iconColor: "text-emerald-600",
              },
              {
                icon: Shield,
                title: "Insurance",
                description:
                  "Compliance solutions tailored for insurance companies with focus on beneficiary verification.",
                features: [
                  "Beneficiary screening workflows",
                  "Policy holder verification",
                  "Claims investigation support",
                  "Regulatory compliance automation",
                  "Risk assessment integration",
                ],
                stats: { clients: "60+", reduction: "65%", compliance: "99.7%" },
                href: "/solutions/insurance",
                bgColor: "bg-orange-50/50",
                iconColor: "text-orange-600",
              },
            ].map((solution, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-stone-200/50 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl ${solution.bgColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <solution.icon className={`w-8 h-8 ${solution.iconColor}`} />
                  </div>

                  <h3 className="text-2xl font-medium text-slate-800 mb-4">{solution.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed font-light">{solution.description}</p>

                  <div className="space-y-3 mb-8">
                    {solution.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-stone-50/50 rounded-xl">
                    <div className="text-center">
                      <div className="text-lg font-medium text-slate-800">{solution.stats.clients}</div>
                      <div className="text-xs text-slate-500">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-slate-800">{solution.stats.reduction}</div>
                      <div className="text-xs text-slate-500">Time Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-slate-800">{solution.stats.compliance}</div>
                      <div className="text-xs text-slate-500">Compliance</div>
                    </div>
                  </div>

                  <Link href={solution.href}>
                    <Button variant="ghost" className="w-full justify-between text-slate-600 hover:text-slate-800">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Crypto & Digital Assets Section */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-amber-50/50 rounded-2xl flex items-center justify-center">
                  <Coins className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-3xl font-light text-slate-800">Crypto & Digital Assets</h2>
              </div>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-light">
                Specialized compliance solutions for cryptocurrency exchanges, digital asset platforms, and
                blockchain-based financial services. Navigate complex regulatory landscapes with confidence.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Crypto wallet address screening and monitoring",
                  "Travel rule compliance for digital assets",
                  "Enhanced due diligence for high-risk jurisdictions",
                  "Real-time transaction monitoring and alerts",
                  "Regulatory reporting for digital assets",
                  "Integration with blockchain analytics platforms",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700 font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/solutions/crypto">
                <Button className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm">
                  Explore Crypto Solutions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600&query=crypto compliance dashboard with blockchain monitoring"
                alt="Crypto Compliance Solutions"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Industry Benefits */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Universal Benefits Across Industries</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Regardless of your industry, RegSecured delivers consistent value through our core platform capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Improved Customer Experience",
                description: "Streamlined onboarding processes that reduce friction while maintaining security",
                benefits: ["Faster onboarding times", "Mobile-optimized workflows", "Real-time status updates"],
              },
              {
                icon: Globe,
                title: "Global Compliance Coverage",
                description: "Pre-configured rules for 150+ jurisdictions with automatic regulatory updates",
                benefits: [
                  "Multi-jurisdiction support",
                  "Regulatory change notifications",
                  "Local compliance expertise",
                ],
              },
              {
                icon: Zap,
                title: "Operational Efficiency",
                description: "Automation and AI-powered workflows that reduce manual work and human error",
                benefits: ["85% reduction in processing time", "Automated decision-making", "Resource optimization"],
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-4">{benefit.title}</h3>
                  <p className="text-slate-600 mb-6 font-light">{benefit.description}</p>
                  <div className="space-y-2">
                    {benefit.benefits.map((item, i) => (
                      <div key={i} className="text-sm text-slate-600 font-light">
                        • {item}
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
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-slate-800 mb-6">Ready to See RegSecured in Your Industry?</h2>
          <p className="text-xl text-slate-600 mb-8 font-light">
            Schedule a personalized demo to see how RegSecured can be tailored to your specific industry requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm h-14 px-8 text-lg">
              Schedule Industry Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 border-slate-300">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
