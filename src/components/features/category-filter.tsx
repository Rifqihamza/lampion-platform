"use client";

import { CategoryType } from "@/types";
import { Button } from "@/components/ui/button";

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
        <div className="space-y-2">
            <h3 className="font-semibold">Kategori</h3>
            <ul className="space-y-2 flex flex-wrap gap-2">
                <li>
                    <Button
                        variant={selected === null || selected === "" ? "default" : "outline"}
                        className="w-full justify-start rounded-lg"
                        onClick={() => onSelect("")}
                    >
                        Semua Kategori
                    </Button>
                </li>
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <Button
                            variant={selected === cat.slug ? "default" : "outline"}
                            className="w-full justify-start rounded-lg"
                            onClick={() => onSelect(cat.slug)}
                        >
                            {cat.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
