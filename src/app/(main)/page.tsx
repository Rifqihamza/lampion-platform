import HeroSection from "@/components/sections/hero-section";
import LearningPathPage from "@/components/sections/learningPath-section";
import TimelineSection from "@/components/sections/timeline-section";
export default function Main() {
    return (
        <>
            <main className="w-full max-w-7xl mx-auto px-4">
                <HeroSection />
                <LearningPathPage />
                <TimelineSection />
            </main>
        </>
    )

}