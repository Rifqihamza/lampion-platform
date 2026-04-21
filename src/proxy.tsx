import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Tentukan pengelompokan rute
    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isPublicRoute = ["/", "/about", "/contact", "/terms", "/privacy"].includes(nextUrl.pathname);
    const isAuthRoute = ["/login", "/signup", "/forgot-password"].includes(nextUrl.pathname);
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

    // 1. Izinkan semua request API Auth (NextAuth internal)
    if (isApiAuthRoute) return NextResponse.next();

    // 2. Jika di halaman Login/Register dan sudah login, lempar ke Dashboard
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", nextUrl));
        }
        return NextResponse.next();
    }

    // 3. Proteksi rute Dashboard: Jika tidak login, lempar ke Login
    if (isDashboardRoute && !isLoggedIn) {
        // Simpan URL asal agar setelah login bisa kembali ke halaman tersebut
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) callbackUrl += nextUrl.search;

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return NextResponse.redirect(
            new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
    }

    // 4. Izinkan akses jika rute publik atau rute lainnya yang tidak diproteksi
    if (isPublicRoute) return NextResponse.next();

    return NextResponse.next();
});

// Matcher: Tentukan rute mana saja yang harus melewati middleware ini
export const config = {
    matcher: [
        // Lindungi semua rute kecuali file statis (next, image, favicon, dll)
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Selalu jalankan untuk API rute
        '/(api|trpc)(.*)',
    ],
};