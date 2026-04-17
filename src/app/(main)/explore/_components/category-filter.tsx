"use client";

import { CategoryType } from "@/types";

export default function CategoryFilter({
    categories,
    selected,
    onSelect,
}: {
    categories: CategoryType[];
    selected: string | null;
    onSelect: (slug: string) => void;
}) {
    return (
        <div className="flex gap-2">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.slug)}
                    className={`px-3 py-1 rounded-full border ${selected === cat.slug
                            ? "bg-yellow-500 text-black"
                            : "border-yellow-500/30"
                        }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}