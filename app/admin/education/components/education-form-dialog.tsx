"use client"

import { useState } from "react"
import { saveEducation, deleteEducation } from "../actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Education } from "@prisma/client"

export function EducationFormDialog({ education, isEditing }: { education?: Education, isEditing?: boolean }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await saveEducation(formData, education?.id)
    setLoading(false)
    setOpen(false)
  }

  const handleDelete = async () => {
    if (!education?.id) return
    if (!confirm("Are you sure you want to delete this education entry?")) return
    setLoading(true)
    await deleteEducation(education.id)
    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={isEditing ? "text-blue-400 hover:text-blue-300 text-sm font-medium" : "bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200"}>
        {isEditing ? "Edit" : "Add Education"}
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Education" : "New Education"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input id="institution" name="institution" defaultValue={education?.institution} required className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" name="degree" defaultValue={education?.degree} required className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. B.Tech" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="field">Field of Study</Label>
              <Input id="field" name="field" defaultValue={education?.field || ""} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. Computer Science" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" defaultValue={education?.location || ""} className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" defaultValue={education?.startDate || ""} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. 2022" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" defaultValue={education?.endDate || ""} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. 2026" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="grade">Grade / GPA</Label>
              <Input id="grade" name="grade" defaultValue={education?.grade || ""} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. 8.5/10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea id="description" name="description" defaultValue={education?.description || ""} rows={3} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white" />
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="isPublished" name="isPublished" value="true" defaultChecked={education?.isPublished} className="rounded border-zinc-700 bg-zinc-800 text-white" />
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
