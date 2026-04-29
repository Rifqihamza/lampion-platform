import React from "react";
import { Users, Zap, Globe } from "lucide-react";

export interface ImpactStat {
    id: number;
    label: string;
    value: string;
    description: string;
    icon: React.ReactNode;
}


export const impactData: ImpactStat[] = [
    {
        id: 1,
        label: "Target Literasi",
        value: "10,000+",
        description: "Talenta digital siap kerja dalam 1 tahun pertama.",
        icon: <Users className="w-6 h-6 text-blue-500" />,
    },
    {
        id: 2,
        label: "Efisiensi Belajar",
        value: "60%",
        description: "Lebih cepat dalam menemukan roadmap yang relevan.",
        icon: <Zap className="w-6 h-6 text-yellow-500" />,
    },
    {
        id: 3,
        label: "Aksesibilitas",
        value: "100%",
        description: "Gratis untuk seluruh roadmap dasar bagi masyarakat.",
        icon: <Globe className="w-6 h-6 text-green-500" />,
    },
]