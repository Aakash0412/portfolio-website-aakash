import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AchievementFormDialog } from "./components/achievement-form-dialog"

const prisma = new PrismaClient()

export default async function AdminAchievementsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  const achievements = await prisma.achievement.findMany({
    orderBy: { displayOrder: 'asc' }
  })

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
            <p className="text-zinc-400 mt-1">Manage your awards, hackathons, and accomplishments</p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/admin" className="text-sm text-zinc-400 hover:text-white">&larr; Back to Dashboard</a>
            <AchievementFormDialog />
          </div>
        </header>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Title</TableHead>
                <TableHead className="text-zinc-400">Date</TableHead>
                <TableHead className="text-zinc-400">Published</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((item) => (
                <TableRow key={item.id} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.isPublished ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <AchievementFormDialog achievement={item} isEditing />
                  </TableCell>
                </TableRow>
              ))}
              {achievements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-zinc-500">
                    No achievements found.
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
