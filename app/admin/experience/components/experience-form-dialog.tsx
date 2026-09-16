"use client"

import { useState } from "react"
import { saveExperience, deleteExperience } from "../actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Experience } from "@prisma/client"

export function ExperienceFormDialog({ experience, isEditing }: { experience?: Experience, isEditing?: boolean }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await saveExperience(formData, experience?.id)
    setLoading(false)
    setOpen(false)
  }

  const handleDelete = async () => {
    if (!experience?.id) return
    if (!confirm("Are you sure you want to delete this experience?")) return
    setLoading(true)
    await deleteExperience(experience.id)
    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={isEditing ? "text-blue-400 hover:text-blue-300 text-sm font-medium" : "bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200"}>
        {isEditing ? "Edit" : "Add Experience"}
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Experience" : "New Experience"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" name="organization" defaultValue={experience?.organization} required className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" defaultValue={experience?.role} required className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type</Label>
              <Input id="employmentType" name="employmentType" defaultValue={experience?.employmentType || ""} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. Full-time, Internship" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" defaultValue={experience?.location || ""} className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" defaultValue={experience?.startDate || ""} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. May 2024" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" defaultValue={experience?.endDate || ""} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. Present" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea id="description" name="description" defaultValue={experience?.description || ""} rows={3} className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white" />
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="isCurrent" name="isCurrent" value="true" defaultChecked={experience?.isCurrent} className="rounded border-zinc-700 bg-zinc-800 text-white" />
              <Label htmlFor="isCurrent">Currently working here</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="isPublished" name="isPublished" value="true" defaultChecked={experience?.isPublished} className="rounded border-zinc-700 bg-zinc-800 text-white" />
              <Label htmlFor="isPublished">Publish on website</Label>
            </div>
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
