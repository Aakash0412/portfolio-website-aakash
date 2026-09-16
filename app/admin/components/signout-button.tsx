"use client"

import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="btn transition-colors"
      style={{ padding: '8px 16px', fontSize: '14px', border: '1px solid var(--border)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.color = 'var(--bg)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--fg)'; }}
    >
      Sign out
    </button>
  )
}
