"use client";

import { Difficulty } from "@prisma/client";

const levels: Difficulty[] = [
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
];

export default function DifficultyFilter({
    selected,
    onSelect,
}: {
    selected: Difficulty | null;
    onSelect: (level: Difficulty) => void;
}) {
    return (
        <div className="flex gap-2">
            {levels.map((lvl) => (
                <button
                    key={lvl}
                    onClick={() => onSelect(lvl)}
                    className={`px-3 py-1 rounded-full border ${selected === lvl
                        ? "bg-red-500 text-white"
                        : "border-red-500/30"
                        }`}
                >
                    {lvl}
                </button>
            ))}
        </div>
    );
}