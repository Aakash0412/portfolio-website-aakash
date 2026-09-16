import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { SignOutButton } from "./components/signout-button"

export default async function AdminDashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  return (
    <section className="hero" style={{ minHeight: '100svh', padding: '60px 24px' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 1 }}>
        <header className="reveal-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '4px' }}>Admin Dashboard</h1>
            <p className="text-muted" style={{ color: 'var(--text-muted)' }}>Welcome back, <span style={{ color: 'var(--fg)' }}>{session.user.name}</span></p>
          </div>
          <SignOutButton />
        </header>

        <div className="grid reveal-fade" style={{ "--delay": "100ms", display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' } as React.CSSProperties}>
          <div className="project-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Projects</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Manage your portfolio projects, status, and details.</p>
            <a href="/admin/projects" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--fg)' }}>Manage Projects &rarr;</a>
          </div>
          
          <div className="project-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Profile</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Update your bio, headline, and resume.</p>
            <a href="/admin/profile" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--fg)' }}>Edit Profile &rarr;</a>
          </div>

          <div className="project-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Skills</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Organize your technical skills and categories.</p>
            <a href="/admin/skills" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--fg)' }}>Manage Skills &rarr;</a>
          </div>

          <div className="project-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Certifications</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Manage your academic and professional certificates.</p>
            <a href="/admin/certifications" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--fg)' }}>Manage Certifications &rarr;</a>
          </div>

          <div className="project-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Experience</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Manage your work history and internships.</p>
            <a href="/admin/experience" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--fg)' }}>Manage Experience &rarr;</a>
          </div>

          <div className="project-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Education</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Manage your academic background.</p>
            <a href="/admin/education" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--fg)' }}>Manage Education &rarr;</a>
          </div>

          <div className="project-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Leadership</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Manage your leadership roles and extracurriculars.</p>
            <a href="/admin/leadership" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--fg)' }}>Manage Leadership &rarr;</a>
          </div>

          <div className="project-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Achievements</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Manage your awards and accomplishments.</p>
            <a href="/admin/achievements" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--fg)' }}>Manage Achievements &rarr;</a>
          </div>

          <div className="project-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Security</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Update your admin password and security settings.</p>
            <a href="/admin/settings/password" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: 'var(--fg)' }}>Change Password &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  )
}
