import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validators/auth";
import { hash } from "bcryptjs";
import { ApiResponse } from "@/types/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validasi Input + Token
        const validation = resetPasswordSchema.safeParse(body);
        const token = body.token;

        if (!validation.success || typeof token !== "string") {
            return NextResponse.json<ApiResponse>(
                { message: "Data tidak valid atau token hilang" },
                { status: 400 }
            );
        }

        const { password } = validation.data;

        // 2. Cek Validitas Token di DB (MariaDB via Prisma)
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken || resetToken.expires < new Date()) {
            return NextResponse.json<ApiResponse>(
                { message: "Token kadaluarsa atau tidak valid" },
                { status: 410 }
            );
        }

        // 3. Update Password & Hapus Token
        const hashedPassword = await hash(password, 12);

        await prisma.$transaction([
            prisma.user.update({
                where: { email: resetToken.email },
                data: { password: hashedPassword },
            }),
            prisma.passwordResetToken.delete({
                where: { token },
            }),
        ]);

        return NextResponse.json<ApiResponse>(
            { message: "Password berhasil diperbarui" },
            { status: 200 }
        );

    } catch (error: unknown) {
        console.error("Reset API Error:", error);

        if (error instanceof Error && (error.message.includes("timeout") || (error as unknown as Record<string, unknown>).code === 'P2024')) {
            return NextResponse.json<ApiResponse>(
                { message: "Database sedang sibuk (Timeout). Coba lagi nanti." },
                { status: 503 }
            );
        }

        return NextResponse.json<ApiResponse>(
            { message: "Gagal memproses permintaan" },
            { status: 500 }
        );
    }
}