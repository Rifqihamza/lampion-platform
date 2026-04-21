"use server";

import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/validators/auth";
import { z } from "zod";
import crypto from "crypto";
import nodemailer from "nodemailer";

async function sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/update-password?token=${token}`;
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        secure: process.env.EMAIL_SERVER_PORT === "465", // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Lampion Platform" <no-reply@lampion.id>',
        to: email,
        subject: "Reset Password",
        text: "Hello, this is your reset password link! try it before the token reset.",
        html: `<a href="${resetUrl}">Reset Password</a>`,
    });
}

export async function requestPasswordReset(rawData: ForgotPasswordInput) {
    try {
        const validatedData = forgotPasswordSchema.parse(rawData);
        const { email } = validatedData;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Selalu return success untuk mencegah user enumeration attack
        if (!user) {
            return { success: true };
        }

        // ✅ Gunakan crypto.randomBytes — aman secara kriptografis
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 3600000); // 1 jam dari sekarang

        await prisma.passwordResetToken.upsert({
            where: { email },
            update: { token, expires },
            create: { email, token, expires },
        });

        // Kirim email (implementasi di atas)
        await sendPasswordResetEmail(email, token);

        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error("Data yang dimasukkan tidak valid.");
        }
        console.error("[requestPasswordReset] Error:", error);
        throw new Error("Terjadi kesalahan pada server. Silakan coba lagi.");
    }
}