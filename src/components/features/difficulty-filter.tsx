"use client";

import { ChevronDown } from "lucide-react";
import { Difficulty } from "../../../generated/prisma/enums";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const levels: Difficulty[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

export default function DifficultyFilter({
    selected,
    onSelect,
}: {
    selected: Difficulty | null;
    onSelect: (level: Difficulty | "") => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-auto h-auto px-4 py-2 justify-between border-red-500/30 rounded-xl">
                    {selected ? selected : "Pilih Kesulitan"}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-auto rounded-xl p-3 space-y-3">
                <DropdownMenuItem onClick={() => onSelect("")}>
                    Semua Kesulitan
                </DropdownMenuItem>
                {levels.map((lvl) => (
                    <DropdownMenuItem
                        key={lvl}
                        onClick={() => onSelect(lvl)}
                        className={selected === lvl ? "bg-red-500 text-white focus:bg-red-600 focus:text-white" : ""}
                    >
                        {lvl}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}