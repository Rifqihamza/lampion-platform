'use client'

import Link from "next/link";

export default function Footer() {
    const date = new Date().getFullYear();

    return (
        <footer className="w-full max-w-5xl mx-auto -translate-y-5 px-4">
            <div className="bg-background/10 backdrop-blur-sm p-8 relative rounded-2xl border border-white/5 shadow-[0_0_25px_1px_#e79516]/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-4xl font-bold tracking-tighter bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
                            Lampion
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Navigasi belajar terstruktur untuk mencetak talenta digital Indonesia yang kompetitif dan siap kerja.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-6">Menu</h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/#home-section" className="text-muted-foreground hover:text-secondary transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/#about-section" className="text-muted-foreground hover:text-secondary transition-colors">About</Link>
                            </li>
                            <li>
                                <Link href="/#timeline-section" className="text-muted-foreground hover:text-secondary transition-colors">Timeline</Link>
                            </li>
                            <li>
                                <Link href="/explore" className="text-muted-foreground hover:text-secondary transition-colors">Explore</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contribution Section */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-6">Kontribusi</h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <Link href="/komunitas" className="text-muted-foreground hover:text-secondary transition-colors">Komunitas</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-secondary transition-colors">Bantuan/FAQ</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-6">Kontak</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="text-muted-foreground">
                                support@lampion.id
                            </li>
                            <li className="text-muted-foreground italic">
                                Bekasi, Jawa Barat, Indonesia
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground/50">
                        © {date} Lampion Project. Built for IOFest 2026.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-xs text-muted-foreground/50 hover:text-secondary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-xs text-muted-foreground/50 hover:text-secondary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}