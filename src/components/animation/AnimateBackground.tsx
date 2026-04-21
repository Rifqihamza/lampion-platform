"use client";

import { useSyncExternalStore } from "react";
import FloatingLines from "./floating-line";

// Fungsi langganan kosong karena kita hanya butuh status server vs client
const subscribe = () => () => { };

export default function AnimateBackground() {
    // Hook ini akan mengembalikan 'false' di server dan 'true' di client secara instan
    const isClient = useSyncExternalStore(
        subscribe,
        () => true, // Nilai di Client
        () => false // Nilai di Server
    );

    // Jangan render apapun di Server
    if (!isClient) return null;

    return (
        <div className="w-full h-screen -z-50 fixed pointer-events-none">
            <FloatingLines
                enabledWaves={["bottom", "middle"]}
                lineCount={5}
                lineDistance={10.5}
                bendRadius={10}
                bendStrength={-2}
                interactive
                parallax={true}
                animationSpeed={1}
                linesGradient={["#a20519", "#d9a514", "#6a6a6a"]}
            />

            {/* Efek Glow */}
            <div
                className="absolute top-1/2 -translate-y-1/2 -left-1/8 w-100 h-100 rounded-full opacity-10 blur-[150px] animate-pulse"
                style={{ backgroundColor: "oklch(0.45 0.18 25)" }}
            />

            <div
                className="absolute top-0 -right-50 w-100 h-100 rounded-full opacity-10 blur-[120px] animate-pulse"
                style={{ backgroundColor: "oklch(0.75 0.15 85)" }}
            />
        </div>
    );
}