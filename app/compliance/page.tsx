import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Shield, Globe, FileText, AlertTriangle, Users, TrendingUp } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/shared/hero-section"
import { FeatureCard } from "@/components/shared/feature-card"
import { CTASection } from "@/components/shared/cta-section"

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <HeroSection
        badge="Regulatory Compliance"
        title="Stay Ahead of"
        subtitle="Regulatory Changes"
        description="Navigate complex global compliance requirements with confidence. RegSecured keeps you updated with the latest regulatory changes and ensures your operations remain compliant across all jurisdictions."
        primaryCta={{ text: "Explore Compliance Features" }}
        secondaryCta={{ text: "Download Compliance Guide" }}
      />

      {/* Regulatory Coverage */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Global Regulatory Coverage</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Comprehensive compliance across major financial jurisdictions worldwide.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Multi-Jurisdiction Support",
                description: "Compliance frameworks for 150+ countries and territories.",
                features: [
                  "US BSA/AML regulations",
                  "EU 4th & 5th Anti-Money Laundering Directives",
                  "UK Money Laundering Regulations",
                  "FATF recommendations",
                  "Local regulatory requirements",
                ],
                bgColor: "bg-blue-50/50",
                iconColor: "text-blue-600",
              },
              {
                icon: FileText,
                title: "Regulatory Reporting",
                description: "Automated generation of required regulatory reports.",
                features: [
                  "Suspicious Activity Reports (SARs)",
                  "Currency Transaction Reports (CTRs)",
                  "FINCEN reporting",
                  "Regulatory notifications",
                  "Audit trail documentation",
                ],
                bgColor: "bg-emerald-50/50",
                iconColor: "text-emerald-600",
              },
              {
                icon: AlertTriangle,
                title: "Risk Management",
                description: "Proactive risk assessment and mitigation strategies.",
                features: [
                  "Risk-based approach implementation",
                  "Customer risk profiling",
                  "Transaction monitoring",
                  "Sanctions screening",
                  "PEP identification",
                ],
                bgColor: "bg-orange-50/50",
                iconColor: "text-orange-600",
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Framework */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Comprehensive Compliance Framework</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Customer Due Diligence",
                items: ["Identity verification", "Beneficial ownership", "Source of funds", "Ongoing monitoring"],
              },
              {
                icon: Shield,
                title: "AML Screening",
                items: ["Sanctions lists", "PEP databases", "Adverse media", "Custom watchlists"],
              },
              {
                icon: TrendingUp,
                title: "Transaction Monitoring",
                items: ["Real-time analysis", "Pattern detection", "Threshold alerts", "Case management"],
              },
              {
                icon: FileText,
                title: "Record Keeping",
                items: ["Audit trails", "Document retention", "Compliance reports", "Regulatory filings"],
              },
            ].map((framework, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <framework.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">{framework.title}</h3>
                  <div className="space-y-2">
                    {framework.items.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
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

      <CTASection
        title="Ensure Regulatory Compliance"
        description="Stay ahead of regulatory changes and maintain compliance across all jurisdictions with RegSecured's comprehensive compliance platform."
        primaryCta={{ text: "Schedule Compliance Demo" }}
        secondaryCta={{ text: "Download Compliance Checklist" }}
      />

      <Footer />
    </div>
  )
}
