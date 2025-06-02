import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl lg:text-8xl font-light text-slate-800 mb-4">404</h1>
            <h2 className="text-2xl lg:text-3xl font-light text-slate-600 mb-6">Page Not Found</h2>
            <p className="text-lg text-slate-600 mb-8 font-light max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm h-12 px-6">
                <Home className="mr-2 w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" className="h-12 px-6 border-slate-300">
                <Search className="mr-2 w-4 h-4" />
                Browse Resources
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <h3 className="font-medium text-slate-800 mb-2">Platform</h3>
              <div className="space-y-1">
                <Link href="/platform" className="block text-sm text-slate-600 hover:text-slate-800 font-light">
                  Overview
                </Link>
                <Link
                  href="/platform/features"
                  className="block text-sm text-slate-600 hover:text-slate-800 font-light"
                >
                  Features
                </Link>
                <Link
                  href="/platform/security"
                  className="block text-sm text-slate-600 hover:text-slate-800 font-light"
                >
                  Security
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-slate-800 mb-2">Solutions</h3>
              <div className="space-y-1">
                <Link href="/solutions" className="block text-sm text-slate-600 hover:text-slate-800 font-light">
                  Overview
                </Link>
                <Link
                  href="/solutions/banking"
                  className="block text-sm text-slate-600 hover:text-slate-800 font-light"
                >
                  Banking
                </Link>
                <Link
                  href="/solutions/fintech"
                  className="block text-sm text-slate-600 hover:text-slate-800 font-light"
                >
                  Fintech
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-slate-800 mb-2">Resources</h3>
              <div className="space-y-1">
                <Link href="/resources" className="block text-sm text-slate-600 hover:text-slate-800 font-light">
                  All Resources
                </Link>
                <Link
                  href="/resources/documentation"
                  className="block text-sm text-slate-600 hover:text-slate-800 font-light"
                >
                  Documentation
                </Link>
                <Link
                  href="/resources/support"
                  className="block text-sm text-slate-600 hover:text-slate-800 font-light"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
