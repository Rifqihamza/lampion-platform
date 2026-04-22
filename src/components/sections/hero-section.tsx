"use client"
import { ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { Map, BookOpen } from "lucide-react"
export default function HeroSection() {
    return (
        <section id="home-section" className="w-full h-dvh flex items-center justify-center py-20 px-4 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Belajar <span className="text-primary">Terarah</span>, Masa Depan <span className="text-primary">Cerah</span>.
                </h1>
                <p className="text-lg text-foreground mb-10 leading-relaxed">
                    Lampion bantu kamu menemukan roadmap yang sudah dikurasi
                    oleh para ahli, agar kamu tidak tersesat di tengah lautan informasi internet.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size={"lg"} className="bg-primary text-foreground hover:bg-secondary/80 duration-300 hover:scale-105">
                        <Link href="/explore" className="flex flex-row items-center justify-center gap-1">
                            <Map size={30} />
                            Mulai Penjelajahan
                        </Link>
                    </Button>
                    <Button size={"lg"} className="bg-secondary/20 hover:bg-secondary text-foreground duration-300 hover:scale-105 border border-accent-foreground/20">
                        <Link href="/#timeline-section" className="flex flex-row items-center justify-center gap-1">
                            <BookOpen size={30} />
                            Lihat Alur Belajar
                        </Link>
                    </Button>
                </div>
                <div className="w-full flex items-center justify-center mt-6">
                    <Link href={"#learningPath-section"}>
                        <ChevronDown size={24} className="animate-bounce" />
                    </Link>
                </div>
            </div>
        </section>
    )
}