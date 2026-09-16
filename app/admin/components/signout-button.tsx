"use client"

import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="btn btn-primary"
      style={{ padding: '8px 16px', fontSize: '14px', background: 'var(--surface)', color: 'var(--fg)', border: '1px solid var(--border)' }}
    >
      Sign out
    </button>
  )
}
