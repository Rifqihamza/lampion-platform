"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ResetPasswordInput } from "@/lib/validators/auth";
import { ApiResponse, ResetPasswordRequest } from "@/types/auth";

export function useUpdatePassword(token: string) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const reset = async (data: ResetPasswordInput): Promise<void> => {
        setIsLoading(true);

        try {
            const payload: ResetPasswordRequest = { ...data, token };

            const response = await fetch("/api/auth/update-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result: ApiResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Gagal memperbarui password");
            }

            toast.success("Password berhasil diperbarui!");

            setTimeout(() => {
                router.push("/login");
                router.refresh();
            }, 2000);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan sistem";
            toast.error(message);
            console.error("Reset Password Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return { reset, isLoading };
}