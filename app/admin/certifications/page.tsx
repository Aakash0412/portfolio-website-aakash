import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CertificationFormDialog } from "./components/certification-form-dialog"

const prisma = new PrismaClient()

export default async function AdminCertificationsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  const certifications = await prisma.certification.findMany({
    orderBy: { displayOrder: 'asc' }
  })

  return (
    <section className="hero" style={{ minHeight: '100svh', padding: '60px 24px' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ maxWidth: '1200px', width: '100%', position: 'relative', zIndex: 1 }}>
        <header className="reveal-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '4px' }}>Certifications</h1>
            <p className="text-muted" style={{ color: 'var(--text-muted)' }}>Manage your academic and professional certificates</p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/admin" className="nav-link" style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>&larr; Back to Dashboard</a>
            <CertificationFormDialog />
          </div>
        </header>

        <div className="reveal-fade" style={{ 
          "--delay": "100ms", 
          background: 'rgba(20, 20, 20, 0.4)', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)', 
          borderRadius: '24px', 
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          overflow: 'hidden' 
        } as React.CSSProperties}>
          <Table>
            <TableHeader style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
              <TableRow style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <TableHead style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', height: '56px', paddingLeft: '24px' }}>Title</TableHead>
                <TableHead style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', height: '56px' }}>Issuer</TableHead>
                <TableHead style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', height: '56px' }}>Visibility</TableHead>
                <TableHead style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', height: '56px', paddingRight: '24px', textAlign: 'right' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications.map((cert) => (
                <TableRow key={cert.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'all 0.3s ease' }} className="hover:bg-white/[0.03]">
                  <TableCell style={{ fontWeight: '500', fontSize: '15px', color: 'var(--fg)', padding: '20px 24px' }}>{cert.title}</TableCell>
                  <TableCell style={{ padding: '20px 16px', color: 'var(--text-muted)' }}>{cert.issuer}</TableCell>
                  <TableCell style={{ padding: '20px 16px' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '500',
                      background: cert.isPublished ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 71, 87, 0.1)',
                      color: cert.isPublished ? '#2ed573' : '#ff4757',
                      border: `1px solid ${cert.isPublished ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255, 71, 87, 0.2)'}`
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cert.isPublished ? '#2ed573' : '#ff4757', boxShadow: `0 0 8px ${cert.isPublished ? '#2ed573' : '#ff4757'}` }}></span>
                      {cert.isPublished ? 'Public' : 'Hidden'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right" style={{ padding: '20px 24px' }}>
                    <CertificationFormDialog certification={cert} isEditing />
                  </TableCell>
                </TableRow>
              ))}
              {certifications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-zinc-500">
                    No certifications found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
