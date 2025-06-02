"use client"

import { Button } from "@/components/ui/button"
import { Shield, Menu, X, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ProjectStructureSheet } from "@/components/shared/project-structure-sheet"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isStructureOpen, setIsStructureOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-50/90 backdrop-blur-xl border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-stone-50" />
            </div>
            <span className="text-xl font-medium text-slate-800">RegSecured</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-10">
            <Link href="/platform" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
              Platform
            </Link>
            <Link href="/solutions" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
              Solutions
            </Link>
            <Link href="/compliance" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
              Compliance
            </Link>
            <Link href="/pricing" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
              Pricing
            </Link>
            <Link href="/resources" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
              Resources
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              className="text-slate-600 hover:text-slate-800 hover:bg-stone-100"
              onClick={() => (window.location.href = "/auth")}
            >
              Sign In
            </Button>
            <div className="flex items-center space-x-2">
              <Button className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm">Request Demo</Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-600 hover:text-slate-800 hover:bg-stone-100"
                onClick={() => setIsStructureOpen(true)}
              >
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200/50">
            <div className="flex flex-col space-y-4">
              <Link href="/platform" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
                Platform
              </Link>
              <Link href="/solutions" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
                Solutions
              </Link>
              <Link href="/compliance" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
                Compliance
              </Link>
              <Link href="/pricing" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
                Pricing
              </Link>
              <Link href="/resources" className="text-slate-600 hover:text-slate-800 font-normal transition-colors">
                Resources
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="ghost"
                  className="text-slate-600 hover:text-slate-800 hover:bg-stone-100 justify-start"
                  onClick={() => (window.location.href = "/auth")}
                >
                  Sign In
                </Button>
                <Button className="bg-slate-700 hover:bg-slate-800 text-stone-50 shadow-sm justify-start">
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ProjectStructureSheet open={isStructureOpen} onOpenChange={setIsStructureOpen} />
    </nav>
  )
}
