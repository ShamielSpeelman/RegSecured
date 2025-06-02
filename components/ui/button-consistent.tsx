import type React from "react"
import { Button as BaseButton } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { forwardRef } from "react"

interface ConsistentButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  showArrow?: boolean
}

export const ConsistentButton = forwardRef<HTMLButtonElement, ConsistentButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", showArrow = false, ...props }, ref) => {
    const baseClasses = "font-medium transition-all duration-200"

    const variantClasses = {
      primary: "bg-stone-200 hover:bg-slate-800 text-slate-800 hover:text-stone-50 shadow-sm transition-colors",
      secondary: "bg-stone-200 hover:bg-slate-800 text-slate-800 hover:text-stone-50 transition-colors",
      outline:
        "bg-stone-200 hover:bg-slate-800 text-slate-800 hover:text-stone-50 border-2 border-slate-300 hover:border-slate-800 transition-colors",
      ghost: "bg-stone-200 hover:bg-slate-800 text-slate-800 hover:text-stone-50 transition-colors",
    }

    const sizeClasses = {
      sm: "h-10 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    }

    return (
      <BaseButton
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
        {showArrow && <ArrowRight className="ml-2 w-4 h-4" />}
      </BaseButton>
    )
  },
)

ConsistentButton.displayName = "ConsistentButton"
