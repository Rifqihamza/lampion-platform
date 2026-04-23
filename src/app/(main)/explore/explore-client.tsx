"use client";

import { CategoryType, RoadmapWithRelations } from "@/types";
import { useExplore } from "@/hooks/useExplore";

import CategoryFilter from "../../../components/features/category-filter";
import DifficultyFilter from "../../../components/features/difficulty-filter";
import SearchBar from "../../../components/features/search-bar";
import RoadmapCard from "../../../components/features/roadmap-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

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
            {/* Search di atas */}
            <SearchBar />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar kiri */}
                <aside className="space-y-4 md:col-span-1">
                    <CategoryFilter
                        categories={categories}
                        selected={explore.category}
                        onSelect={explore.setCategory}
                    />
                    <DifficultyFilter
                        selected={explore.difficulty}
                        onSelect={(level) => explore.setDifficulty(level === "" ? null : level)}
                    />
                </aside>

                {/* Konten kanan */}
                <main className="md:col-span-3">


                    {roadmaps.length === 0 ? (
                        <p className="text-gray-400 w-full h-dvh flex items-center justify-center">
                            No roadmap found
                        </p>
                    ) : (
                        explore.isPending ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="h-full p-5 rounded-xl bg-card backdrop-blur-xl border border-white/5 flex flex-col justify-between space-y-4">
                                    {/* Title + Badge */}
                                    <div className="flex justify-between items-start mb-2">
                                        <Skeleton className="h-5 w-2/3 rounded-md" />
                                        <Skeleton className="h-4 w-16 rounded-md" />
                                    </div>

                                    {/* Description */}
                                    <Skeleton className="h-4 w-full rounded-md" />
                                    <Skeleton className="h-4 w-5/6 rounded-md" />

                                    {/* Progress Section */}
                                    <div className="mt-6 space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <Skeleton className="h-3 w-20 rounded-md" />
                                            <Skeleton className="h-3 w-10 rounded-md" />
                                        </div>
                                        <Skeleton className="h-1.5 w-full rounded-full" />
                                        <Skeleton className="h-3 w-24 rounded-md" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ScrollArea className="w-full h-dvh p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {roadmaps.map((r) => <RoadmapCard key={r.id} roadmap={r} />)}
                                </div>
                            </ScrollArea>
                        )
                    )}
                </main>
            </div>
        </div>
    );
}
