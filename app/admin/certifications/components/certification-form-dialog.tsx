"use client"

import { useState } from "react"
import { saveCertification, deleteCertification } from "../actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileUpload } from "@/components/ui/file-upload"
import { Certification } from "@prisma/client"

export function CertificationFormDialog({ certification, isEditing }: { certification?: Certification, isEditing?: boolean }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [certificateImageUrl, setCertificateImageUrl] = useState(certification?.certificateImageUrl || "")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await saveCertification(formData, certification?.id)
    setLoading(false)
    setOpen(false)
  }

  const handleDelete = async () => {
    if (!certification?.id) return
    if (!confirm("Are you sure you want to delete this certification?")) return
    setLoading(true)
    await deleteCertification(certification.id)
    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={isEditing ? "text-blue-400 hover:text-blue-300 text-sm font-medium" : "bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200"}>
        {isEditing ? "Edit" : "Add Certification"}
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Certification" : "New Certification"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={certification?.title} required className="bg-zinc-800 border-zinc-700" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuer</Label>
            <Input id="issuer" name="issuer" defaultValue={certification?.issuer} required className="bg-zinc-800 border-zinc-700" />
          </div>
          <div className="space-y-2">
            <Label>Certificate Image / File</Label>
            <FileUpload 
              name="certificateImageUrl" 
              value={certificateImageUrl} 
              onChange={setCertificateImageUrl} 
              accept="image/*,application/pdf" 
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="isPublished" name="isPublished" value="true" defaultChecked={certification?.isPublished} className="rounded border-zinc-700 bg-zinc-800 text-white" />
            <Label htmlFor="isPublished">Publish on website</Label>
          </div>
          
          <div className="flex justify-between pt-4">
            {isEditing ? (
              <button type="button" onClick={handleDelete} disabled={loading} className="text-red-400 text-sm hover:text-red-300">
                Delete
              </button>
            ) : <div></div>}
            <div className="space-x-2">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm border border-zinc-700 rounded-md hover:bg-zinc-800">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-zinc-200">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
