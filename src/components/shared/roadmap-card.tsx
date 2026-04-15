import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface RoadmapCardProps {
    title: string;
    description: string;
    category: string;
    difficulty: string;
    slug: string;
}

export function RoadmapCard({ title, description, category, difficulty, slug }: RoadmapCardProps) {
    return (
        <Link href={`/roadmap/${slug}`}>
            <Card className="group hover:border-primary transition-all duration-300 h-full flex flex-col">
                <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                        <Badge variant="secondary">{category}</Badge>
                        <span className="text-xs text-muted-foreground">{difficulty}</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
                    <CardDescription className="line-clamp-3">{description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-0">
                    <span className="text-sm font-medium text-primary">Lihat Detail →</span>
                </CardFooter>
            </Card>
        </Link>
    );
}