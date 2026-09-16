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
      <DialogTrigger className={isEditing ? "nav-link" : "btn btn-primary"} style={isEditing ? { fontSize: '13px', color: 'var(--fg)' } : { padding: '8px 16px', fontSize: '13px' }}>
        {isEditing ? "Edit" : "Add Certification"}
      </DialogTrigger>
      <DialogContent style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', color: 'var(--fg)', padding: '0', overflow: 'hidden' }} className="sm:max-w-[425px]">
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
          <DialogTitle style={{ fontSize: '1.25rem' }}>{isEditing ? "Edit Certification" : "New Certification"}</DialogTitle>
        </div>
        <form onSubmit={handleSubmit} className="contact-form" style={{ padding: '24px', background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <Label htmlFor="title" className="form-label">Title</Label>
            <Input id="title" name="title" defaultValue={certification?.title} required className="form-input" />
          </div>
          <div className="form-group">
            <Label htmlFor="issuer" className="form-label">Issuer</Label>
            <Input id="issuer" name="issuer" defaultValue={certification?.issuer} required className="form-input" />
          </div>
          <div className="form-group">
            <Label className="form-label">Certificate Image / File</Label>
            <FileUpload 
              name="certificateImageUrl" 
              value={certificateImageUrl} 
              onChange={setCertificateImageUrl} 
              accept="image/*,application/pdf" 
            />
          </div>
          <div className="flex items-center space-x-3 mt-2">
            <input type="checkbox" id="isPublished" name="isPublished" value="true" defaultChecked={certification?.isPublished} style={{ accentColor: 'var(--fg)', width: '16px', height: '16px' }} />
            <Label htmlFor="isPublished" className="form-label" style={{ marginBottom: '0', cursor: 'pointer' }}>Publish on website</Label>
          </div>
          
          <div className="flex justify-between pt-4 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
            {isEditing ? (
              <button type="button" onClick={handleDelete} disabled={loading} style={{ color: 'var(--error)', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>
                Delete Certification
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
