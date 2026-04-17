import { prisma } from "@/lib/prisma";
import { exploreQuerySchema } from "@/lib/validators/explore";
import { RoadmapWithRelations, CategoryType } from "@/types";

import ExploreClient from "./explore-client";

export default async function ExplorePage({
    searchParams,
}: {
    searchParams: Record<string, string | string[] | undefined>;
}) {
    const parsed = exploreQuerySchema.safeParse(searchParams);

    const category = parsed.success
        ? parsed.data.category
        : undefined;

    const difficulty = parsed.success
        ? parsed.data.difficulty
        : undefined;

    const search = parsed.success
        ? parsed.data.search
        : undefined;

    const roadmaps: RoadmapWithRelations[] =
        await prisma.roadmap.findMany({
            where: {
                category: category
                    ? { slug: category }
                    : undefined,
                difficulty,
                title: search
                    ? {
                        contains: search,
                        mode: "insensitive",
                    }
                    : undefined,
            },
            include: {
                category: true,
                milestones: {
                    orderBy: { order: "asc" },
                },
            },
        });

    const categories: CategoryType[] =
        await prisma.category.findMany();

    return (
        <div className="p-8">
            <h1 className="text-3xl text-yellow-400 mb-6">
                Explore
            </h1>

            <ExploreClient
                roadmaps={roadmaps}
                categories={categories}
            />
        </div>
    );
}