"use client"

import { useState } from "react"
import { saveSkill, deleteSkill } from "../actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skill, SkillCategory } from "@prisma/client"

export function SkillFormDialog({ skill, categories, isEditing }: { skill?: Skill, categories: SkillCategory[], isEditing?: boolean }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await saveSkill(formData, skill?.id)
    setLoading(false)
    setOpen(false)
  }

  const handleDelete = async () => {
    if (!skill?.id) return
    if (!confirm("Are you sure you want to delete this skill?")) return
    setLoading(true)
    await deleteSkill(skill.id)
    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={isEditing ? "text-blue-400 hover:text-blue-300 text-sm font-medium" : "bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200"}>
        {isEditing ? "Edit" : "Add Skill"}
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Skill" : "New Skill"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input id="name" name="name" defaultValue={skill?.name} required className="bg-zinc-800 border-zinc-700" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <select 
              id="categoryId" 
              name="categoryId" 
              defaultValue={skill?.categoryId || (categories[0]?.id || "")}
              required 
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:text-sm"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="isVisible" name="isVisible" value="true" defaultChecked={skill?.isVisible ?? true} className="rounded border-zinc-700 bg-zinc-800 text-white" />
            <Label htmlFor="isVisible">Visible on website</Label>
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
