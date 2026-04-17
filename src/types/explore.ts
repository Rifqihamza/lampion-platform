import { Prisma } from "@prisma/client";

/**
 * Roadmap dengan relasi lengkap untuk Explore Page
 */
export type RoadmapWithRelations =
    Prisma.RoadmapGetPayload<{
        include: {
            category: true;
            milestones: {
                orderBy: { order: "asc" };
            };
        };
    }>;

/**
 * Category type
 */
export type CategoryType =
    Prisma.CategoryGetPayload<{}>;