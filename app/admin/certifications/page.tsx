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
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
            <p className="text-zinc-400 mt-1">Manage your academic and professional certificates</p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/admin" className="text-sm text-zinc-400 hover:text-white">&larr; Back to Dashboard</a>
            <CertificationFormDialog />
          </div>
        </header>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Title</TableHead>
                <TableHead className="text-zinc-400">Issuer</TableHead>
                <TableHead className="text-zinc-400">Published</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications.map((cert) => (
                <TableRow key={cert.id} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="font-medium">{cert.title}</TableCell>
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
    </div>
  )
}
