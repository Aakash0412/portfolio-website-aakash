"use server"

import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function saveLeadership(formData: FormData, id?: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const organization = formData.get("organization") as string
  const role = formData.get("role") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const description = formData.get("description") as string
  const isPublished = formData.get("isPublished") === "true"

  if (!organization || !role) throw new Error("Missing required fields")

  const data = {
    organization,
    role,
    startDate: startDate || null,
    endDate: endDate || null,
    description: description || null,
    isPublished,
  }

  if (id) {
    await prisma.leadership.update({
      where: { id },
      data,
    })
  } else {
    await prisma.leadership.create({
      data: {
        ...data,
        displayOrder: await prisma.leadership.count(),
      },
    })
  }

  revalidatePath("/")
  revalidatePath("/admin/leadership")
}

export async function deleteLeadership(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  await prisma.leadership.delete({ where: { id } })
  
  revalidatePath("/")
  revalidatePath("/admin/leadership")
}
