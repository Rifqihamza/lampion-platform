"use client"
import { ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
export default function HeroSection() {
    return (
        <section id="home-section" className="w-full h-dvh flex items-center justify-center py-20 px-4 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-secondary">
                    Belajar Terarah, Masa Depan Cerah.
                </h1>
                <p className="text-lg text-foreground mb-10 leading-relaxed">
                    Lampion bantu kamu menemukan roadmap yang sudah dikurasi
                    oleh para ahli, agar kamu tidak tersesat di tengah lautan informasi internet.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size={"lg"} className="bg-transparent hover:bg-secondary border border-border text-white hover:border-secondary">
                        <Link href="/explore">Mulai Cari Roadmap</Link>
                    </Button>
                    <Button size={"lg"} className="bg-transparent hover:bg-primary border border-border text-white hover:border-primary">
                        <Link href="#step-section">Pelajari Alurnya</Link>
                    </Button>
                </div>
                <div className="w-full flex items-center justify-center mt-4">
                    <Link href={"#about-section"}>
                        <ChevronDown size={24} className="animate-bounce" />
                    </Link>
                </div>
            </div>
        </section>
    )
}