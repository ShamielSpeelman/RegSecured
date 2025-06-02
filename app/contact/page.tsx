import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-stone-100 text-slate-700 px-4 py-2 border-0">Get in Touch</Badge>
          <h1 className="text-4xl lg:text-5xl font-light mb-8 text-slate-800">
            Contact Our
            <br />
            <span className="font-normal text-slate-600">Compliance Experts</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Ready to transform your compliance operations? Our team of experts is here to help you get started with
            RegSecured.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-medium text-slate-800 mb-6">Send us a message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <Input placeholder="John" className="border-stone-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <Input placeholder="Doe" className="border-stone-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <Input type="email" placeholder="john@company.com" className="border-stone-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                    <Input placeholder="Your Company" className="border-stone-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <Textarea
                      placeholder="Tell us about your compliance needs..."
                      className="border-stone-300 min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-slate-700 hover:bg-slate-800 text-stone-50">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-medium text-slate-800 mb-6">Get in touch</h2>
                <p className="text-slate-600 font-light mb-8">
                  Our team is available to discuss your compliance requirements and show you how RegSecured can help
                  your organization.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Office",
                    details: ["123 Financial District", "New York, NY 10004", "United States"],
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM EST"],
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    details: ["sales@regsecured.com", "support@regsecured.com"],
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    details: ["Monday - Friday: 9AM - 6PM EST", "Saturday - Sunday: Closed"],
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">{contact.title}</h3>
                      {contact.details.map((detail, i) => (
                        <p key={i} className="text-sm text-slate-600 font-light">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Card className="border-stone-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-medium text-slate-800 mb-3">Schedule a Demo</h3>
                  <p className="text-sm text-slate-600 font-light mb-4">
                    See RegSecured in action with a personalized demo tailored to your industry and use case.
                  </p>
                  <Button className="w-full bg-slate-700 hover:bg-slate-800 text-stone-50">Schedule Demo</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
