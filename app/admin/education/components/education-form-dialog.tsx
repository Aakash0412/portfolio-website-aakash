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
      <DialogTrigger className={isEditing ? "nav-link" : "btn btn-primary"} style={isEditing ? { fontSize: '13px', color: 'var(--fg)' } : { padding: '8px 16px', fontSize: '13px' }}>
        {isEditing ? "Edit" : "Add Education"}
      </DialogTrigger>
      <DialogContent style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', color: 'var(--fg)', padding: '0', overflow: 'hidden' }} className="sm:max-w-[500px]">
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
          <DialogTitle style={{ fontSize: '1.25rem' }}>{isEditing ? "Edit Education" : "New Education"}</DialogTitle>
        </div>
        <form onSubmit={handleSubmit} className="contact-form" style={{ padding: '24px', background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="institution" className="form-label">Institution</Label>
              <Input id="institution" name="institution" defaultValue={education?.institution} required className="form-input" />
            </div>
            <div className="form-group">
              <Label htmlFor="degree" className="form-label">Degree</Label>
              <Input id="degree" name="degree" defaultValue={education?.degree} required className="form-input" placeholder="e.g. B.Tech" />
            </div>
            <div className="form-group">
              <Label htmlFor="field" className="form-label">Field of Study</Label>
              <Input id="field" name="field" defaultValue={education?.field || ""} className="form-input" placeholder="e.g. Computer Science" />
            </div>
            <div className="form-group">
              <Label htmlFor="location" className="form-label">Location</Label>
              <Input id="location" name="location" defaultValue={education?.location || ""} className="form-input" />
            </div>
            <div className="form-group">
              <Label htmlFor="startDate" className="form-label">Start Date</Label>
              <Input id="startDate" name="startDate" defaultValue={education?.startDate || ""} className="form-input" placeholder="e.g. 2022" />
            </div>
            <div className="form-group">
              <Label htmlFor="endDate" className="form-label">End Date</Label>
              <Input id="endDate" name="endDate" defaultValue={education?.endDate || ""} className="form-input" placeholder="e.g. 2026" />
            </div>
            <div className="form-group md:col-span-2">
              <Label htmlFor="grade" className="form-label">Grade / GPA</Label>
              <Input id="grade" name="grade" defaultValue={education?.grade || ""} className="form-input" placeholder="e.g. 8.5/10" />
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="description" className="form-label">Description</Label>
            <textarea id="description" name="description" defaultValue={education?.description || ""} rows={3} className="form-input" />
          </div>
          
          <div className="flex items-center space-x-3 mt-2">
            <input type="checkbox" id="isPublished" name="isPublished" value="true" defaultChecked={education?.isPublished} style={{ accentColor: 'var(--fg)', width: '16px', height: '16px' }} />
            <Label htmlFor="isPublished" className="form-label" style={{ marginBottom: '0', cursor: 'pointer' }}>Publish on website</Label>
          </div>
          
          <div className="flex justify-between pt-4 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
            {isEditing ? (
              <button type="button" onClick={handleDelete} disabled={loading} style={{ color: 'var(--error)', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>
                Delete Education
              </button>
            ) : <div></div>}
            <div className="space-x-3 flex">
              <button type="button" onClick={() => setOpen(false)} style={{ padding: '8px 16px', fontSize: '14px', background: 'none', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--fg)', cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn btn-primary form-submit" style={{ padding: '8px 16px', fontSize: '14px', margin: '0' }}>
                {loading ? "Saving..." : "Save Education"}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
