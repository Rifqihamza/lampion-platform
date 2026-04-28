"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Map, Zap, Target, BookOpen } from "lucide-react"
import Link from "next/link"

export default function LearningPathPage() {
    return (
        <section id="learningPath-section" className="w-full min-h-svh flex items-center justify-center">
            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center px-4 md:px-0">

                {/* Kiri: Penjelasan & CTA */}
                <div className="space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                        <Map size={14} />
                        <span>AI-Powered Roadmap</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                        Belajar Lebih Terarah dengan <br />
                        <span className="text-primary">
                            Learning Path Roadmap
                        </span>
                    </h1>

                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Tak perlu bingung mulai dari mana. Lampion menyusun langkah demi langkah kurikulum yang dipersonalisasi khusus untuk tujuan kariermu.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-1">
                        <Button size="lg" className="gap-2 group text-foreground" asChild>
                            <Link href="/explore">
                                Explore Roadmap
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Kanan: Visual Card/Feature Highlights */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all border-l-4 border-l-primary">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Efisiensi Belajar</h3>
                                <p className="text-muted-foreground text-sm">Kurikulum yang fokus mempelajari apa yang industri butuhkan saat ini.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all border-l-4 border-l-primary">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <Target size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Track Progress</h3>
                                <p className="text-muted-foreground text-sm">Pantau perkembangan skill kamu secara real-time.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all border-l-4 border-l-primary">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Kategori Materi</h3>
                                <p className="text-muted-foreground text-sm">Tersedia banyak kategori materi yang ingin kamu kuasai.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}