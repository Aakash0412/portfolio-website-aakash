"use server"

import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function saveEducation(formData: FormData, id?: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const institution = formData.get("institution") as string
  const degree = formData.get("degree") as string
  const field = formData.get("field") as string
  const location = formData.get("location") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const grade = formData.get("grade") as string
  const description = formData.get("description") as string
  const isPublished = formData.get("isPublished") === "true"

  if (!institution || !degree) throw new Error("Missing required fields")

  const data = {
    institution,
    degree,
    field: field || null,
    location: location || null,
    startDate: startDate || null,
    endDate: endDate || null,
    grade: grade || null,
    description: description || null,
    isPublished,
  }

  if (id) {
    await prisma.education.update({
      where: { id },
      data,
    })
  } else {
    await prisma.education.create({
      data: {
        ...data,
        displayOrder: await prisma.education.count(),
      },
    })
  }

  revalidatePath("/")
  revalidatePath("/admin/education")
}

export async function deleteEducation(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  await prisma.education.delete({ where: { id } })
  
  revalidatePath("/")
  revalidatePath("/admin/education")
}
