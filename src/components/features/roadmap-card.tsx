import Link from "next/link";
import { ExploreRoadmap } from "@/types";
import { Badge } from "../ui/badge";
export default function RoadmapCard({
    roadmap,
}: {
    roadmap: ExploreRoadmap;
}) {

    const stats = roadmap.progress ?? {
        completedMilestones: 0,
        totalMilestones: roadmap.milestones.length,
        percentage: 0
    }
    return (
        <Link href={`/roadmap/${roadmap.slug}`} className="group">
            <div className="h-full p-5 rounded-xl bg-secondary/10 backdrop-blur-xl border border-white/5 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {roadmap.title}
                        </h2>
                        <Badge variant="secondary" className="text-[10px]">
                            {roadmap.difficulty}
                        </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {roadmap.description}
                    </p>
                </div>

                <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-primary font-medium">{roadmap.category.name}</span>
                        <span className="font-bold">{stats.percentage}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-linear-to-r from-primary to-secondary transition-all duration-500"
                            style={{ width: `${stats.percentage}%` }}
                        />
                    </div>

                    <p className="text-[10px] text-muted-foreground">
                        {stats.completedMilestones} / {stats.totalMilestones} Milestones
                    </p>
                </div>
            </div>
        </Link>
    );
}