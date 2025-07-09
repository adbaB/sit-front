import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { decodeJwt } from 'jose'
import { PayloadJWT } from './lib/models/authenticate'

// 1. Specify protected and public routes

const routes = [
  { path: '/general', permissions: null, isPrivate: true },
  // { path: '/', Permissions: null, isPrivate: true, redirect: '/general' },
]
const publicRoutes = ['/auth/login']
export default async function middleware(
  req: NextRequest,
): Promise<NextResponse> {
  const path = req.nextUrl.pathname

  // 1. Check if the route is public
  if (publicRoutes.includes(path)) {
    return NextResponse.next()
  }

  // 2. Check if the user is logged in
  const accessToken = (await cookies()).get('access_token')?.value
  const refreshToken = (await cookies()).get('refresh_token')?.value
  let permissions = [] as number[]

  // Get the current route config
  const route = routes.find((route) => {
    return route.path === path
  })

  // 3. If the route is protected and the user is not logged in, redirect to the login page
  if (!accessToken && !refreshToken && route?.isPrivate) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }

  // Get the permissions from the access token
  if (accessToken) {
    const payload: PayloadJWT = decodeJwt(accessToken as string)
    permissions = payload.permissions
  }

  if (path === '/') {
    return NextResponse.redirect(new URL('/general', req.nextUrl))
  }
  // if the user have admin permission he can access any route
  if (permissions?.includes(1)) {
    return NextResponse.next()
  }

  // if the route is protected and the user does not have the required permissions, redirect to the general page
  const isRouteProtected = route?.permissions
  if (isRouteProtected) {
    if (!permissions?.includes(isRouteProtected)) {
      return NextResponse.redirect(new URL('/general', req.nextUrl))
    }
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
