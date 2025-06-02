import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Shield, TrendingUp, Globe, CheckCircle2, AlertTriangle, Database, Zap } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/shared/hero-section"
import { FeatureCard } from "@/components/shared/feature-card"
import { CTASection } from "@/components/shared/cta-section"

export default function CryptoSolutionsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <HeroSection
        badge="Crypto & Digital Assets"
        title="Navigate Crypto"
        subtitle="Compliance Confidently"
        description="Specialized compliance solutions for cryptocurrency exchanges, digital asset platforms, and blockchain-based financial services. Stay compliant with evolving regulations while enabling innovation in the digital asset space."
        primaryCta={{ text: "Schedule Crypto Demo" }}
        secondaryCta={{ text: "Download Crypto Guide" }}
      >
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-medium text-slate-800">50+</div>
            <div className="text-sm text-slate-600 font-light">Crypto Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-slate-800">90%</div>
            <div className="text-sm text-slate-600 font-light">Compliance Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-slate-800">24/7</div>
            <div className="text-sm text-slate-600 font-light">Monitoring</div>
          </div>
        </div>
      </HeroSection>

      {/* Crypto-Specific Challenges */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Crypto Compliance Challenges</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              The digital asset industry faces unique compliance requirements that traditional solutions can't address.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "Regulatory Uncertainty",
                description: "Rapidly evolving regulations across multiple jurisdictions",
                challenge: "Keeping up with changing rules",
              },
              {
                icon: Globe,
                title: "Travel Rule Compliance",
                description: "Cross-border transaction reporting requirements",
                challenge: "Complex multi-party coordination",
              },
              {
                icon: Shield,
                title: "Wallet Screening",
                description: "Monitoring cryptocurrency addresses and transactions",
                challenge: "Pseudonymous nature of crypto",
              },
              {
                icon: Database,
                title: "Transaction Monitoring",
                description: "Real-time analysis of blockchain transactions",
                challenge: "High volume and velocity",
              },
            ].map((challenge, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-amber-50/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <challenge.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{challenge.title}</h3>
                  <p className="text-slate-600 font-light text-sm mb-3">{challenge.description}</p>
                  <div className="text-xs text-amber-600 font-medium">{challenge.challenge}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Crypto Solutions */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Comprehensive Crypto Compliance</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Purpose-built solutions for the unique challenges of digital asset compliance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: Coins,
                title: "Crypto Wallet Screening",
                description: "Advanced screening of cryptocurrency addresses and wallet clusters",
                features: [
                  "Real-time address screening against sanctions lists",
                  "Wallet clustering and entity attribution",
                  "Risk scoring for cryptocurrency addresses",
                  "Integration with blockchain analytics platforms",
                  "Support for 50+ cryptocurrencies",
                ],
                bgColor: "bg-amber-50/50",
                iconColor: "text-amber-600",
              },
              {
                icon: Globe,
                title: "Travel Rule Compliance",
                description: "Automated compliance with FATF Travel Rule requirements",
                features: [
                  "Automated beneficiary information collection",
                  "Cross-border transaction reporting",
                  "Integration with TRISA and other protocols",
                  "Threshold monitoring and alerts",
                  "Multi-jurisdiction compliance support",
                ],
                bgColor: "bg-blue-50/50",
                iconColor: "text-blue-600",
              },
              {
                icon: TrendingUp,
                title: "Transaction Monitoring",
                description: "Real-time monitoring of cryptocurrency transactions",
                features: [
                  "Pattern recognition for suspicious activity",
                  "High-frequency transaction analysis",
                  "Cross-chain transaction tracking",
                  "Automated alert generation",
                  "Integration with blockchain explorers",
                ],
                bgColor: "bg-emerald-50/50",
                iconColor: "text-emerald-600",
              },
              {
                icon: Shield,
                title: "Regulatory Reporting",
                description: "Automated generation of crypto-specific regulatory reports",
                features: [
                  "Suspicious Activity Reports (SARs) for crypto",
                  "Currency Transaction Reports (CTRs)",
                  "Travel Rule reporting automation",
                  "Jurisdiction-specific compliance reports",
                  "Real-time regulatory change notifications",
                ],
                bgColor: "bg-purple-50/50",
                iconColor: "text-purple-600",
              },
            ].map((solution, index) => (
              <FeatureCard key={index} {...solution} />
            ))}
          </div>
        </div>
      </section>

      {/* Supported Cryptocurrencies */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Supported Digital Assets</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Comprehensive coverage across major cryptocurrencies and blockchain networks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-medium text-slate-800 mb-6">50+ Cryptocurrencies Supported</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Bitcoin (BTC)",
                  "Ethereum (ETH)",
                  "Litecoin (LTC)",
                  "Bitcoin Cash (BCH)",
                  "Ripple (XRP)",
                  "Cardano (ADA)",
                  "Polkadot (DOT)",
                  "Chainlink (LINK)",
                  "Stellar (XLM)",
                  "Monero (XMR)",
                  "Zcash (ZEC)",
                  "Dash (DASH)",
                ].map((crypto, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-slate-600 font-light">{crypto}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Badge variant="secondary" className="text-sm">
                  + Custom token support available
                </Badge>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500&query=cryptocurrency compliance dashboard with blockchain monitoring"
                alt="Crypto Compliance Dashboard"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Landscape */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Global Crypto Regulations</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Stay compliant with evolving cryptocurrency regulations worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                region: "United States",
                regulations: ["FinCEN Travel Rule", "BSA/AML Requirements", "OFAC Sanctions", "State Licensing"],
                status: "Established Framework",
              },
              {
                region: "European Union",
                regulations: ["5AMLD", "MiCA Regulation", "Travel Rule", "GDPR Compliance"],
                status: "Evolving Framework",
              },
              {
                region: "Asia Pacific",
                regulations: ["Japan JVCEA", "Singapore MAS", "Hong Kong SFC", "Australia AUSTRAC"],
                status: "Diverse Approaches",
              },
            ].map((region, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-slate-800 mb-3">{region.region}</h3>
                  <div className="space-y-2 mb-4">
                    {region.regulations.map((reg, i) => (
                      <div key={i} className="text-sm text-slate-600 font-light">
                        • {reg}
                      </div>
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {region.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Blockchain Analytics Partners</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Integrated with leading blockchain analytics and compliance platforms.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Chainalysis",
              "Elliptic",
              "CipherTrace",
              "TRM Labs",
              "Coinfirm",
              "Crystal",
              "Scorechain",
              "Blocktrace",
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-stone-200/50 text-center"
              >
                <Image
                  src={`/placeholder.svg?height=60&width=120&query=${partner} logo grayscale`}
                  alt={partner}
                  width={120}
                  height={60}
                  className="opacity-60 hover:opacity-80 transition-opacity mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Crypto Business Use Cases</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Cryptocurrency Exchanges",
                description: "Complete compliance solution for crypto trading platforms",
                features: [
                  "User onboarding",
                  "Transaction monitoring",
                  "Travel Rule compliance",
                  "Regulatory reporting",
                ],
              },
              {
                icon: Database,
                title: "DeFi Protocols",
                description: "Compliance tools for decentralized finance applications",
                features: [
                  "Smart contract monitoring",
                  "Liquidity pool screening",
                  "Governance compliance",
                  "Risk assessment",
                ],
              },
              {
                icon: Shield,
                title: "Crypto Custodians",
                description: "Institutional-grade compliance for digital asset custody",
                features: ["Wallet screening", "Transaction analysis", "Regulatory reporting", "Audit trails"],
              },
            ].map((useCase, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-amber-50/50 rounded-xl flex items-center justify-center mb-4">
                    <useCase.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-3">{useCase.title}</h3>
                  <p className="text-slate-600 font-light mb-4">{useCase.description}</p>
                  <div className="space-y-2">
                    {useCase.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
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

      <CTASection
        title="Ready to Navigate Crypto Compliance?"
        description="Join leading crypto businesses using RegSecured to stay compliant while enabling innovation in the digital asset space."
        primaryCta={{ text: "Schedule Crypto Demo" }}
        secondaryCta={{ text: "Download Compliance Guide" }}
      />

      <Footer />
    </div>
  )
}
