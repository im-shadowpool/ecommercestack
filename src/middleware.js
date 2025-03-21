import { NextResponse } from 'next/server'

export function middleware(request) {
  const isMaintenance = process.env.MAINTENANCE_MODE === 'true'

  if (
    isMaintenance &&
    !request.cookies.get('maintenance-auth')?.value &&
    !request.nextUrl.pathname.startsWith('/maintenance')
  ) {
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}
