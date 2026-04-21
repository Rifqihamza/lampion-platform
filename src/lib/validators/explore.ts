import { z } from "zod";
import { Difficulty } from "../../../generated/prisma/enums";

export const exploreQuerySchema = z.object({
    category: z.string().optional(),
    difficulty: z.enum(Difficulty).nullable(),
    search: z.string().optional(),
});

export type ExploreQuery = z.infer<typeof exploreQuerySchema>;