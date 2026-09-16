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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" defaultValue={profile.name || ""} required className="bg-zinc-800 border-zinc-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Public Email</Label>
          <Input id="email" name="email" type="email" defaultValue={profile.email || ""} required className="bg-zinc-800 border-zinc-700 text-white" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="headline">Headline (Role / Title)</Label>
          <Input id="headline" name="headline" defaultValue={profile.headline || ""} className="bg-zinc-800 border-zinc-700 text-white" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="shortBio">Short Bio (Hero Section)</Label>
          <textarea 
            id="shortBio" 
            name="shortBio" 
            defaultValue={profile.shortBio || ""} 
            rows={2}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white" 
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Full Bio</Label>
          <textarea 
            id="bio" 
            name="bio" 
            defaultValue={profile.bio || ""} 
            rows={4}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" defaultValue={profile.location || ""} className="bg-zinc-800 border-zinc-700 text-white" />
        </div>
        <div className="space-y-2 md:col-span-2 border-t border-zinc-800 pt-6">
          <h3 className="text-lg font-medium">Media & Files</h3>
        </div>
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <FileUpload 
            name="profileImageUrl" 
            value={profileImageUrl} 
            onChange={setProfileImageUrl} 
            accept="image/*" 
          />
        </div>
        <div className="space-y-2">
          <Label>Resume (PDF)</Label>
          <FileUpload 
            name="resumeUrl" 
            value={resumeUrl} 
            onChange={setResumeUrl} 
            accept="application/pdf" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
        <button type="submit" disabled={loading} className="px-6 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-50">
          {loading ? "Saving..." : "Save Changes"}
        </button>
        {success && <p className="text-sm text-green-400">Profile updated successfully!</p>}
      </div>
    </form>
  )
}
