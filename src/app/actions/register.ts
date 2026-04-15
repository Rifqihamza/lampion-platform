"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function registerUser(formData: FormData) {
    const parsed = schema.parse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    const hashed = await bcrypt.hash(parsed.password, 10);

    await prisma.user.create({
        data: {
            name: parsed.name,
            email: parsed.email,
            password: hashed,
        },
    });

    return { success: true };
}