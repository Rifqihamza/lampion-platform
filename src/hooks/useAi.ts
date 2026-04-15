"use client";

import { useState } from "react";
import { AIMessage } from "@/types";

export function useAI() {
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [loading, setLoading] = useState(false);

    const ask = async (milestoneTitle: string, question: string) => {
        setLoading(true);

        const res = await fetch("/api/ai/chat", {
            method: "POST",
            body: JSON.stringify({ milestoneTitle, question }),
        });

        const data = await res.json();

        setMessages((prev) => [
            ...prev,
            { role: "user", text: question },
            { role: "ai", text: data.answer },
        ]);

        setLoading(false);
    };

    return { messages, ask, loading };
}