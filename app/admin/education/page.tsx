import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EducationFormDialog } from "./components/education-form-dialog"

const prisma = new PrismaClient()

export default async function AdminEducationPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  const education = await prisma.education.findMany({
    orderBy: { displayOrder: 'asc' }
  })

  return (
    <section className="hero" style={{ minHeight: '100svh', padding: '60px 24px' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ maxWidth: '1200px', width: '100%', position: 'relative', zIndex: 1 }}>
        <header className="reveal-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '4px' }}>Education</h1>
            <p className="text-muted" style={{ color: 'var(--text-muted)' }}>Manage your academic background</p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/admin" className="nav-link" style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>&larr; Back to Dashboard</a>
            <EducationFormDialog />
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
                <TableHead style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', height: '56px', paddingLeft: '24px' }}>Institution</TableHead>
                <TableHead style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', height: '56px' }}>Degree</TableHead>
                <TableHead style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', height: '56px' }}>Dates</TableHead>
                <TableHead style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', height: '56px' }}>Visibility</TableHead>
                <TableHead style={{ color: 'var(--text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', height: '56px', paddingRight: '24px', textAlign: 'right' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {education.map((item) => (
                <TableRow key={item.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'all 0.3s ease' }} className="hover:bg-white/[0.03]">
                  <TableCell style={{ fontWeight: '500', fontSize: '15px', color: 'var(--fg)', padding: '20px 24px' }}>{item.institution}</TableCell>
                  <TableCell style={{ padding: '20px 16px' }}>{item.degree} {item.field ? `in ${item.field}` : ''}</TableCell>
                  <TableCell style={{ padding: '20px 16px', color: 'var(--text-muted)' }}>{item.startDate} - {item.endDate}</TableCell>
                  <TableCell style={{ padding: '20px 16px' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '500',
                      background: item.isPublished ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 71, 87, 0.1)',
                      color: item.isPublished ? '#2ed573' : '#ff4757',
                      border: `1px solid ${item.isPublished ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255, 71, 87, 0.2)'}`
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.isPublished ? '#2ed573' : '#ff4757', boxShadow: `0 0 8px ${item.isPublished ? '#2ed573' : '#ff4757'}` }}></span>
                      {item.isPublished ? 'Public' : 'Hidden'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right" style={{ padding: '20px 24px' }}>
                    <EducationFormDialog education={item} isEditing />
                  </TableCell>
                </TableRow>
              ))}
              {education.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                    No education records found.
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
