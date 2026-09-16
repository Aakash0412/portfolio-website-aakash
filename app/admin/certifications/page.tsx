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

        <div className="reveal-fade" style={{ "--delay": "100ms", background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' } as React.CSSProperties}>
          <Table>
            <TableHeader style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
              <TableRow style={{ borderBottom: '1px solid var(--border)' }}>
                <TableHead style={{ color: 'var(--text-muted)' }}>Title</TableHead>
                <TableHead style={{ color: 'var(--text-muted)' }}>Issuer</TableHead>
                <TableHead style={{ color: 'var(--text-muted)' }}>Published</TableHead>
                <TableHead style={{ color: 'var(--text-muted)', textAlign: 'right' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications.map((cert) => (
                <TableRow key={cert.id} style={{ borderBottom: '1px solid var(--border)' }} className="hover:bg-white/5 transition-colors">
                  <TableCell style={{ fontWeight: '500' }}>{cert.title}</TableCell>
                  <TableCell>{cert.issuer}</TableCell>
                  <TableCell>{cert.isPublished ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
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
