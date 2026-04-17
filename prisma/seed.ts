import { prisma } from "@/lib/prisma";

async function main() {
    const categories = await prisma.category.createMany({
        data: [
            { name: "Cinematic Photography", slug: "cinematic" },
            { name: "Modern Web Development", slug: "web-dev" },
            { name: "Strategic Business Management", slug: "business" },
        ],
    });

    const cinematic = await prisma.category.findUnique({
        where: { slug: "cinematic" },
    });

    const roadmap = await prisma.roadmap.create({
        data: {
            title: "Cinematic Photography Mastery",
            slug: "cinematic-photography",
            description: "Master storytelling through visuals",
            difficulty: "BEGINNER",
            duration: "6 weeks",
            categoryId: cinematic!.id,
            milestones: {
                create: [
                    {
                        title: "Camera Basics",
                        description: "Understand ISO, Aperture, Shutter",
                        order: 1,
                        type: "VIDEO",
                        contentUrl: "#",
                    },
                    {
                        title: "Lighting Techniques",
                        description: "Master natural & artificial light",
                        order: 2,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                ],
            },
        },
    });

    console.log("Seeded");
}

main();