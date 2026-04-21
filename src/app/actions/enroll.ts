"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function enrollAction(formData: FormData) {
    const session = await auth();
    const roadmapId = formData.get("roadmapId") as string;

    const userId = session?.user?.id;
    if (!userId) redirect("/login");

    try {
        // 1. Ambil semua milestone yang ada di roadmap ini
        const milestones = await prisma.milestone.findMany({
            where: { roadmapId },
            select: { id: true }
        });

        if (milestones.length === 0) {
            // Opsional: Handle jika roadmap belum punya materi
            return { error: "Roadmap ini belum memiliki materi." };
        }

        // 2. Gunakan Transaction untuk mendaftarkan user ke SEMUA milestone sekaligus
        // Ini memastikan 'milestoneId' tidak kosong dan data konsisten
        await prisma.$transaction(
            milestones.map((m) =>
                prisma.userProgress.create({
                    data: {
                        userId: userId,
                        roadmapId: roadmapId,
                        milestoneId: m.id,
                        completed: false, // Sesuaikan dengan nama field di skemamu (completed/isCompleted)
                        isEnrolled: true
                    },
                })
            )
        );
    } catch (error) {
        console.error("Enrollment Error:", error);
        return { error: "Gagal melakukan pendaftaran materi." };
    }

    // 3. Revalidate dan Redirect
    revalidatePath("/dashboard");
    revalidatePath(`/roadmap/${roadmapId}`);
    redirect("/dashboard");
}