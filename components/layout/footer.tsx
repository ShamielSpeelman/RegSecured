import { Shield } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-800 text-stone-300 py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-stone-50" />
              </div>
              <span className="text-lg font-medium text-stone-50">RegSecured</span>
            </div>
            <p className="text-sm text-stone-400 font-light">Enterprise AML KYC compliance platform.</p>
          </div>

          <div>
            <h3 className="font-medium text-stone-50 mb-2 text-sm">Platform</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/platform/features"
                  className="text-stone-400 hover:text-stone-200 transition-colors font-light"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/platform/integrations"
                  className="text-stone-400 hover:text-stone-200 transition-colors font-light"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="/platform/security"
                  className="text-stone-400 hover:text-stone-200 transition-colors font-light"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-stone-50 mb-2 text-sm">Solutions</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/solutions/banking"
                  className="text-stone-400 hover:text-stone-200 transition-colors font-light"
                >
                  Banking
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/fintech"
                  className="text-stone-400 hover:text-stone-200 transition-colors font-light"
                >
                  Fintech
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/crypto"
                  className="text-stone-400 hover:text-stone-200 transition-colors font-light"
                >
                  Crypto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-stone-50 mb-2 text-sm">Support</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/resources/documentation"
                  className="text-stone-400 hover:text-stone-200 transition-colors font-light"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/support"
                  className="text-stone-400 hover:text-stone-200 transition-colors font-light"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-400 hover:text-stone-200 transition-colors font-light">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-stone-400 font-light">© 2024 RegSecured. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/legal/privacy" className="text-stone-400 hover:text-stone-200 transition-colors font-light">
              Privacy
            </Link>
            <Link href="/legal/terms" className="text-stone-400 hover:text-stone-200 transition-colors font-light">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
