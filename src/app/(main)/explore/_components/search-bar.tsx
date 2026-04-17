"use client";

import { useExplore } from "@/hooks/useExplore";

export default function SearchBar() {
    const { search, setSearch } = useExplore();

    return (
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 bg-black border border-white/10 rounded"
        />
    );
}