export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-light text-slate-800 mb-4">404</h1>
        <h2 className="text-2xl font-light text-slate-600 mb-8">Page Not Found</h2>
        <p className="text-slate-600 mb-8 font-light">The page you're looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-slate-700 text-stone-50 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  )
}
