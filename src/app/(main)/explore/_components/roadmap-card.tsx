import Link from "next/link";
import { RoadmapWithRelations } from "@/types";

export default function RoadmapCard({
    roadmap,
}: {
    roadmap: RoadmapWithRelations;
}) {
    return (
        <Link href={`/roadmap/${roadmap.slug}`}>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/40 transition">
                <h2 className="text-lg font-semibold text-yellow-400">
                    {roadmap.title}
                </h2>

                <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    {roadmap.description}
                </p>

                <div className="flex justify-between mt-4 text-xs text-gray-500">
                    <span>{roadmap.category.name}</span>
                    <span>{roadmap.difficulty}</span>
                </div>

                <div className="mt-3 h-1 bg-white/10 rounded">
                    <div className="h-1 bg-yellow-400 w-1/3 rounded" />
                </div>
            </div>
        </Link>
    );
}