"use client"

import MagicBento from "../animation/magic-bento"
export default function AboutSection() {
    return (
        <div id="about-section" className="w-full h-dvh flex items-center">
            <MagicBento
                textAutoHide={true}
                enableStars
                enableSpotlight
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect
                spotlightRadius={400}
                particleCount={12}
                glowColor="231,	149, 22"
                disableAnimations={false}
            />
        </div>
    )
}