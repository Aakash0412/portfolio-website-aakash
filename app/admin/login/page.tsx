"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("Invalid credentials. Please check your email and password.")
      setLoading(false)
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <section className="hero" style={{ minHeight: '100svh', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ maxWidth: '420px', width: '100%', padding: '0' }}>
        <div className="section-heading reveal-fade" style={{ marginBottom: '32px', textAlign: 'center' }}>
          <p className="eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ display: "block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--fg)" }}></span>
            Aakash A.
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Admin Access</h2>
          <p className="section-sub" style={{ margin: '12px auto 0' }}>Sign in to manage your portfolio.</p>
        </div>

        <div className="reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
          <form className="contact-form" onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '36px' }}>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email / Username</label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="username"
                required
                className="form-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary form-submit"
              style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
            
            {error && (
              <p className="form-status is-error" aria-live="polite" style={{ marginTop: '8px', textAlign: 'center', minHeight: 'auto' }}>
                {error}
              </p>
            )}
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link href="/" className="nav-link" style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              &larr; Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
