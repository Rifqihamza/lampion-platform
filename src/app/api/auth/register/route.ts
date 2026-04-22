import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../../../generated/prisma/client";
import { RegisterInput, registerSchema } from "@/lib/validators/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validasi ulang di Server (Wajib untuk keamanan)
        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            console.log("Detail Error Zod:", JSON.stringify(validation.error.format(), null, 2));

            return NextResponse.json(
                { message: "Data tidak valid", errors: validation.error.flatten() },
                { status: 400 }
            );
        }

        // ✅ Destructure & buang confirmPassword — tidak perlu disimpan ke DB
        const { email, password, name }: RegisterInput = validation.data;

        // 2. Cek duplikasi user
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email sudah terdaftar" },
                { status: 409 }
            );
        }

        // 3. Hash password
        const hashedPassword = await hash(password, 12);

        // 4. Simpan ke database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "User created", id: user.id },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration Error Log:", error);

        const errorMessage = error instanceof Error ? error.message : "";

        // Tangkap error Database (Prisma)
        if (
            error instanceof Prisma.PrismaClientInitializationError ||
            (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2024") ||
            errorMessage.includes("timeout")
        ) {
            return NextResponse.json(
                { message: "Layanan tidak tersedia. Coba lagi nanti (Timeout)." },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { message: "Terjadi kesalahan pada server" },
            { status: 500 }
        );
    }
}