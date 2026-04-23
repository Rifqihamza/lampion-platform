"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useCallback, useState } from "react";
import { Difficulty } from "../../generated/prisma/enums";

interface ExploreState {
    category: string | null;
    difficulty: Difficulty | null;
    search: string;
    isPending: boolean;
}

export function useExplore(): ExploreState & {
    setCategory: (slug: string | null) => void;
    setDifficulty: (level: Difficulty | null) => void;
    setSearch: (value: string) => void;
} {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // --- gunakan state lokal untuk search ---
    const [search, setSearchState] = useState(searchParams.get("search") || "");

    // Sync state lokal dengan URL params tanpa useEffect untuk menghindari cascading renders
    const currentSearchParam = searchParams.get("search") || "";
    if (search !== currentSearchParam && !isPending) {
        setSearchState(currentSearchParam);
    }

    const updateParams = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, value]) => {
                if (value) params.set(key, value);
                else params.delete(key);
            });

            startTransition(() => {
                router.push(`/explore?${params.toString()}`, { scroll: false });
            });
        },
        [searchParams, router]
    );

    return {
        category: searchParams.get("category"),
        difficulty: searchParams.get("difficulty") as Difficulty | null,
        search,
        isPending,

        setCategory: (slug) => updateParams({ category: slug }),
        setDifficulty: (level) => updateParams({ difficulty: level }),
        setSearch: (value) => {
            setSearchState(value); // update state lokal
            updateParams({ search: value || null }); // hanya push jika ada perubahan
        },
    };
}
