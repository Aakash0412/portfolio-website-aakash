"use server"

import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { validateSafeUrl } from "@/lib/security"

const prisma = new PrismaClient()

export async function saveProject(formData: FormData, id?: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const isPublished = formData.get("isPublished") === "true"
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

  if (!title || !description) throw new Error("Missing fields")

  const data = {
    title,
    slug,
    shortDescription: description,
    description,
    isPublished,
    status: isPublished ? "published" : "draft",
    githubUrl: validateSafeUrl(formData.get("githubUrl") as string),
    liveUrl: validateSafeUrl(formData.get("liveUrl") as string),
    thumbnailUrl: validateSafeUrl(formData.get("thumbnailUrl") as string),
  }

  if (id) {
    await prisma.project.update({
      where: { id },
      data,
    })
  } else {
    await prisma.project.create({
      data: {
        ...data,
        displayOrder: await prisma.project.count(),
      },
    })
  }

  revalidatePath("/")
  revalidatePath("/admin/projects")
}

export async function deleteProject(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  await prisma.project.delete({ where: { id } })
  
  revalidatePath("/")
  revalidatePath("/admin/projects")
}
