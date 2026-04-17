export interface ExploreCategory {
    id: string;
    name: string;
    slug: string;
}

export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface ExploreMilestone {
    id: string;
    title: string;
    order: number;
}

export interface ExploreRoadmap {
    id: string;
    title: string;
    slug: string;
    description: string;
    difficulty: Difficulty;
    duration: string;

    category: ExploreCategory;
    milestones: ExploreMilestone[];
}