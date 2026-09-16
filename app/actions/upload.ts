"use server"

import { put } from "@vercel/blob"
import { auth } from "@/auth"

export async function uploadFile(formData: FormData) {
  const session = await auth()
  
  if (!session?.user) {
    throw new Error("Unauthorized: You must be logged in to upload files.")
  }

  const file = formData.get("file") as File
  if (!file || !(file instanceof File)) {
    throw new Error("No valid file provided.")
  }

  // Security: File Size Validation (Max 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds the 5MB limit. (Provided: ${(file.size / 1024 / 1024).toFixed(2)}MB)`)
  }

  // Security: MIME Type Validation
  const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf"
  ];
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}. Allowed types are: JPEG, PNG, WEBP, GIF, PDF.`)
  }

  // Ensure the environment variable is set
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Vercel Blob token is missing. Please configure BLOB_READ_WRITE_TOKEN.")
  }

  try {
    const blob = await put(file.name, file, {
      access: "public",
      // Optional: Add cacheControl or content type overrides if needed
    })

    return { url: blob.url }
  } catch (error: unknown) {
    console.error("Upload error:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to upload file: ${error.message}`)
    }
    throw new Error("Failed to upload file: Unknown error occurred.")
  }
}
