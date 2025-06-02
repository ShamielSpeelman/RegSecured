import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-stone-100 text-slate-700 px-4 py-2 border-0">Legal</Badge>
          <h1 className="text-4xl lg:text-5xl font-light mb-8 text-slate-800">Privacy Policy</h1>
          <p className="text-lg text-slate-600 mb-8 font-light">Last updated: December 2024</p>

          <div className="prose prose-slate max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">1. Introduction</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  RegSecured Inc. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our AML KYC
                  compliance platform and related services (the "Service").
                </p>
                <p className="text-slate-600 font-light leading-relaxed">
                  By accessing or using our Service, you agree to the collection and use of information in accordance
                  with this Privacy Policy. If you do not agree with our policies and practices, do not use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-medium text-slate-800 mb-3">2.1 Personal Information</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  We collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-slate-600 font-light space-y-2 mb-4">
                  <li>Register for an account or request a demo</li>
                  <li>Use our compliance platform services</li>
                  <li>Contact us for support or inquiries</li>
                  <li>Subscribe to our newsletters or marketing communications</li>
                  <li>Participate in surveys, contests, or promotions</li>
                </ul>

                <h3 className="text-xl font-medium text-slate-800 mb-3">2.2 Customer Data</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  As part of our compliance services, we process customer data on behalf of our clients, including:
                </p>
                <ul className="list-disc pl-6 text-slate-600 font-light space-y-2 mb-4">
                  <li>Identity verification documents and information</li>
                  <li>Know Your Customer (KYC) data</li>
                  <li>Anti-Money Laundering (AML) screening results</li>
                  <li>Transaction monitoring data</li>
                  <li>Risk assessment information</li>
                </ul>

                <h3 className="text-xl font-medium text-slate-800 mb-3">2.3 Technical Information</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  We automatically collect certain technical information when you use our Service:
                </p>
                <ul className="list-disc pl-6 text-slate-600 font-light space-y-2">
                  <li>IP addresses and device identifiers</li>
                  <li>Browser type and version</li>
                  <li>Operating system information</li>
                  <li>Usage patterns and platform interactions</li>
                  <li>Log files and system performance data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">3. How We Use Your Information</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-slate-600 font-light space-y-2">
                  <li>Provide, operate, and maintain our compliance platform</li>
                  <li>Process compliance checks and regulatory screenings</li>
                  <li>Improve and personalize user experience</li>
                  <li>Communicate with you about our services</li>
                  <li>Provide customer support and technical assistance</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Detect, prevent, and address fraud and security issues</li>
                  <li>Conduct research and analytics to improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">4. Information Sharing and Disclosure</h2>

                <h3 className="text-xl font-medium text-slate-800 mb-3">4.1 Service Providers</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  We may share your information with trusted third-party service providers who assist us in operating
                  our platform, including cloud hosting providers, data processors, and compliance data vendors. These
                  providers are contractually bound to protect your information.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">4.2 Legal Requirements</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  We may disclose your information when required by law, regulation, or legal process, or when we
                  believe disclosure is necessary to protect our rights, your safety, or the safety of others.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">4.3 Business Transfers</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part
                  of the business transaction, subject to appropriate confidentiality protections.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">5. Data Security</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 text-slate-600 font-light space-y-2">
                  <li>End-to-end encryption for data in transit and at rest</li>
                  <li>Multi-factor authentication and access controls</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>SOC 2 Type II and ISO 27001 compliance</li>
                  <li>Employee security training and background checks</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">6. Your Rights and Choices</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-slate-600 font-light space-y-2">
                  <li>Access: Request access to your personal information</li>
                  <li>Rectification: Request correction of inaccurate information</li>
                  <li>Erasure: Request deletion of your personal information</li>
                  <li>Portability: Request transfer of your data to another service</li>
                  <li>Restriction: Request limitation of processing activities</li>
                  <li>Objection: Object to certain processing activities</li>
                  <li>Withdrawal: Withdraw consent where processing is based on consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">7. International Data Transfers</h2>
                <p className="text-slate-600 font-light leading-relaxed">
                  We may transfer your information to countries outside your jurisdiction. When we do so, we ensure
                  appropriate safeguards are in place, including Standard Contractual Clauses approved by the European
                  Commission and other legally recognized transfer mechanisms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">8. Data Retention</h2>
                <p className="text-slate-600 font-light leading-relaxed">
                  We retain your information for as long as necessary to provide our services and comply with legal
                  obligations. Customer data processed on behalf of our clients is retained according to their
                  instructions and applicable regulatory requirements, typically 5-7 years for compliance records.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">9. Children's Privacy</h2>
                <p className="text-slate-600 font-light leading-relaxed">
                  Our Service is not intended for individuals under 18 years of age. We do not knowingly collect
                  personal information from children under 18. If we become aware that we have collected such
                  information, we will take steps to delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-slate-600 font-light leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by
                  posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use
                  of the Service after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">11. Contact Information</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-stone-100 rounded-lg p-6">
                  <p className="text-slate-700 font-medium mb-2">RegSecured Inc.</p>
                  <p className="text-slate-600 font-light">Data Protection Officer</p>
                  <p className="text-slate-600 font-light">123 Financial District</p>
                  <p className="text-slate-600 font-light">New York, NY 10004</p>
                  <p className="text-slate-600 font-light">Email: privacy@regsecured.com</p>
                  <p className="text-slate-600 font-light">Phone: +1 (555) 123-4567</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
