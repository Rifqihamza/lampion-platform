const LearningStep = ({ number, title, description }: { number: string, title: string, description: string }) => (
    <div className="group relative flex gap-6 pb-12 last:pb-0">
        <div className="absolute left-6 top-12 h-full w-0.5 bg-linear-to-b from-primary/50 to-transparent group-last:hidden" />

        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary bg-foreground/10 backdrop-blur-xl text-xl font-bold text-primary shadow-[0_0_20px_rgba(153,27,27,0.3)] transition-all group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_20px_10px_rgba(234,179,8,0.2)]">
            {number}
        </div>

        <div className="flex flex-col pt-2 transition-transform group-hover:translate-x-1">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{description}</p>
        </div>
    </div>
);

const AlurSection = () => {
    return (
        <section id="timeline-section" className="py-24 px-6 flex flex-col w-full max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Alur Belajar di Lampion
                </h2>
                <div className="h-1.5 w-24 bg-linear-to-r from-primary via-secondary to-primary mx-auto rounded-full shadow-[0_0_10px_rgba(234,179,8,0.2)]" />
            </div>

            <div className="space-y-4">
                <LearningStep
                    number="1"
                    title="Eksplorasi Roadmap"
                    description="Temukan jalur belajar yang sesuai dengan impian kariermu, dari dasar hingga tingkat lanjut."
                />
                <LearningStep
                    number="2"
                    title="Akses Materi Gratis"
                    description="Pelajari kurasi video, artikel, dan dokumentasi terbaik tanpa biaya sepeser pun."
                />
                <LearningStep
                    number="3"
                    title="Bangun Portofolio"
                    description="Dapatkan panduan proyek praktis yang bisa langsung kamu pamerkan kepada calon perekrut."
                />
                <LearningStep
                    number="4"
                    title="Pantau Milestone"
                    description="Lihat grafik progres belajarmu secara real-time untuk memastikan kamu siap menghadapi tantangan industri."
                />
            </div>
        </section>
    );
};

export default function TimelineSection() {
    return (
        <AlurSection />
    )
}