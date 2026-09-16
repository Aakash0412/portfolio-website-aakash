"use client"

import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
    >
      Sign out
    </button>
  )
}
