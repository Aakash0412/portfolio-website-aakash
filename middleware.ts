import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin')
  const isOnLogin = req.nextUrl.pathname === '/admin/login'

  if (isOnAdmin && !isOnLogin && !isLoggedIn) {
    return new NextResponse(null, {
      status: 302,
      headers: { Location: '/admin/login' },
    })
  }

  if (isOnLogin && isLoggedIn) {
    return new NextResponse(null, {
      status: 302,
      headers: { Location: '/admin' },
    })
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.pdf).*)'],
}
