"use client"

import { useState, useRef } from "react"
import { uploadFile } from "@/app/actions/upload"
import { UploadCloud, X, Loader2, FileIcon } from "lucide-react"
import Image from "next/image"

interface FileUploadProps {
  value?: string
  onChange: (url: string) => void
  accept?: string
  id?: string
  name?: string
}

export function FileUpload({ value, onChange, accept = "image/*", id, name }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      
      const { url } = await uploadFile(formData)
      onChange(url)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Something went wrong during upload.")
      }
    } finally {
      setIsUploading(false)
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleClear = () => {
    onChange("")
    setError(null)
  }

  const isImage = value?.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)

  return (
    <div className="space-y-4">
      {/* Hidden input for form integration if needed */}
      {name && <input type="hidden" name={name} value={value || ""} />}
      
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800 p-2 group">
          {isImage ? (
            <div className="relative h-40 w-full rounded-md overflow-hidden bg-zinc-900">
              <Image src={value} alt="Uploaded preview" className="object-cover w-full h-full" width={400} height={160} />
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3">
              <FileIcon className="h-8 w-8 text-blue-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{value.split('/').pop()}</p>
                <p className="text-xs text-zinc-400 truncate">{value}</p>
              </div>
            </div>
          )}
          
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-4 right-4 bg-black/60 text-white p-1.5 rounded-full hover:bg-red-500/80 transition-colors backdrop-blur-sm"
            title="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isUploading ? 'border-zinc-700 bg-zinc-900/50 cursor-not-allowed' : 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50'}
            ${error ? 'border-red-500/50 hover:border-red-500' : ''}
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center space-y-2 text-zinc-400">
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
              <p className="text-sm">Uploading file...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 text-zinc-400">
              <UploadCloud className="h-8 w-8" />
              <p className="text-sm font-medium">Click to upload a file</p>
              <p className="text-xs text-zinc-500">Supports {accept.replace(/\*/g, 'any')}</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400 font-medium">{error}</p>
      )}

      <input
        id={id}
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={accept}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  )
}
