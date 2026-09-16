"use server"

import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function saveExperience(formData: FormData, id?: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const organization = formData.get("organization") as string
  const role = formData.get("role") as string
  const employmentType = formData.get("employmentType") as string
  const location = formData.get("location") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const description = formData.get("description") as string
  const isCurrent = formData.get("isCurrent") === "true"
  const isPublished = formData.get("isPublished") === "true"

  if (!organization || !role) throw new Error("Missing required fields")

  const data = {
    organization,
    role,
    employmentType: employmentType || null,
    location: location || null,
    startDate: startDate || null,
    endDate: endDate || null,
    description: description || null,
    isCurrent,
    isPublished,
  }

  if (id) {
    await prisma.experience.update({
      where: { id },
      data,
    })
  } else {
    await prisma.experience.create({
      data: {
        ...data,
        displayOrder: await prisma.experience.count(),
      },
    })
  }

  revalidatePath("/")
  revalidatePath("/admin/experience")
}

export async function deleteExperience(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  await prisma.experience.delete({ where: { id } })
  
  revalidatePath("/")
  revalidatePath("/admin/experience")
}
