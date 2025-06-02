import { Smartphone, Zap, Code, Rocket } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/shared/hero-section"
import { FeatureCard } from "@/components/shared/feature-card"
import { CTASection } from "@/components/shared/cta-section"

export default function FintechSolutionsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <HeroSection
        badge="Fintech Solutions"
        title="Scale Fast with"
        subtitle="Compliant Innovation"
        description="Purpose-built for digital-first financial services. RegSecured's API-first platform enables rapid deployment and scaling while maintaining regulatory compliance from day one."
        primaryCta={{ text: "Schedule Fintech Demo" }}
        secondaryCta={{ text: "View API Documentation" }}
      >
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-medium text-slate-800">150+</div>
            <div className="text-sm text-slate-600 font-light">Fintech Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-slate-800">85%</div>
            <div className="text-sm text-slate-600 font-light">Time Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-slate-800">48hrs</div>
            <div className="text-sm text-slate-600 font-light">Deployment</div>
          </div>
        </div>
      </HeroSection>

      {/* Fintech-Specific Features */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: Code,
                title: "API-First Architecture",
                description: "Developer-friendly APIs designed for modern fintech applications.",
                features: [
                  "RESTful and GraphQL APIs",
                  "Comprehensive SDK libraries",
                  "Webhook notifications",
                  "Real-time data synchronization",
                  "Sandbox environment for testing",
                ],
                bgColor: "bg-purple-50/50",
                iconColor: "text-purple-600",
              },
              {
                icon: Rocket,
                title: "Rapid Deployment",
                description: "Get compliant and operational in hours, not months.",
                features: [
                  "Pre-configured compliance workflows",
                  "Cloud-native infrastructure",
                  "Auto-scaling capabilities",
                  "Zero-downtime deployments",
                  "Continuous integration support",
                ],
                bgColor: "bg-emerald-50/50",
                iconColor: "text-emerald-600",
              },
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                description: "Optimized for mobile and digital customer experiences.",
                features: [
                  "Responsive web interfaces",
                  "Mobile SDK integration",
                  "Progressive web app support",
                  "Offline capability",
                  "Touch-optimized workflows",
                ],
                bgColor: "bg-blue-50/50",
                iconColor: "text-blue-600",
              },
              {
                icon: Zap,
                title: "Performance Optimized",
                description: "Built for high-volume, low-latency fintech operations.",
                features: [
                  "Sub-second response times",
                  "High-throughput processing",
                  "Global CDN deployment",
                  "Load balancing",
                  "99.9% uptime SLA",
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

      <CTASection
        title="Ready to Scale Your Fintech?"
        description="Join 150+ fintech companies using RegSecured to accelerate growth while maintaining compliance."
        primaryCta={{ text: "Start Free Trial" }}
        secondaryCta={{ text: "Contact Sales" }}
      />

      <Footer />
    </div>
  )
}
