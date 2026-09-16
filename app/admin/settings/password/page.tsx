"use client"

import { useState } from "react"
import { updatePasswordAction } from "./actions"
import Link from "next/link"

export default function ChangePasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setStatus(null)
    
    const email = formData.get("email")?.toString()
    const currentPassword = formData.get("currentPassword")?.toString()
    const password = formData.get("password")?.toString()
    const confirmPassword = formData.get("confirmPassword")?.toString()

    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'New passwords do not match.' })
      setLoading(false)
      return
    }

    if (!email || !password || !currentPassword) {
      setStatus({ type: 'error', message: 'All fields are required.' })
      setLoading(false)
      return
    }

    const result = await updatePasswordAction(email, currentPassword, password)
    
    if (result.success) {
      setStatus({ type: 'success', message: 'Password successfully updated!' })
      // Clear the form here if desired
    } else {
      setStatus({ type: 'error', message: result.error || 'Failed to update password.' })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
            <p className="text-zinc-400 mt-1">Update your administrator password.</p>
          </div>
          <Link href="/admin" className="text-sm text-zinc-400 hover:text-white">&larr; Back to Dashboard</Link>
        </header>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <form action={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-300">Admin Email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                defaultValue="admin@aakashayyappan.com"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-white"
                placeholder="admin@aakashayyappan.com"
              />
            </div>
            
            <div className="space-y-2 relative">
              <label htmlFor="currentPassword" className="text-sm font-medium text-zinc-300">Current Password</label>
              <div className="relative flex items-center">
                <input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  required
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-white pr-10"
                  placeholder="Enter current password"
                />
              </div>
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="password" className="text-sm font-medium text-zinc-300">New Password</label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-white pr-10"
                  placeholder="Enter new password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-300">Confirm New Password</label>
              <div className="relative flex items-center">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-white pr-10"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white text-black font-medium rounded-md hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
            
            {status && (
              <p className={`text-sm text-center p-3 rounded-md border ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
