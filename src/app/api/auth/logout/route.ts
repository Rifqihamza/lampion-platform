import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();

    // Hapus semua cookie yang berkaitan dengan auth
    const allCookies = cookieStore.getAll();
    allCookies.forEach((cookie) => {
        cookieStore.set(cookie.name, "", { expires: new Date(0) });
    });

    return NextResponse.json({ message: "Logged out" }, { status: 200 });
}