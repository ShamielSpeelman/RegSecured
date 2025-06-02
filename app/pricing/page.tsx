import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowRight, Star, Users, Building2, Globe } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-stone-100 text-slate-700 px-4 py-2 border-0">Transparent Pricing</Badge>
          <h1 className="text-4xl lg:text-5xl font-light mb-8 text-slate-800">
            Simple, Predictable
            <br />
            <span className="font-normal text-slate-600">Pricing</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Choose the plan that fits your organization's size and compliance needs. All plans include our core platform
            features with transparent pricing and no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Starter Plan */}
            <Card className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-medium text-slate-800">Starter</CardTitle>
                <div className="text-3xl font-light text-slate-800 mt-4">
                  Free
                  <span className="text-base text-slate-500 font-light">/month</span>
                </div>
                <p className="text-sm text-slate-600 font-light">Perfect for small teams getting started</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Up to 50 client onboardings/month",
                    "Basic KYC workflows",
                    "Standard screening lists",
                    "Email support",
                    "2 user accounts",
                    "Basic reporting",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-slate-700 hover:bg-slate-800 text-stone-50 mt-6">Start Free Trial</Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-stone-200/50 bg-white/80 backdrop-blur-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-slate-700 text-stone-50 px-3 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-purple-50/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-medium text-slate-800">Professional</CardTitle>
                <div className="text-3xl font-light text-slate-800 mt-4">
                  $2,500
                  <span className="text-base text-slate-500 font-light">/month</span>
                </div>
                <p className="text-sm text-slate-600 font-light">For growing financial institutions</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Up to 1,000 client onboardings/month",
                    "Advanced KYC workflows",
                    "Premium screening data",
                    "Priority support",
                    "10 user accounts",
                    "Advanced reporting & analytics",
                    "API access",
                    "Custom integrations",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-slate-700 hover:bg-slate-800 text-stone-50 mt-6">
                  Start Professional Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-emerald-50/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-medium text-slate-800">Enterprise</CardTitle>
                <div className="text-3xl font-light text-slate-800 mt-4">
                  $8,500
                  <span className="text-base text-slate-500 font-light">/month</span>
                </div>
                <p className="text-sm text-slate-600 font-light">For large organizations</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Up to 10,000 client onboardings/month",
                    "All platform features",
                    "Premium data providers",
                    "24/7 dedicated support",
                    "Unlimited user accounts",
                    "Custom reporting",
                    "Full API access",
                    "SSO integration",
                    "Dedicated account manager",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-slate-700 hover:bg-slate-800 text-stone-50 mt-6">Contact Sales</Button>
              </CardContent>
            </Card>

            {/* Custom Plan */}
            <Card className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-orange-50/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl font-medium text-slate-800">Custom</CardTitle>
                <div className="text-3xl font-light text-slate-800 mt-4">
                  Custom
                  <span className="text-base text-slate-500 font-light">pricing</span>
                </div>
                <p className="text-sm text-slate-600 font-light">Tailored for your specific needs</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Unlimited client onboardings",
                    "Custom feature development",
                    "On-premise deployment",
                    "White-label solutions",
                    "Custom SLAs",
                    "Regulatory consulting",
                    "Training & certification",
                    "Implementation support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-slate-700 hover:bg-slate-800 text-stone-50 mt-6">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Calculate Your ROI</h2>
            <p className="text-xl text-slate-600 font-light">
              See how much RegSecured can save your organization in compliance costs and operational efficiency.
            </p>
          </div>

          <Card className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-slate-800 mb-6">Typical Savings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-light">Compliance Staff Reduction</span>
                      <span className="text-slate-800 font-medium">60-80%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-light">Processing Time Reduction</span>
                      <span className="text-slate-800 font-medium">75-85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-light">Error Rate Reduction</span>
                      <span className="text-slate-800 font-medium">90-95%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-light">Customer Satisfaction</span>
                      <span className="text-slate-800 font-medium">+40%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-slate-800 mb-6">Annual Savings Example</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-light">Staff Cost Savings</span>
                      <span className="text-slate-800 font-medium">$480,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-light">Operational Efficiency</span>
                      <span className="text-slate-800 font-medium">$120,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-light">Risk Reduction</span>
                      <span className="text-slate-800 font-medium">$200,000</span>
                    </div>
                    <div className="border-t border-stone-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-800 font-medium">Total Annual Savings</span>
                        <span className="text-slate-800 font-semibold text-lg">$800,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button size="lg" className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm">
                  Get Custom ROI Analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "What's included in the free trial?",
                answer:
                  "The 14-day free trial includes full access to all Professional plan features, allowing you to test the complete platform with your actual data and workflows.",
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer:
                  "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.",
              },
              {
                question: "Are there any setup fees?",
                answer:
                  "No, there are no setup fees for any of our plans. We believe in transparent pricing with no hidden costs.",
              },
              {
                question: "What kind of support is included?",
                answer:
                  "All paid plans include comprehensive support. Professional plans get priority email support, while Enterprise plans include 24/7 phone support and a dedicated account manager.",
              },
              {
                question: "Can I integrate with my existing systems?",
                answer:
                  "Yes, RegSecured offers extensive integration capabilities through our API and pre-built connectors for major banking and compliance systems.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-slate-800 mb-3">{faq.question}</h3>
                  <p className="text-slate-600 font-light">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-slate-800 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-600 mb-8 font-light">
            Start your free trial today and see how RegSecured can transform your compliance operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm h-14 px-8 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 border-slate-300">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
