import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
    BookOpen,
    Clock,
    GraduationCap,
    LayoutDashboard,
    TrendingUp
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
    const session = await auth();


    if (!session) {
        redirect("/login");
    }

    const userId = session?.user?.id

    const roadmapCount = await prisma.userProgress.groupBy({
        by: ["roadmapId"],
        where: { userId }
    })

    const completedCount = await prisma.userProgress.count({
        where: {
            userId,
            completed: true,
        }
    })

    const totalMilestones = await prisma.milestone.count({
        where: {
            roadmap: {
                userProgress: {
                    some: { userId }
                }
            }
        }
    })

    const xp = completedCount * 50
    // Data dummy untuk tampilan sementara
    const stats = [
        {
            title: "Roadmap Diikuti",
            value: roadmapCount.length,
            icon: BookOpen,
            color: "text-blue-500"
        },
        {
            title: "Selesai",
            value: completedCount.toString(),
            icon: GraduationCap,
            color: "text-green-500"
        },
        {
            title: "Jam Belajar",
            value: totalMilestones > 0
                ? Math.round((completedCount / totalMilestones) * 100) + "%"
                : "0%",
            icon: Clock,
            color: "text-yellow-500"
        },
        {
            title: "XP Point",
            value: xp.toString(),
            icon: TrendingUp,
            color: "text-purple-500"
        },
    ];

    const activeRoadmap = await prisma.roadmap.findMany({
        where: {
            userProgress: {
                some: { userId }
            }
        },
        include: {
            milestones: true,
            userProgress: {
                where: {
                    userId,
                    completed: true
                }
            }
        }
    })

    const roadmapWithProgress = activeRoadmap.map(r => {
        const total = r.milestones.length;
        const completed = r.userProgress.length;

        return {
            ...r,
            progress: total > 0 ? Math.round((completed / total) * 100) : 0
        }
    });
    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Wilujeng Sumping, {session.user?.name?.split(" ")[0]}! 🏮
                </h1>
                <p className="text-muted-foreground">
                    Lanjutkan perjalanan belajarmu hari ini.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Active Roadmaps Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Roadmap Aktif</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {roadmapWithProgress.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                Kamu belum mengikuti roadmap apapun.
                            </p>
                        ) : (
                            roadmapWithProgress.slice(0, 3).map((roadmap) => (
                                <div key={roadmap.id} className="flex items-center gap-4">

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                        <LayoutDashboard className="text-primary" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {roadmap.title}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <Progress value={roadmap.progress} className="h-2" />
                                            <span className="text-xs text-muted-foreground">
                                                {roadmap.progress}%
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* Sidebar/Info Card */}
                <Card className="col-span-3 border-border/50 bg-linear-to-br from-red-500/5 to-purple-500/5">
                    <CardHeader>
                        <CardTitle>Misi Mingguan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">
                            Selesaikan 2 milestone lagi untuk mendapatkan lencana
                            <span className="text-foreground font-bold italic ml-1">
                                &quot;Early Lantern&quot;
                            </span>.
                        </div>
                        <button className="mt-4 w-full py-2 bg-foreground text-background rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                            Lihat Semua Misi
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}