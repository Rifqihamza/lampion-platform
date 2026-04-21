"use client";

import { ChevronDown } from "lucide-react";
import { CategoryType } from "@/types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CategoryFilter({
    categories,
    selected,
    onSelect,
}: {
    categories: CategoryType[];
    selected: string | null;
    onSelect: (slug: string) => void;
}) {
    // Mencari nama kategori yang sedang dipilih berdasarkan slug
    const selectedCategory = categories.find((cat) => cat.slug === selected);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-auto h-auto px-4 py-2 justify-between border-yellow-500/30 rounded-xl">
                    <span className="truncate">
                        {selectedCategory ? selectedCategory.name : "Semua Kategori"}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-50 rounded-xl">
                {/* Opsi Reset/Semua Kategori */}
                <DropdownMenuItem onClick={() => onSelect("")}>
                    Semua Kategori
                </DropdownMenuItem>

                {categories.map((cat) => (
                    <DropdownMenuItem
                        key={cat.id}
                        onClick={() => onSelect(cat.slug)}
                        className={selected === cat.slug ? "bg-yellow-500 text-black focus:bg-yellow-600" : ""}
                    >
                        {cat.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}