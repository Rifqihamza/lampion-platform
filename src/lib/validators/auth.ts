import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
});

// Skema Login
export const loginSchema = z.object({
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(1, "Password wajib diisi"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Mohon masukkan email yang valid")
});

export const resetPasswordSchema = z.object({
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// Skema untuk payload register yang dikirim ke server (tanpa confirmPassword)
export const registerPayloadSchema = registerSchema.transform(({ confirmPassword: _, ...rest }) => rest);

// Infer type dari skema Zod
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;