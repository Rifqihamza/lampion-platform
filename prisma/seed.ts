import { prisma } from "../src/lib/prisma"; // Sesuaikan path ke lib/prisma kamu

async function main() {
    console.log("🏮 Start seeding Lampion data...");

    // 1. Bersihkan Data Lama (Optional, tapi disarankan agar tidak duplikat slug)
    // Urutan delete penting untuk menghindari FK Constraint error
    await prisma.milestone.deleteMany({});
    await prisma.roadmap.deleteMany({});
    await prisma.category.deleteMany({});

    // 2. Create Categories
    const catWeb = await prisma.category.create({
        data: { name: "Modern Web Development", slug: "web-dev" },
    });
    const catPhoto = await prisma.category.create({
        data: { name: "Cinematic Photography", slug: "cinematic" },
    });
    const catBiz = await prisma.category.create({
        data: { name: "Strategic Business", slug: "business" },
    });

    // 3. Create Roadmap: Web Dev (Next.js Focus)
    await prisma.roadmap.create({
        data: {
            title: "Next.js 15 Fullstack Mastery",
            slug: "nextjs-mastery",
            description: "Belajar membangun aplikasi scalable dengan App Router dan Server Actions.",
            difficulty: "INTERMEDIATE",
            duration: "8 Weeks",
            categoryId: catWeb.id,
            milestones: {
                create: [
                    {
                        title: "Next.js Fundamentals",
                        description: "Routing, Layouts, dan Server Components.",
                        order: 1,
                        type: "VIDEO",
                        contentUrl: "https://nextjs.org/docs",
                    },
                    {
                        title: "Database Integration with Prisma",
                        description: "Menghubungkan MariaDB/Postgres ke aplikasi.",
                        order: 2,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                ],
            },
        },
    });

    // 4. Create Roadmap: Photography
    await prisma.roadmap.create({
        data: {
            title: "Cinematic Lighting Guide",
            slug: "cinematic-lighting",
            description: "Seni menggunakan bayangan dan cahaya untuk mood filmis.",
            difficulty: "BEGINNER",
            duration: "4 Weeks",
            categoryId: catPhoto.id,
            milestones: {
                create: [
                    {
                        title: "The Three Point Lighting",
                        description: "Key light, Fill light, dan Back light.",
                        order: 1,
                        type: "VIDEO",
                        contentUrl: "#",
                    },
                    {
                        title: "Color Grading Basics",
                        description: "Menggunakan LUTs untuk hasil sinematik.",
                        order: 2,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                ],
            },
        },
    });

    console.log("✅ Seed finished: Lampion is now enlightened!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
