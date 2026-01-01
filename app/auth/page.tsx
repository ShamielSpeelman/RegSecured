import { Suspense } from "react"
import AuthPageContent from "./auth-page-content"

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthPageSkeleton />}>
      <AuthPageContent />
    </Suspense>
  )
}

function AuthPageSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-6">
        <div className="text-center lg:text-left animate-pulse">
          <div className="h-9 w-48 bg-slate-200 rounded mx-auto lg:mx-0 mb-4" />
          <div className="h-8 w-64 bg-slate-200 rounded mx-auto lg:mx-0 mb-2" />
          <div className="h-6 w-96 bg-slate-200 rounded mx-auto lg:mx-0" />
        </div>
      </div>
    </div>
  )
}
