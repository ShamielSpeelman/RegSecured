"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { ConsistentButton } from "@/components/ui/button-consistent"

interface HeroSectionProps {
  badge?: string
  title: string
  subtitle?: string
  description: string
  primaryCta: {
    text: string
    href?: string
    onClick?: () => void
  }
  secondaryCta?: {
    text: string
    href?: string
    onClick?: () => void
  }
  children?: React.ReactNode
}

export function HeroSection({
  badge,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  children,
}: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {badge && <Badge className="mb-6 bg-stone-100 text-slate-700 px-4 py-2 border-0">{badge}</Badge>}
        <h1 className="text-4xl lg:text-5xl font-light mb-8 text-slate-800">
          {title}
          {subtitle && (
            <>
              <br />
              <span className="font-normal text-slate-600">{subtitle}</span>
            </>
          )}
        </h1>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">{description}</p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <ConsistentButton size="lg" showArrow onClick={primaryCta.onClick}>
            {primaryCta.text}
          </ConsistentButton>
          {secondaryCta && (
            <ConsistentButton variant="outline" size="lg" onClick={secondaryCta.onClick}>
              {secondaryCta.text}
            </ConsistentButton>
          )}
        </div>

        {children}
      </div>
    </section>
  )
}
