"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginInput } from "@/lib/validators/auth";

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const login = async (data: LoginInput) => {
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                if (
                    result.status === 500 ||
                    result.error.includes("FetchError") ||
                    result.error.includes("ConnectTimeout")
                ) {
                    toast.error("Layanan sedang gangguan (Database Timeout). Silakan coba sesaat lagi.");
                } else if (result.error.includes("USER_NOT_FOUND")) {
                    toast.error("Akun tidak ditemukan, Registrasi terlebih dahulu");
                } else if (result.error.includes("INVALID_PASSWORD")) {
                    toast.error("Password salah, silakan coba lagi");
                } else {
                    toast.error("Email atau password salah");
                }
            } else {
                toast.success("Login Berhasil! Mengalihkan...");
                setTimeout(() => {
                    router.push("/dashboard");
                    router.refresh();
                }, 1500);
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Gagal terhubung ke server. Periksa koneksi internet Anda.");
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading };
}