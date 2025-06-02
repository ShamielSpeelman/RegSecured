import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { ConsistentButton } from "@/components/ui/button-consistent"

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  bgColor?: string
  iconColor?: string
  href?: string
  stats?: { [key: string]: string }
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  features,
  bgColor = "bg-blue-50/50",
  iconColor = "text-blue-600",
  href,
  stats,
}: FeatureCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-stone-200/50 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <div
          className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>

        <h3 className="text-xl font-medium text-slate-800 mb-4">{title}</h3>
        <p className="text-slate-600 mb-6 leading-relaxed font-light">{description}</p>

        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <span className="text-sm text-slate-600 leading-relaxed font-light">{feature}</span>
            </div>
          ))}
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-stone-50/50 rounded-xl">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-medium text-slate-800">{value}</div>
                <div className="text-xs text-slate-500 capitalize">{key}</div>
              </div>
            ))}
          </div>
        )}

        {href && (
          <ConsistentButton variant="ghost" className="w-full justify-between">
            Learn More
            <ArrowRight className="w-4 h-4" />
          </ConsistentButton>
        )}
      </CardContent>
    </Card>
  )
}
