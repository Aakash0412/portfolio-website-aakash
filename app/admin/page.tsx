import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { SignOutButton } from "./components/signout-button"

export default async function AdminDashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-1">Welcome back, {session.user.name}</p>
          </div>
          <SignOutButton />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-medium text-lg mb-2">Projects</h3>
            <p className="text-zinc-400 text-sm mb-4">Manage your portfolio projects, status, and details.</p>
            <a href="/admin/projects" className="text-sm font-medium text-blue-400 hover:text-blue-300">Manage Projects &rarr;</a>
          </div>
          
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-medium text-lg mb-2">Profile</h3>
            <p className="text-zinc-400 text-sm mb-4">Update your bio, headline, and resume.</p>
            <a href="/admin/profile" className="text-sm font-medium text-blue-400 hover:text-blue-300">Edit Profile &rarr;</a>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-medium text-lg mb-2">Skills</h3>
            <p className="text-zinc-400 text-sm mb-4">Organize your technical skills and categories.</p>
            <a href="/admin/skills" className="text-sm font-medium text-blue-400 hover:text-blue-300">Manage Skills &rarr;</a>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-medium text-lg mb-2">Certifications</h3>
            <p className="text-zinc-400 text-sm mb-4">Manage your academic and professional certificates.</p>
            <a href="/admin/certifications" className="text-sm font-medium text-blue-400 hover:text-blue-300">Manage Certifications &rarr;</a>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-medium text-lg mb-2">Experience</h3>
            <p className="text-zinc-400 text-sm mb-4">Manage your work history and internships.</p>
            <a href="/admin/experience" className="text-sm font-medium text-blue-400 hover:text-blue-300">Manage Experience &rarr;</a>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-medium text-lg mb-2">Education</h3>
            <p className="text-zinc-400 text-sm mb-4">Manage your academic background.</p>
            <a href="/admin/education" className="text-sm font-medium text-blue-400 hover:text-blue-300">Manage Education &rarr;</a>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-medium text-lg mb-2">Leadership</h3>
            <p className="text-zinc-400 text-sm mb-4">Manage your leadership roles and extracurriculars.</p>
            <a href="/admin/leadership" className="text-sm font-medium text-blue-400 hover:text-blue-300">Manage Leadership &rarr;</a>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-medium text-lg mb-2">Achievements</h3>
            <p className="text-zinc-400 text-sm mb-4">Manage your awards and accomplishments.</p>
            <a href="/admin/achievements" className="text-sm font-medium text-blue-400 hover:text-blue-300">Manage Achievements &rarr;</a>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-medium text-lg mb-2">Security</h3>
            <p className="text-zinc-400 text-sm mb-4">Update your admin password and security settings.</p>
            <a href="/admin/settings/password" className="text-sm font-medium text-blue-400 hover:text-blue-300">Change Password &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  )
}
