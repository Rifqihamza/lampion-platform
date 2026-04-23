"use client";

import { Difficulty } from "../../../generated/prisma/enums";
import { Button } from "@/components/ui/button";

const levels: Difficulty[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

export default function DifficultyFilter({
    selected,
    onSelect,
}: {
    selected: Difficulty | null;
    onSelect: (level: Difficulty | "") => void;
}) {
    return (
        <div className="space-y-2">
            <h3 className="font-semibold">Kesulitan</h3>
            <ul className="space-y-2">
                <li>
                    <Button
                        variant={selected === null ? "default" : "outline"}
                        className="w-full justify-start rounded-lg"
                        onClick={() => onSelect("")}
                    >
                        Semua Kesulitan
                    </Button>
                </li>
                {levels.map((lvl) => (
                    <li key={lvl}>
                        <Button
                            variant={selected === lvl ? "default" : "outline"}
                            className="w-full justify-start rounded-lg"
                            onClick={() => onSelect(lvl)}
                        >
                            {lvl}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
