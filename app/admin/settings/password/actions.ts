"use server"

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function updatePasswordAction(email: string, currentPassword: string, newPassword: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return { success: false, error: 'User not found.' }
    }

    if (user.role !== 'ADMIN' || !user.isActive) {
      return { success: false, error: 'Not an active ADMIN account.' }
    }

    // Verify current password first for security
    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isPasswordValid) {
      return { success: false, error: 'Current password is incorrect.' }
    }

    // Hash and save new password
    const passwordHash = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { email },
      data: { passwordHash }
    })

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    return { success: false, error: 'Database update failed.' }
  }
}
