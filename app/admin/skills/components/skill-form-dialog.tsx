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
      <DialogTrigger className={isEditing ? "nav-link" : "btn btn-primary"} style={isEditing ? { fontSize: '13px', color: 'var(--fg)' } : { padding: '8px 16px', fontSize: '13px' }}>
        {isEditing ? "Edit" : "Add Skill"}
      </DialogTrigger>
      <DialogContent style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', color: 'var(--fg)', padding: '0', overflow: 'hidden' }} className="sm:max-w-[425px]">
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
          <DialogTitle style={{ fontSize: '1.25rem' }}>{isEditing ? "Edit Skill" : "New Skill"}</DialogTitle>
        </div>
        <form onSubmit={handleSubmit} className="contact-form" style={{ padding: '24px', background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <Label htmlFor="name" className="form-label">Skill Name</Label>
            <Input id="name" name="name" defaultValue={skill?.name} required className="form-input" />
          </div>
          
          <div className="form-group">
            <Label htmlFor="categoryId" className="form-label">Category</Label>
            <select 
              id="categoryId" 
              name="categoryId" 
              defaultValue={skill?.categoryId || (categories[0]?.id || "")}
              required 
              className="form-input"
              style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '12px auto' }}
            >
              {categories.map(c => (
                <option key={c.id} value={c.id} style={{ background: 'var(--bg)', color: 'var(--fg)' }}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3 mt-2">
            <input type="checkbox" id="isVisible" name="isVisible" value="true" defaultChecked={skill?.isVisible ?? true} style={{ accentColor: 'var(--fg)', width: '16px', height: '16px' }} />
            <Label htmlFor="isVisible" className="form-label" style={{ marginBottom: '0', cursor: 'pointer' }}>Visible on website</Label>
          </div>
          
          <div className="flex justify-between pt-4 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
            {isEditing ? (
              <button type="button" onClick={handleDelete} disabled={loading} style={{ color: 'var(--error)', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>
                Delete Skill
              </button>
            ) : <div></div>}
            <div className="space-x-3 flex">
              <button type="button" onClick={() => setOpen(false)} style={{ padding: '8px 16px', fontSize: '14px', background: 'none', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--fg)', cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn btn-primary form-submit" style={{ padding: '8px 16px', fontSize: '14px', margin: '0' }}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
