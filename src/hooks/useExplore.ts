"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Difficulty } from "@prisma/client";

export function useExplore() {
    const router = useRouter();
    const params = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const updateParam = (key: string, value?: string) => {
        const newParams = new URLSearchParams(params.toString());

        if (value) newParams.set(key, value);
        else newParams.delete(key);

        startTransition(() => {
            router.push(`/explore?${newParams.toString()}`);
        });
    };

    return {
        isPending,

        // current values
        category: params.get("category"),
        difficulty: params.get("difficulty") as Difficulty | null,
        search: params.get("search") || "",

        // actions
        setCategory: (slug: string) =>
            updateParam("category", slug),

        setDifficulty: (level: Difficulty) =>
            updateParam("difficulty", level),

        setSearch: (value: string) =>
            updateParam("search", value),
    };
}