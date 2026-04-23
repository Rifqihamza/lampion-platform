"use client";

import { useEffect, useState } from "react";
import { useExplore } from "@/hooks/useExplore";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
    const { search, setSearch } = useExplore();
    const [localValue, setLocalValue] = useState(search);
    const debouncedSearch = useDebounce(localValue, 500);

    useEffect(() => {
        if (debouncedSearch !== search) {
            setSearch(debouncedSearch);
        }
    }, [debouncedSearch, search, setSearch]);

    useEffect(() => {
        setLocalValue(search);
    }, [search]);

    return (
        <div className="relative w-full group">
            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                size={18}
            />
            <Input
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder="Cari roadmap pembelajaran..."
                className="w-full h-auto pl-10 pr-4 py-2 bg-zinc-950 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary/50 transition-all"
            />
        </div>
    );
}
