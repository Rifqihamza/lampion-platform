import { z } from "zod";

export const exploreQuerySchema = z.object({
    category: z.string().optional(),
    difficulty: z
        .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
        .optional(),
    search: z.string().optional(),
});

export type ExploreQuery = z.infer<typeof exploreQuerySchema>;