import { Difficulty } from "../../generated/prisma/enums";

export interface ExploreCategory {
    id: string;
    name: string;
    slug: string;
}

export interface ExploreMilestone {
    id: string;
    title: string;
    order: number;
}

export interface RoadmapProgress {
    completedMilestones: number;
    totalMilestones: number;
    percentage: number;
    lastAccessedAt?: Date;
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

    // Properti baru untuk menangani progress user
    progress?: RoadmapProgress;
}