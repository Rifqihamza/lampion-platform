"use client";

import { CategoryType, RoadmapWithRelations } from "@/types";
import { useExplore } from "@/hooks/useExplore";

import CategoryFilter from "./_components/category-filter";
import DifficultyFilter from "./_components/difficulty-filter";
import SearchBar from "./_components/search-bar";
import RoadmapCard from "./_components/roadmap-card";

export default function ExploreClient({
    roadmaps,
    categories,
}: {
    roadmaps: RoadmapWithRelations[];
    categories: CategoryType[];
}) {
    const explore = useExplore();

    return (
        <div className="space-y-6">
            <SearchBar />

            <div className="flex gap-4">
                <CategoryFilter
                    categories={categories}
                    selected={explore.category}
                    onSelect={explore.setCategory}
                />

                <DifficultyFilter
                    selected={explore.difficulty}
                    onSelect={explore.setDifficulty}
                />
            </div>

            {explore.isPending && (
                <p className="text-gray-400">Loading...</p>
            )}

            {roadmaps.length === 0 ? (
                <p className="text-gray-400">
                    No roadmap found
                </p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {roadmaps.map((r) => (
                        <RoadmapCard key={r.id} roadmap={r} />
                    ))}
                </div>
            )}
        </div>
    );
}