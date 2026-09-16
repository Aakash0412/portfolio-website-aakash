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
    <section className="hero" style={{ minHeight: '100svh', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ maxWidth: '500px', width: '100%', padding: '0' }}>
        <header className="section-heading reveal-fade" style={{ marginBottom: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ display: "block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--fg)" }}></span>
            Security
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Change Password</h2>
          <p className="section-sub" style={{ margin: '12px auto 0' }}>Update your administrator credentials.</p>
        </header>

        <div className="reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
          <form className="contact-form" action={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '36px' }}>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Admin Email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                defaultValue="admin@aakashayyappan.com"
                className="form-input"
                placeholder="admin@aakashayyappan.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="currentPassword" className="form-label">Current Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  required
                  className="form-input"
                  placeholder="Enter current password"
                  style={{ paddingRight: '40px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">New Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="form-input"
                  placeholder="Enter new password"
                  style={{ paddingRight: '40px' }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', right: '12px', background: 'none', border: 'none', 
                    color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px'
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  className="form-input"
                  placeholder="Confirm new password"
                  style={{ paddingRight: '40px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary form-submit"
              style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
            
            {status && (
              <p className={`form-status ${status.type === 'error' ? 'is-error' : 'is-success'}`} style={{ marginTop: '16px', textAlign: 'center', minHeight: 'auto', color: status.type === 'success' ? '#10b981' : 'var(--error)' }}>
                {status.message}
              </p>
            )}
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link href="/admin" className="nav-link" style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
