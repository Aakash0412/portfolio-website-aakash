import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { ProfileForm } from "./components/profile-form"

const prisma = new PrismaClient()

export default async function AdminProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  // Find the first profile (since this is a personal portfolio)
  let profile = await prisma.profile.findFirst()

  if (!profile) {
    // Should not happen since we seeded, but just in case
    profile = await prisma.profile.create({
      data: {
        name: "Admin User",
        email: session.user.email || "admin@example.com",
        headline: "Software Engineer",
        bio: "Software developer",
      }
    })
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile Details</h1>
            <p className="text-zinc-400 mt-1">Manage your bio, headline, and resume link.</p>
          </div>
          <a href="/admin" className="text-sm text-zinc-400 hover:text-white">&larr; Back to Dashboard</a>
        </header>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <ProfileForm profile={profile} />
        </div>
      </div>
    </div>
  )
}
