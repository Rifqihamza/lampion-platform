"use client";

import { useState } from "react";

export function useProgress(total: number) {
    const [completed, setCompleted] = useState<number[]>([]);

    const toggle = (id: number) => {
        setCompleted((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const percentage = total
        ? Math.round((completed.length / total) * 100)
        : 0;

    return { completed, toggle, percentage };
}