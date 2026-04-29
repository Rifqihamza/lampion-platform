import "dotenv/config"; // ← Tambahkan ini di baris PERTAMA
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Difficulty, MilestoneType } from "../generated/prisma/client";

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! })
});

async function main() {
    // 1. Bersihkan database (Optional - hati-hati di production)
    await prisma.userProgress.deleteMany({});
    await prisma.aIChatHistory.deleteMany({});
    await prisma.milestone.deleteMany({});
    await prisma.roadmap.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});

    // 2. Buat User Dummy
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john@example.com",
            password: "1tm1tr4101101",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
    });

    // 3. Buat Kategori
    const webDev = await prisma.category.create({
        data: {
            name: "Web Development",
            slug: "web-development",
        },
    });

    const mobileDev = await prisma.category.create({
        data: {
            name: "Mobile Development",
            slug: "mobile-development",
        },
    });

    // 4. Buat Roadmap: Fullstack Next.js
    const nextjsRoadmap = await prisma.roadmap.create({
        data: {
            title: "Fullstack Next.js Mastery",
            slug: "fullstack-nextjs-mastery",
            description: "Belajar membangun aplikasi modern dengan Next.js 14, Tailwind, dan Prisma.",
            difficulty: Difficulty.INTERMEDIATE,
            duration: "4 Minggu",
            categoryId: webDev.id,
            milestones: {
                create: [
                    {
                        title: "Pengenalan App Router",
                        description: "Memahami struktur folder dan routing baru di Next.js.",
                        order: 1,
                        type: MilestoneType.VIDEO,
                        contentUrl: "https://youtube.com/watch?v=example1",
                    },
                    {
                        title: "Server Components vs Client Components",
                        description: "Kapan menggunakan 'use client' dan manfaat rendering di server.",
                        order: 2,
                        type: MilestoneType.ARTICLE,
                        contentUrl: "https://nextjs.org/docs/server-components",
                    },
                    {
                        title: "Project: Dashboard Sederhana",
                        description: "Membangun dashboard CRUD dengan database PostgreSQL.",
                        order: 3,
                        type: MilestoneType.PROJECT,
                        contentUrl: "https://github.com/example/project-repo",
                    },
                ],
            },
        },
        include: {
            milestones: true,
        },
    });

    // 5. Buat Progress User (Simulasi user sudah mulai belajar)
    const firstMilestone = nextjsRoadmap.milestones[0];

    await prisma.userProgress.create({
        data: {
            userId: user.id,
            roadmapId: nextjsRoadmap.id,
            milestoneId: firstMilestone.id,
            completed: true,
            isEnrolled: true,
        },
    });

    // 6. Buat Dummy Chat History
    await prisma.aIChatHistory.create({
        data: {
            userId: user.id,
            milestoneId: firstMilestone.id,
            question: "Apa perbedaan utama layout.js dan template.js?",
            answer: "Layout mempertahankan state saat navigasi, sedangkan template akan membuat instance baru setiap kali rute berubah.",
        },
    });

    console.log("✅ Seeding database berhasil!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });