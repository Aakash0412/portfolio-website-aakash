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
    <section className="hero" style={{ minHeight: '100svh', padding: '60px 24px' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 1 }}>
        <header className="reveal-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '4px' }}>Profile Details</h1>
            <p className="text-muted" style={{ color: 'var(--text-muted)' }}>Manage your bio, headline, and resume link.</p>
          </div>
          <a href="/admin" className="nav-link" style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>&larr; Back to Dashboard</a>
        </header>

        <div className="reveal-fade" style={{ "--delay": "100ms", background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '36px' } as React.CSSProperties}>
          <ProfileForm profile={profile} />
        </div>
      </div>
    </section>
  )
}
