import AboutSection from "@/components/sections/about-section";
import HeroSection from "@/components/sections/hero-section";
import StepSection from "@/components/sections/step-section";
export default function Main() {
    return (
        <>
            <main className="w-full max-w-7xl mx-auto px-4">
                <HeroSection />
                <AboutSection />
                <StepSection />
            </main>
        </>
    )
}