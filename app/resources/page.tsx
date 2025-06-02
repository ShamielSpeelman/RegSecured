import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Video, FileText, Users, Download, ExternalLink } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/shared/hero-section"
import { ConsistentButton } from "@/components/ui/button-consistent"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <HeroSection
        badge="Resources & Support"
        title="Everything You Need"
        subtitle="to Succeed"
        description="Access comprehensive documentation, training materials, case studies, and expert support to maximize your RegSecured implementation and compliance operations."
        primaryCta={{ text: "Browse Documentation" }}
        secondaryCta={{ text: "Contact Support" }}
      />

      {/* Resource Categories */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Documentation",
                description: "Comprehensive guides, API references, and implementation tutorials.",
                items: [
                  "Getting Started Guide",
                  "API Documentation",
                  "Integration Tutorials",
                  "Best Practices",
                  "Troubleshooting",
                ],
                href: "/resources/documentation",
              },
              {
                icon: Video,
                title: "Training & Webinars",
                description: "Live and recorded training sessions to master RegSecured.",
                items: [
                  "Platform Overview",
                  "Advanced Features",
                  "Compliance Training",
                  "Industry Webinars",
                  "Certification Program",
                ],
                href: "/resources/webinars",
              },
              {
                icon: FileText,
                title: "Case Studies",
                description: "Real-world success stories and implementation examples.",
                items: [
                  "Banking Transformations",
                  "Fintech Success Stories",
                  "Compliance Improvements",
                  "ROI Case Studies",
                  "Implementation Stories",
                ],
                href: "/resources/case-studies",
              },
            ].map((category, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center mb-6">
                    <category.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 mb-4">{category.title}</h3>
                  <p className="text-slate-600 mb-6 font-light">{category.description}</p>
                  <div className="space-y-2 mb-6">
                    {category.items.map((item, i) => (
                      <div key={i} className="text-sm text-slate-600 font-light">
                        • {item}
                      </div>
                    ))}
                  </div>
                  <ConsistentButton variant="ghost" className="w-full justify-between">
                    Explore {category.title}
                    <ExternalLink className="w-4 h-4" />
                  </ConsistentButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Get Support</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Our expert support team is here to help you succeed with RegSecured.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "24/7 Support",
                description: "Round-the-clock assistance for enterprise customers.",
                action: "Contact Support",
              },
              {
                icon: BookOpen,
                title: "Knowledge Base",
                description: "Searchable database of articles and solutions.",
                action: "Browse Articles",
              },
              {
                icon: Video,
                title: "Video Tutorials",
                description: "Step-by-step video guides for all features.",
                action: "Watch Videos",
              },
              {
                icon: Download,
                title: "Downloads",
                description: "SDKs, templates, and integration tools.",
                action: "Download Resources",
              },
            ].map((support, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <support.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{support.title}</h3>
                  <p className="text-slate-600 mb-4 font-light text-sm">{support.description}</p>
                  <ConsistentButton variant="ghost" size="sm">
                    {support.action}
                  </ConsistentButton>
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
