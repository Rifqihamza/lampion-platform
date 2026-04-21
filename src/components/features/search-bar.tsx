"use client";

import { useExplore } from "@/hooks/useExplore";
import { Input } from "../ui/input";
export default function SearchBar() {
    const { search, setSearch } = useExplore();

    return (
        <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 bg-black border border-white/10 rounded-xl"
        />
    );
}