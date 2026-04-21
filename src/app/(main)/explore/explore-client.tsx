"use client";

import { CategoryType, RoadmapWithRelations } from "@/types";
import { useExplore } from "@/hooks/useExplore";

import CategoryFilter from "../../../components/features/category-filter";
import DifficultyFilter from "../../../components/features/difficulty-filter";
import SearchBar from "../../../components/features/search-bar";
import RoadmapCard from "../../../components/features/roadmap-card";

export default function ExploreClient({
    roadmaps,
    categories,
}: {
    roadmaps: RoadmapWithRelations[];
    categories: CategoryType[];
}) {
    const explore = useExplore();

    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col md:flex-row w-full h-full gap-2">
                <SearchBar />
                <CategoryFilter
                    categories={categories}
                    selected={explore.category}
                    onSelect={explore.setCategory}
                />

                <DifficultyFilter

                    selected={explore.difficulty}
                    onSelect={(level) => explore.setDifficulty(level === "" ? null : level)}
                />
            </div>

            {explore.isPending && (
                <p className="text-gray-400">Loading...</p>
            )}

            {roadmaps.length === 0 ? (
                <p className="text-gray-400 w-full h-dvh flex items-center justify-center">
                    No roadmap found
                </p>
            ) : (
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {roadmaps.map((r) => (
                        <RoadmapCard key={r.id} roadmap={r} />
                    ))}
                </div>
            )}
        </div>
    );
}