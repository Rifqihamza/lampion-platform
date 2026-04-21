"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterInput } from "@/lib/validators/auth";
import { toast } from "sonner";

export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const register = async (data: RegisterInput) => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Gagal mendaftar");
            }

            toast.success("Akun berhasil dibuat! Silakan masuk.");
            setTimeout(() => {
                router.push("/login");
            }, 2000);

            return { success: true };
        } catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan saat mendaftar";
            toast.error(message);
            // ✅ Return daripada throw — biarkan caller menangani via return value
            return { success: false, error: message };
        } finally {
            setIsLoading(false);
        }
    };

    return { register, isLoading };
}