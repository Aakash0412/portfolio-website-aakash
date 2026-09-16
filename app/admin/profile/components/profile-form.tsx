"use client"

import { useState } from "react"
import { updateProfile } from "../actions"
import { Profile } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileUpload } from "@/components/ui/file-upload"

export function ProfileForm({ profile }: { profile: Profile }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resumeUrl, setResumeUrl] = useState(profile.resumeUrl || "")
  const [profileImageUrl, setProfileImageUrl] = useState(profile.profileImageUrl || "")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)
    await updateProfile(formData, profile.id)
    setLoading(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" style={{ background: 'transparent', border: 'none', padding: '0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <Label htmlFor="name" className="form-label">Full Name</Label>
          <Input id="name" name="name" defaultValue={profile.name || ""} required className="form-input" />
        </div>
        <div className="form-group">
          <Label htmlFor="email" className="form-label">Public Email</Label>
          <Input id="email" name="email" type="email" defaultValue={profile.email || ""} required className="form-input" />
        </div>
        <div className="form-group md:col-span-2">
          <Label htmlFor="headline" className="form-label">Headline (Role / Title)</Label>
          <Input id="headline" name="headline" defaultValue={profile.headline || ""} className="form-input" />
        </div>
        <div className="form-group md:col-span-2">
          <Label htmlFor="shortBio" className="form-label">Short Bio (Hero Section)</Label>
          <textarea 
            id="shortBio" 
            name="shortBio" 
            defaultValue={profile.shortBio || ""} 
            rows={2}
            className="form-input" 
          />
        </div>
        <div className="form-group md:col-span-2">
          <Label htmlFor="bio" className="form-label">Full Bio</Label>
          <textarea 
            id="bio" 
            name="bio" 
            defaultValue={profile.bio || ""} 
            rows={4}
            className="form-input" 
          />
        </div>

        <div className="form-group md:col-span-2">
          <Label htmlFor="location" className="form-label">Location</Label>
          <Input id="location" name="location" defaultValue={profile.location || ""} className="form-input" />
        </div>
        
        <div className="form-group md:col-span-2 border-t border-zinc-800 pt-6 mt-4">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Media & Files</h3>
        </div>
        <div className="form-group">
          <Label className="form-label">Profile Picture</Label>
          <FileUpload 
            name="profileImageUrl" 
            value={profileImageUrl} 
            onChange={setProfileImageUrl} 
            accept="image/*" 
          />
        </div>
        <div className="form-group">
          <Label className="form-label">Resume (PDF)</Label>
          <FileUpload 
            name="resumeUrl" 
            value={resumeUrl} 
            onChange={setResumeUrl} 
            accept="application/pdf" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
        <button type="submit" disabled={loading} className="btn btn-primary form-submit">
          {loading ? "Saving..." : "Save Changes"}
        </button>
        {success && <p className="form-status is-success" style={{ minHeight: 'auto', padding: '0', margin: '0' }}>Profile updated successfully!</p>}
      </div>
    </form>
  )
}
