'use client'

import { impactData } from "@/types/impact";
import SpotlightCard from "../animation/spotlight-card";

export default function ImpactProjection() {
    return (
        <section id="impactProjection-section" className="w-full h-full flex items-center justify-center py-20">
            <div className="container mx-auto px-4 space-y-10">
                <div className="text-center">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Proyeksi Dampak</h2>
                    <p className="text-base md:text-lg text-gray-300 mt-2">Kontribusi Lampion dalam membangun Human Capital Indonesia.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {impactData.map((item) => (
                        <SpotlightCard key={item.id} className="custom-spotlight-card" spotlightColor="rgba(231, 149, 22, 0.2)">

                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                                {item.value}
                            </h3>
                            <p className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                {item.description}
                            </p>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    )
}