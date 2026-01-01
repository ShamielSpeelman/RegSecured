export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-6">
        <div className="text-center lg:text-left animate-pulse">
          <div className="h-9 w-48 bg-slate-200 rounded mx-auto lg:mx-0 mb-4" />
          <div className="h-8 w-64 bg-slate-200 rounded mx-auto lg:mx-0 mb-2" />
          <div className="h-6 w-96 bg-slate-200 rounded mx-auto lg:mx-0" />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="h-96 bg-slate-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}
