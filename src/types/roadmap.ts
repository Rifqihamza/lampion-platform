export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface Milestone {
    id: string;
    title: string;
    description: string;
    order: number;
    type: "VIDEO" | "ARTICLE" | "PROJECT";
    contentUrl: string;
}

export interface Roadmap {
    id: string;
    title: string;
    slug: string;
    description: string;
    difficulty: Difficulty;
    duration: string;
    milestones: Milestone[];
}