import HeroSection from "@/components/sections/hero-section";
import ImpactProjection from "@/components/sections/impact-projection";
import LearningPathPage from "@/components/sections/learningPath-section";
import TimelineSection from "@/components/sections/timeline-section";
export default function Main() {
    return (
        <>
            <main className="w-full max-w-7xl mx-auto h-full px-4">
                <HeroSection />
                <LearningPathPage />
                <ImpactProjection />
                <TimelineSection />
            </main>
        </>
    )

}