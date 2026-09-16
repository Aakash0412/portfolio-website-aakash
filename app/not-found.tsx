import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-bold tracking-tight text-white">404</h1>
        <h2 className="text-xl font-medium text-zinc-300">Page not found</h2>
        <p className="text-sm text-zinc-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
