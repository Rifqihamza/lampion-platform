"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {

            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed left-0 right-0 w-dvw z-50 transition-all duration-500 ease-in-out",
                isScrolled
                    ? "top-5 max-w-7xl mx-auto" // Menjadi lebih ramping saat scroll
                    : "top-0 max-w-full mx-auto" // Full width saat di atas
            )}
        >
            <div
                className={cn(
                    "w-full flex items-center justify-between px-6 transition-all duration-500",
                    isScrolled
                        ? " py-3 bg-primary/5 backdrop-blur-md border border-primary/10 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                        : " py-5 border-none"
                )}
            >
                {children}
            </div>
        </motion.nav>
    );
}