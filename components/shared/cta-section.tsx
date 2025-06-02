"use client"

import { ConsistentButton } from "@/components/ui/button-consistent"

interface CTASectionProps {
  title: string
  description: string
  primaryCta: {
    text: string
    onClick?: () => void
  }
  secondaryCta?: {
    text: string
    onClick?: () => void
  }
  background?: "light" | "dark" | "gradient"
}

export function CTASection({ title, description, primaryCta, secondaryCta, background = "gradient" }: CTASectionProps) {
  const backgroundClasses = {
    light: "bg-stone-50",
    dark: "bg-slate-800 text-stone-50",
    gradient: "bg-gradient-to-br from-slate-700 to-slate-800 text-stone-50",
  }

  const textClasses = {
    light: "text-slate-800",
    dark: "text-stone-50",
    gradient: "text-stone-50",
  }

  const descriptionClasses = {
    light: "text-slate-600",
    dark: "text-stone-200",
    gradient: "text-stone-200",
  }

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`${backgroundClasses[background]} rounded-2xl p-12 text-center relative overflow-hidden`}>
          <div className="relative">
            <h2 className={`text-3xl lg:text-4xl font-light ${textClasses[background]} mb-6`}>{title}</h2>
            <p
              className={`text-lg ${descriptionClasses[background]} mb-8 max-w-2xl mx-auto font-light leading-relaxed`}
            >
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsistentButton
                size="lg"
                variant={background === "light" ? "primary" : "secondary"}
                showArrow
                onClick={primaryCta.onClick}
              >
                {primaryCta.text}
              </ConsistentButton>
              {secondaryCta && (
                <ConsistentButton size="lg" variant="outline" onClick={secondaryCta.onClick}>
                  {secondaryCta.text}
                </ConsistentButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
