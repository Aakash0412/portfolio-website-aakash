"use server"

import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { validateSafeUrl } from "@/lib/security"

const prisma = new PrismaClient()

export async function updateProfile(formData: FormData, id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const headline = formData.get("headline") as string
  const shortBio = formData.get("shortBio") as string
  const bio = formData.get("bio") as string
  const email = formData.get("email") as string
  const location = formData.get("location") as string
  const resumeUrl = validateSafeUrl(formData.get("resumeUrl") as string)
  const profileImageUrl = validateSafeUrl(formData.get("profileImageUrl") as string)

  if (!name || !email) throw new Error("Missing required fields")

  await prisma.profile.update({
    where: { id },
    data: {
      name,
      headline,
      shortBio,
      bio,
      email,
      location,
      resumeUrl,
      profileImageUrl,
    },
  })

  revalidatePath("/")
  revalidatePath("/admin/profile")
}
