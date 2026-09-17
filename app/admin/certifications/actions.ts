"use server"

import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { validateSafeUrl } from "@/lib/security"

const prisma = new PrismaClient()

export async function saveCertification(formData: FormData, id?: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const issuer = formData.get("issuer") as string
  const credentialUrl = validateSafeUrl(formData.get("credentialUrl") as string)
  const certificateImageUrl = validateSafeUrl(formData.get("certificateImageUrl") as string)
  const thumbnailUrl = validateSafeUrl(formData.get("thumbnailUrl") as string)
  const isPublished = formData.get("isPublished") === "true"

  if (!title || !issuer) throw new Error("Missing required fields")

  const data = {
    title,
    issuer,
    credentialUrl: credentialUrl || null,
    certificateImageUrl: certificateImageUrl || null,
    thumbnailUrl: thumbnailUrl || null,
    isPublished,
  }

  if (id) {
    await prisma.certification.update({
      where: { id },
      data,
    })
  } else {
    await prisma.certification.create({
      data: {
        ...data,
        displayOrder: await prisma.certification.count(),
      },
    })
  }

  revalidatePath("/")
  revalidatePath("/admin/certifications")
}

export async function deleteCertification(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  await prisma.certification.delete({ where: { id } })
  
  revalidatePath("/")
  revalidatePath("/admin/certifications")
}
