import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SkillFormDialog } from "./components/skill-form-dialog"

const prisma = new PrismaClient()

export default async function AdminSkillsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  const skills = await prisma.skill.findMany({
    include: {
      category: true,
    },
    orderBy: [
      { category: { displayOrder: 'asc' } },
      { displayOrder: 'asc' }
    ]
  })
  
  const categories = await prisma.skillCategory.findMany({
    orderBy: { displayOrder: 'asc' }
  })

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
            <p className="text-zinc-400 mt-1">Manage your technical skills and expertise</p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/admin" className="text-sm text-zinc-400 hover:text-white">&larr; Back to Dashboard</a>
            <SkillFormDialog categories={categories} />
          </div>
        </header>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Skill Name</TableHead>
                <TableHead className="text-zinc-400">Category</TableHead>
                <TableHead className="text-zinc-400">Visible</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700/10">
                      {skill.category.name}
                    </span>
                  </TableCell>
                  <TableCell>{skill.isVisible ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <SkillFormDialog skill={skill} categories={categories} isEditing />
                  </TableCell>
                </TableRow>
              ))}
              {skills.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-zinc-500">
                    No skills found.
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
