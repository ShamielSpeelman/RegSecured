import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-stone-100 text-slate-700 px-4 py-2 border-0">Legal</Badge>
          <h1 className="text-4xl lg:text-5xl font-light mb-8 text-slate-800">Terms of Service</h1>
          <p className="text-lg text-slate-600 mb-8 font-light">Last updated: December 2024</p>

          <div className="prose prose-slate max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and RegSecured
                  Inc. ("RegSecured," "we," "our," or "us") regarding your use of our AML KYC compliance platform and
                  related services (the "Service").
                </p>
                <p className="text-slate-600 font-light leading-relaxed">
                  By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these
                  Terms, you may not access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">2. Description of Service</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  RegSecured provides a cloud-based compliance platform that offers:
                </p>
                <ul className="list-disc pl-6 text-slate-600 font-light space-y-2">
                  <li>Anti-Money Laundering (AML) screening and monitoring</li>
                  <li>Know Your Customer (KYC) verification services</li>
                  <li>Identity verification and document processing</li>
                  <li>Risk assessment and management tools</li>
                  <li>Regulatory reporting and compliance workflows</li>
                  <li>API access and integration capabilities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">3. User Accounts and Registration</h2>

                <h3 className="text-xl font-medium text-slate-800 mb-3">3.1 Account Creation</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  To use our Service, you must create an account by providing accurate, current, and complete
                  information. You are responsible for maintaining the confidentiality of your account credentials and
                  for all activities that occur under your account.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">3.2 Eligibility</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  You must be at least 18 years old and have the legal authority to enter into these Terms. If you are
                  using the Service on behalf of an organization, you represent that you have the authority to bind that
                  organization to these Terms.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">3.3 Account Security</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  You must immediately notify us of any unauthorized use of your account or any other breach of
                  security. We are not liable for any loss or damage arising from your failure to protect your account
                  information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">4. Acceptable Use Policy</h2>

                <h3 className="text-xl font-medium text-slate-800 mb-3">4.1 Permitted Uses</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  You may use the Service only for lawful purposes and in accordance with these Terms. You agree to use
                  the Service in compliance with all applicable laws, regulations, and industry standards.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">4.2 Prohibited Activities</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-slate-600 font-light space-y-2">
                  <li>Use the Service for any illegal or unauthorized purpose</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                  <li>Remove or modify any proprietary notices or labels</li>
                  <li>Use the Service to transmit malicious code or harmful content</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">5. Data Processing and Privacy</h2>

                <h3 className="text-xl font-medium text-slate-800 mb-3">5.1 Customer Data</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  You retain ownership of all data you submit to the Service ("Customer Data"). We process Customer Data
                  solely to provide the Service and in accordance with your instructions and our Privacy Policy.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">5.2 Data Protection</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect Customer Data against
                  unauthorized access, alteration, disclosure, or destruction. However, you acknowledge that no security
                  measures are perfect or impenetrable.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">5.3 Compliance Obligations</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  You are responsible for ensuring that your use of the Service complies with applicable data protection
                  laws, including GDPR, CCPA, and other relevant regulations. You must obtain all necessary consents and
                  authorizations for data processing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">6. Subscription and Payment Terms</h2>

                <h3 className="text-xl font-medium text-slate-800 mb-3">6.1 Subscription Plans</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  Our Service is offered through various subscription plans with different features and usage limits.
                  Current pricing and plan details are available on our website.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">6.2 Payment Terms</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable
                  except as expressly stated in these Terms or required by law.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">6.3 Auto-Renewal</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Subscriptions automatically renew for successive periods unless cancelled. You may cancel your
                  subscription at any time through your account settings or by contacting our support team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">7. Intellectual Property Rights</h2>

                <h3 className="text-xl font-medium text-slate-800 mb-3">7.1 Our Rights</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  The Service and all related technology, software, and content are owned by RegSecured and protected by
                  intellectual property laws. We retain all rights not expressly granted to you.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">7.2 License Grant</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to access and
                  use the Service for your internal business purposes during the subscription term.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">7.3 Feedback</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Any feedback, suggestions, or improvements you provide regarding the Service may be used by us without
                  restriction or compensation to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">8. Service Level Agreement</h2>

                <h3 className="text-xl font-medium text-slate-800 mb-3">8.1 Uptime Commitment</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  We strive to maintain 99.9% uptime for our Service, excluding scheduled maintenance and circumstances
                  beyond our reasonable control.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">8.2 Support</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Support levels vary by subscription plan. Enterprise customers receive priority support with dedicated
                  account management and 24/7 availability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">9. Limitation of Liability</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, REGSECURED SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR
                  USE, ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE.
                </p>
                <p className="text-slate-600 font-light leading-relaxed">
                  OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT
                  EXCEED THE AMOUNT PAID BY YOU FOR THE SERVICE IN THE TWELVE MONTHS PRECEDING THE CLAIM.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">10. Indemnification</h2>
                <p className="text-slate-600 font-light leading-relaxed">
                  You agree to indemnify and hold harmless RegSecured from any claims, damages, losses, or expenses
                  arising out of your use of the Service, violation of these Terms, or infringement of any third-party
                  rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">11. Termination</h2>

                <h3 className="text-xl font-medium text-slate-800 mb-3">11.1 Termination by You</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  You may terminate your account at any time by following the cancellation process in your account
                  settings or contacting our support team.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">11.2 Termination by Us</h3>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  We may suspend or terminate your access to the Service immediately if you violate these Terms or for
                  any other reason at our sole discretion.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3">11.3 Effect of Termination</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Upon termination, your right to use the Service will cease immediately. We will provide you with a
                  reasonable opportunity to export your Customer Data, after which it may be deleted from our systems.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">12. Governing Law and Dispute Resolution</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  These Terms are governed by the laws of the State of New York, without regard to conflict of law
                  principles. Any disputes arising out of or relating to these Terms or the Service shall be resolved
                  through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">13. Changes to Terms</h2>
                <p className="text-slate-600 font-light leading-relaxed">
                  We may modify these Terms at any time by posting the updated Terms on our website. Material changes
                  will be communicated to you via email or through the Service. Your continued use of the Service after
                  such changes constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-slate-800 mb-4">14. Contact Information</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-stone-100 rounded-lg p-6">
                  <p className="text-slate-700 font-medium mb-2">RegSecured Inc.</p>
                  <p className="text-slate-600 font-light">Legal Department</p>
                  <p className="text-slate-600 font-light">123 Financial District</p>
                  <p className="text-slate-600 font-light">New York, NY 10004</p>
                  <p className="text-slate-600 font-light">Email: legal@regsecured.com</p>
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
