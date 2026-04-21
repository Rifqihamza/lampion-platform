"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export function useLogout() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const logout = async () => {
        setIsLoggingOut(true);

        try {
            // Sign out dari NextAuth — redirect: false agar kita kontrol transisi manual
            await signOut({ redirect: false });

            toast.success("Berhasil keluar, sampai jumpa lagi! 🏮");

            // Gunakan replace agar history dashboard terhapus
            window.location.replace("/login");

        } catch (error) {
            // ✅ Pisahkan error object dari string pesan toast
            console.error("Logout error:", error);
            toast.error("Gagal keluar, coba lagi.");
            setIsLoggingOut(false);
        }
    };

    return { logout, isLoggingOut };
}