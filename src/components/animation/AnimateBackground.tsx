"use client";

import { useSyncExternalStore } from "react";
import Particles from "./particles";

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
            <Particles
                particleColors={["#ffffff"]}
                particleCount={300}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={false}
                alphaParticles
                disableRotation
                pixelRatio={1}
            />

            {/* Efek Glow */}
            <div
                className="absolute bottom-0 left-0 w-50 h-50 rounded-full opacity-5 blur-[200px] animate-pulse"
                style={{ backgroundColor: "oklch(0.45 0.18 25)" }}
            />

            <div
                className="absolute top-0 right-0 w-50 h-50 rounded-full opacity-5 blur-[200px] animate-pulse"
                style={{ backgroundColor: "oklch(0.75 0.15 85)" }}
            />
        </div>
    );
}