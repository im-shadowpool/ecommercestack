// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true'
  const url = request.nextUrl.clone()
  const secret = url.searchParams.get('secret')
  const hasBypassCookie = request.cookies.get('bypass_maintenance')

  if (!maintenanceMode) return NextResponse.next()

  if (secret === process.env.MAINTENANCE_SECRET) {
    const res = NextResponse.redirect(url.origin)
    res.cookies.set('bypass_maintenance', 'true', { path: '/', maxAge: 86400 })
    return res
  }

  if (hasBypassCookie?.value === 'true') return NextResponse.next()

  const excluded = url.pathname.startsWith('/_next') || url.pathname.startsWith('/api') || url.pathname === '/maintenance'
  if (excluded) return NextResponse.next()

  url.pathname = '/maintenance'
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/:path*'],
}
