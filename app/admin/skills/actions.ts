"use server"

import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function saveSkill(formData: FormData, id?: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const categoryId = formData.get("categoryId") as string
  const isVisible = formData.get("isVisible") === "true"

  if (!name || !categoryId) throw new Error("Missing required fields")

  const data = {
    name,
    categoryId,
    isVisible,
  }

  if (id) {
    await prisma.skill.update({
      where: { id },
      data,
    })
  } else {
    await prisma.skill.create({
      data: {
        ...data,
        displayOrder: await prisma.skill.count({ where: { categoryId } }),
      },
    })
  }

  revalidatePath("/")
  revalidatePath("/admin/skills")
}

export async function deleteSkill(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  await prisma.skill.delete({ where: { id } })
  
  revalidatePath("/")
  revalidatePath("/admin/skills")
}
