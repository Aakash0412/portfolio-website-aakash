'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <div className="space-y-4 max-w-md">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Something went wrong</h2>
        <p className="text-sm text-zinc-400">
          An unexpected error occurred while loading this page. Our team has been notified.
        </p>
        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-zinc-700 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
