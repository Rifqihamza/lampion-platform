import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { enrollAction } from "@/app/actions/enroll";
import Image from "next/image";
import { ChevronRight, Clock, BookOpen, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function RoadmapDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const session = await auth();

    const roadmap = await prisma.roadmap.findUnique({
        where: { slug },
        include: {
            category: true,
            milestones: {
                orderBy: { order: "asc" }
            }
        }
    });

    if (!roadmap) return (
        <div className="flex h-svh items-center justify-center text-muted-foreground">
            Roadmap tidak ditemukan
        </div>
    );

    // CCheck if user is enrolled
    const enrollment = session?.user?.id
        ? await prisma.userProgress.findFirst({
            where: { userId: session.user.id, roadmapId: roadmap.id }
        })
        : null;

    return (
        <div className="min-h-screen text-foreground pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* 1. Header & Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Visual Preview */}
                    <div className="lg:col-span-5 relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-white/10 bg-muted/20 shadow-2xl">
                        <Image
                            src="/loginImg.png"
                            alt={roadmap.title}
                            fill
                            className="object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                    </div>

                    {/* Info Content */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-2 text-sm text-primary font-medium">
                            <span>Roadmaps</span>
                            <ChevronRight size={14} />
                            <span>{roadmap.category?.name}</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                                {roadmap.title}
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                {roadmap.description}
                            </p>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 py-4">
                            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <Clock size={16} className="text-primary" />
                                <span className="text-sm font-medium">{roadmap.duration || "Estimasi 4 Minggu"}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <BookOpen size={16} className="text-primary" />
                                <span className="text-sm font-medium">{roadmap.milestones.length} Materi</span>
                            </div>
                            <Badge variant="outline" className="border-primary/50 text-primary">
                                {roadmap.difficulty}
                            </Badge>
                        </div>

                        {/* Call to Action */}
                        <div className="pt-4">
                            {enrollment ? (
                                <Button asChild size="lg" className="w-full md:w-auto px-10 h-14 text-lg font-bold">
                                    <Link href="/dashboard">Lanjutkan Belajar</Link>
                                </Button>
                            ) : (
                                <form action={async (formData) => {
                                    "use server";
                                    await enrollAction(formData);
                                }}>
                                    <input type="hidden" name="roadmapId" value={roadmap.id} />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full md:w-auto px-10 h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                                    >
                                        Enroll Materi Sekarang
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="my-16 border-white/5" />

                {/* 2. Kurikulum / Curriculum Section */}
                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                        <GraduationCap className="text-primary" size={28} />
                        <h2 className="text-3xl font-bold">Kurikulum Roadmap</h2>
                    </div>

                    <div className="relative space-y-4 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                        {roadmap.milestones.map((m, index) => (
                            <div
                                key={m.id}
                                className="group relative pl-12 transition-all"
                            >
                                {/* Bullet point indicator */}
                                <div className="absolute left-4.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-zinc-700 border-2 border-background z-10 group-hover:bg-primary group-hover:scale-125 transition-all" />

                                <div className="p-5 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm group-hover:bg-white/10 group-hover:border-primary/30 transition-all cursor-default">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase tracking-widest text-primary/70 font-bold">
                                                Step {index + 1}
                                            </span>
                                            <h3 className="font-semibold text-white text-lg">
                                                {m.title}
                                            </h3>
                                        </div>
                                        <div className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Details
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}