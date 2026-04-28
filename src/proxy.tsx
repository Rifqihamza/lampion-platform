import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { env } from '@/lib/env'

const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/explore',
    '/roadmaps',
]

const authRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
]

const apiProtectedRoutes = [
    '/api/user',
    '/api/progress',
    '/api/roadmap',
    '/api/chat',
]

export default async function middleware(request: NextRequest) {
    const session = await auth()
    const { pathname } = request.nextUrl

    // Security Headers
    const response = NextResponse.next()

    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    // CORS Headers
    if (env.NODE_ENV === 'production') {
        response.headers.set('Access-Control-Allow-Origin', env.CORS_ORIGIN)
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    }

    // Handle OPTIONS request
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 200 })
    }

    // Protected API Routes
    if (apiProtectedRoutes.some(route => pathname.startsWith(route)) && !session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // If user is logged in and try to access auth routes, redirect to dashboard
    if (session && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Protected Routes - redirect to login if not authenticated
    if (!publicRoutes.some(route => pathname.startsWith(route)) && !authRoutes.includes(pathname) && !session) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return response
}

export const config = {
    runtime: 'nodejs',
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images|icons|fonts).*)',
    ],
}
