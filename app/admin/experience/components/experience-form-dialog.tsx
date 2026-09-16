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
      <DialogTrigger className={isEditing ? "nav-link" : "btn btn-primary"} style={isEditing ? { fontSize: '13px', color: 'var(--fg)' } : { padding: '8px 16px', fontSize: '13px' }}>
        {isEditing ? "Edit" : "Add Experience"}
      </DialogTrigger>
      <DialogContent style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', color: 'var(--fg)', padding: '0', overflow: 'hidden' }} className="sm:max-w-[500px]">
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
          <DialogTitle style={{ fontSize: '1.25rem' }}>{isEditing ? "Edit Experience" : "New Experience"}</DialogTitle>
        </div>
        <form onSubmit={handleSubmit} className="contact-form" style={{ padding: '24px', background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="organization" className="form-label">Organization</Label>
              <Input id="organization" name="organization" defaultValue={experience?.organization} required className="form-input" />
            </div>
            <div className="form-group">
              <Label htmlFor="role" className="form-label">Role</Label>
              <Input id="role" name="role" defaultValue={experience?.role} required className="form-input" />
            </div>
            <div className="form-group">
              <Label htmlFor="employmentType" className="form-label">Employment Type</Label>
              <Input id="employmentType" name="employmentType" defaultValue={experience?.employmentType || ""} className="form-input" placeholder="e.g. Full-time, Internship" />
            </div>
            <div className="form-group">
              <Label htmlFor="location" className="form-label">Location</Label>
              <Input id="location" name="location" defaultValue={experience?.location || ""} className="form-input" />
            </div>
            <div className="form-group">
              <Label htmlFor="startDate" className="form-label">Start Date</Label>
              <Input id="startDate" name="startDate" defaultValue={experience?.startDate || ""} className="form-input" placeholder="e.g. May 2024" />
            </div>
            <div className="form-group">
              <Label htmlFor="endDate" className="form-label">End Date</Label>
              <Input id="endDate" name="endDate" defaultValue={experience?.endDate || ""} className="form-input" placeholder="e.g. Present" />
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="description" className="form-label">Description</Label>
            <textarea id="description" name="description" defaultValue={experience?.description || ""} rows={3} className="form-input" />
          </div>
          
          <div className="flex gap-4 items-center mt-2">
            <div className="flex items-center space-x-3">
              <input type="checkbox" id="isCurrent" name="isCurrent" value="true" defaultChecked={experience?.isCurrent} style={{ accentColor: 'var(--fg)', width: '16px', height: '16px' }} />
              <Label htmlFor="isCurrent" className="form-label" style={{ marginBottom: '0', cursor: 'pointer' }}>Currently working here</Label>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" id="isPublished" name="isPublished" value="true" defaultChecked={experience?.isPublished} style={{ accentColor: 'var(--fg)', width: '16px', height: '16px' }} />
              <Label htmlFor="isPublished" className="form-label" style={{ marginBottom: '0', cursor: 'pointer' }}>Publish on website</Label>
            </div>
          </div>
          
          <div className="flex justify-between pt-4 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
            {isEditing ? (
              <button type="button" onClick={handleDelete} disabled={loading} style={{ color: 'var(--error)', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>
                Delete Experience
              </button>
            ) : <div></div>}
            <div className="space-x-3 flex">
              <button type="button" onClick={() => setOpen(false)} style={{ padding: '8px 16px', fontSize: '14px', background: 'none', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--fg)', cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn btn-primary form-submit" style={{ padding: '8px 16px', fontSize: '14px', margin: '0' }}>
                {loading ? "Saving..." : "Save Experience"}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
