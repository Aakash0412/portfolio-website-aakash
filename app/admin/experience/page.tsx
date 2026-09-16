import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExperienceFormDialog } from "./components/experience-form-dialog"

const prisma = new PrismaClient()

export default async function AdminExperiencePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  const experience = await prisma.experience.findMany({
    orderBy: { displayOrder: 'asc' }
  })

  return (
    <section className="hero" style={{ minHeight: '100svh', padding: '60px 24px' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ maxWidth: '1200px', width: '100%', position: 'relative', zIndex: 1 }}>
        <header className="reveal-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '4px' }}>Experience</h1>
            <p className="text-muted" style={{ color: 'var(--text-muted)' }}>Manage your work history and internships</p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/admin" className="nav-link" style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>&larr; Back to Dashboard</a>
            <ExperienceFormDialog />
          </div>
        </header>

        <div className="reveal-fade" style={{ "--delay": "100ms", background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' } as React.CSSProperties}>
          <Table>
            <TableHeader style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
              <TableRow style={{ borderBottom: '1px solid var(--border)' }}>
                <TableHead style={{ color: 'var(--text-muted)' }}>Role</TableHead>
                <TableHead style={{ color: 'var(--text-muted)' }}>Organization</TableHead>
                <TableHead style={{ color: 'var(--text-muted)' }}>Dates</TableHead>
                <TableHead style={{ color: 'var(--text-muted)' }}>Published</TableHead>
                <TableHead style={{ color: 'var(--text-muted)', textAlign: 'right' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experience.map((exp) => (
                <TableRow key={exp.id} style={{ borderBottom: '1px solid var(--border)' }} className="hover:bg-white/5 transition-colors">
                  <TableCell style={{ fontWeight: '500' }}>{exp.role}</TableCell>
                  <TableCell>{exp.organization}</TableCell>
                  <TableCell>{exp.startDate} - {exp.endDate || (exp.isCurrent ? 'Present' : '')}</TableCell>
                  <TableCell>{exp.isPublished ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <ExperienceFormDialog experience={exp} isEditing />
                  </TableCell>
                </TableRow>
              ))}
              {experience.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                    No experience records found.
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
