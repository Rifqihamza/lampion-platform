"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useCallback } from "react";
import { Difficulty } from "../../generated/prisma/enums";

interface ExploreState {
    category: string | null;
    difficulty: Difficulty | null; // Typesafe sesuai DB
    search: string;
    isPending: boolean;
}

export function useExplore(): ExploreState & {
    setCategory: (slug: string | null) => void;
    setDifficulty: (level: Difficulty | null) => void; // Gunakan enum di sini
    setSearch: (value: string) => void;
} {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const updateParams = useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value) params.set(key, value);
            else params.delete(key);
        });

        startTransition(() => {
            router.push(`/explore?${params.toString()}`, { scroll: false });
        });
    }, [searchParams, router]);

    return {
        category: searchParams.get("category"),
        // Type casting yang aman karena validasi nativeEnum
        difficulty: searchParams.get("difficulty") as Difficulty | null,
        search: searchParams.get("search") || "",
        isPending,

        setCategory: (slug) => updateParams({ category: slug }),
        setDifficulty: (level) => updateParams({ difficulty: level }),
        setSearch: (value) => updateParams({ search: value }),
    };
}