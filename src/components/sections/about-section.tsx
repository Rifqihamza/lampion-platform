"use client"

import MagicBento from "../animation/magic-bento"
export default function AboutSection() {
    return (
        <div id="about-section">
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
                glowColor="234, 159, 6"
                disableAnimations={false}
            />
        </div>
    )
}