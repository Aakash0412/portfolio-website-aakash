"use server"

import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { validateSafeUrl } from "@/lib/security"

const prisma = new PrismaClient()

export async function saveAchievement(formData: FormData, id?: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const date = formData.get("date") as string
  const url = validateSafeUrl(formData.get("url") as string)
  const isPublished = formData.get("isPublished") === "true"

  if (!title) throw new Error("Missing required fields")

  const data = {
    title,
    description: description || null,
    date: date || null,
    url: url || null,
    isPublished,
  }

  if (id) {
    await prisma.achievement.update({
      where: { id },
      data,
    })
  } else {
    await prisma.achievement.create({
      data: {
        ...data,
        displayOrder: await prisma.achievement.count(),
      },
    })
  }

  revalidatePath("/")
  revalidatePath("/admin/achievements")
}

export async function deleteAchievement(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  await prisma.achievement.delete({ where: { id } })
  
  revalidatePath("/")
  revalidatePath("/admin/achievements")
}
