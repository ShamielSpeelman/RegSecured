import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Key, Eye, Server, Globe, CheckCircle2, AlertTriangle, Users, Database } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/shared/hero-section"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <HeroSection
        badge="Enterprise Security"
        title="Bank-Grade Security"
        subtitle="for Your Data"
        description="RegSecured implements the highest security standards to protect your sensitive compliance data. Our comprehensive security framework ensures your information remains safe, secure, and compliant with global regulations."
        primaryCta={{ text: "Download Security Whitepaper" }}
        secondaryCta={{ text: "Schedule Security Review" }}
      />

      {/* Security Certifications */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Security Certifications & Compliance</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              RegSecured meets the most stringent security and compliance standards in the financial services industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "SOC 2 Type II",
                description: "Independently audited security controls and processes",
                icon: Shield,
              },
              {
                title: "ISO 27001",
                description: "International standard for information security management",
                icon: Lock,
              },
              {
                title: "GDPR Compliant",
                description: "Full compliance with European data protection regulations",
                icon: Globe,
              },
              {
                title: "PCI DSS",
                description: "Payment card industry data security standards",
                icon: Key,
              },
            ].map((cert, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{cert.title}</h3>
                  <p className="text-slate-600 font-light text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Framework */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Comprehensive Security Framework</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                icon: Database,
                title: "Data Protection",
                description: "Multi-layered approach to protecting your sensitive compliance data",
                features: [
                  "AES-256 encryption at rest and in transit",
                  "End-to-end encryption for all data transfers",
                  "Encrypted database storage with key rotation",
                  "Secure data backup and disaster recovery",
                  "Data residency controls for global compliance",
                  "Automated data classification and handling",
                ],
              },
              {
                icon: Users,
                title: "Access Control",
                description: "Granular access controls and identity management",
                features: [
                  "Multi-factor authentication (MFA) required",
                  "Role-based access control (RBAC)",
                  "Single sign-on (SSO) integration",
                  "Just-in-time access provisioning",
                  "Regular access reviews and audits",
                  "Privileged access management (PAM)",
                ],
              },
              {
                icon: Server,
                title: "Infrastructure Security",
                description: "Secure cloud infrastructure with continuous monitoring",
                features: [
                  "AWS/Azure enterprise-grade infrastructure",
                  "Network segmentation and firewalls",
                  "DDoS protection and traffic filtering",
                  "Intrusion detection and prevention",
                  "Vulnerability scanning and patching",
                  "Security incident response team",
                ],
              },
              {
                icon: Eye,
                title: "Monitoring & Auditing",
                description: "Comprehensive logging and real-time security monitoring",
                features: [
                  "24/7 security operations center (SOC)",
                  "Real-time threat detection and response",
                  "Comprehensive audit logs and trails",
                  "Automated security alerting",
                  "Regular penetration testing",
                  "Compliance monitoring and reporting",
                ],
              },
            ].map((framework, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center">
                      <framework.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-slate-800">{framework.title}</h3>
                      <p className="text-slate-600 font-light text-sm">{framework.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {framework.features.map((feature, i) => (
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

      {/* Security Practices */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Security Best Practices</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Our security practices go beyond compliance to ensure the highest level of protection for your data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Development",
                practices: [
                  "Secure coding standards and reviews",
                  "Static and dynamic code analysis",
                  "Dependency vulnerability scanning",
                  "Security testing in CI/CD pipeline",
                  "Regular security training for developers",
                ],
              },
              {
                icon: Key,
                title: "Key Management",
                practices: [
                  "Hardware security modules (HSMs)",
                  "Automated key rotation policies",
                  "Secure key storage and distribution",
                  "Cryptographic key lifecycle management",
                  "Multi-party key escrow procedures",
                ],
              },
              {
                icon: AlertTriangle,
                title: "Incident Response",
                practices: [
                  "24/7 security incident response team",
                  "Automated threat detection and alerting",
                  "Incident classification and escalation",
                  "Forensic analysis and remediation",
                  "Post-incident review and improvement",
                ],
              },
            ].map((practice, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                    <practice.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">{practice.title}</h3>
                  <div className="space-y-2">
                    {practice.practices.map((item, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-1 flex-shrink-0" />
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

      {/* Security Transparency */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-slate-800 mb-6">Security Transparency</h2>
          <p className="text-xl text-slate-600 mb-8 font-light">
            We believe in transparency about our security practices. Access detailed security documentation and reports.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Security Whitepaper",
                description: "Comprehensive overview of our security architecture and controls",
                action: "Download PDF",
              },
              {
                title: "Compliance Reports",
                description: "Latest SOC 2 and ISO 27001 audit reports and certifications",
                action: "View Reports",
              },
              {
                title: "Security Portal",
                description: "Real-time security status and incident notifications",
                action: "Access Portal",
              },
            ].map((resource, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{resource.title}</h3>
                  <p className="text-slate-600 font-light text-sm mb-4">{resource.description}</p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">{resource.action} →</button>
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
