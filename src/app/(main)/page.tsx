import AboutSection from "@/components/sections/about-section";
import HeroSection from "@/components/sections/hero-section";
import TimelineSection from "@/components/sections/timeline-section";
import Grainient from "@/components/animation/grainients";
export default function Main() {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full -z-50">
                <Grainient
                    color1="#5a1010"
                    color2="#000000"
                    color3="#e79516"
                    timeSpeed={0.25}
                    colorBalance={0}
                    warpStrength={1}
                    warpFrequency={5}
                    warpSpeed={2}
                    warpAmplitude={50}
                    blendAngle={0}
                    blendSoftness={0.05}
                    rotationAmount={500}
                    noiseScale={2}
                    grainAmount={0.1}
                    grainScale={2}
                    grainAnimated={false}
                    contrast={1.5}
                    gamma={1}
                    saturation={1}
                    centerX={0}
                    centerY={0}
                    zoom={0.9}
                />
            </div>
            <main className="w-full max-w-7xl mx-auto px-4">
                <HeroSection />
                <AboutSection />
                <TimelineSection />
            </main>
        </>
    )
}