"use client"

import Link from "next/link"
export default function HeroSection() {
    return (
        <section id="home" className="w-full h-dvh flex items-center justify-center py-20 px-4 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl font-extrabold tracking-tight mb-6">
                    Belajar Terarah, Masa Depan <span className="text-primary">Cerah</span>.
                </h1>
                <p className="text-xl text-foreground mb-10 leading-relaxed">
                    Lampion tu kamu menemukan roadmap yang sudah dikurasi
                    oleh para ahli, agar kamu tidak tersesat di tengah lautan informasi internet.
                </p>
                <div className="flex justify-center gap-4">
                    <button>
                        <Link href="/explore">Mulai Cari Roadmap</Link>
                    </button>
                    <button>
                        <Link href="#step-section">Pelajari Alurnya</Link>
                    </button>
                </div>
            </div>
        </section>
    )
}