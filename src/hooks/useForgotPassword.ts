"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ForgotPasswordInput } from "@/lib/validators/auth";
import { requestPasswordReset } from "@/app/actions/reset-password";

export const useForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const requestReset = async (data: ForgotPasswordInput) => {
        setIsLoading(true);
        try {
            const result = await requestPasswordReset(data);

            if (result.success) {
                setIsSent(true);
                toast.success("Instruksi reset telah dikirim ke email kamu!");
                return { success: true };
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Gagal memproses permintaan.";
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    const resetStatus = () => setIsSent(false);

    return { requestReset, isLoading, isSent, resetStatus };
};