import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // Asumsi path authjs kamu
import { exploreQuerySchema } from "@/lib/validators/explore";
import { CategoryType, RoadmapWithRelations } from "@/types";
import { Difficulty } from "../../../../generated/prisma/enums";
import ExploreClient from "@/app/(main)/explore/explore-client";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ExplorePage(props: PageProps) {
    const searchParams = await props.searchParams;
    const session = await auth(); // Ambil sesi user

    const parsed = exploreQuerySchema.safeParse(searchParams);
    const { category, difficulty, search } = parsed.success
        ? parsed.data
        : { category: undefined, difficulty: undefined, search: undefined };

    // 1. Query Roadmaps
    const roadmapsRaw = await prisma.roadmap.findMany({
        where: {
            ...(category && { category: { slug: category } }),
            ...(difficulty && { difficulty: difficulty as Difficulty }),
            ...(search && { title: { contains: search } }),
        },
        include: {
            category: true,
            milestones: {
                orderBy: { order: "asc" }
            },
            // Ambil progress jika user sudah login
            ...(session?.user?.id && {
                userProgress: {
                    where: {
                        userId: session.user.id,
                        completed: true // Hanya ambil yang sudah selesai
                    }
                }
            })
        },
        orderBy: { createdAt: "desc" },
    });

    // 2. Mapping ke Interface ExploreRoadmap (Menghitung Progress)
    const roadmaps = roadmapsRaw.map((roadmap) => {
        const total = roadmap.milestones.length;
        // Jika tidak login, userProgress akan undefined/kosong
        const completed = ("userProgress" in roadmap ? (roadmap.userProgress as Array<unknown>).length : 0);

        const mapped = {
            ...roadmap,
            progress: {
                completedMilestones: completed,
                totalMilestones: total,
                percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
            }
        };

        return mapped as unknown as RoadmapWithRelations;
    });

    const categories: CategoryType[] = await prisma.category.findMany({
        orderBy: { name: "asc" }
    });

    return (
        <main className="container mx-auto min-h-svh pt-20 pb-10">
            <div className="px-4">
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Explore Roadmaps</h1>
                    <p className="text-muted-foreground">
                        Temukan jalur belajar yang tepat untuk karier impianmu.
                    </p>
                </div>

                <ExploreClient
                    roadmaps={roadmaps}
                    categories={categories}
                />
            </div>
        </main>
    );
}