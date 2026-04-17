import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-7xl mx-auto z-50 px-4">
            <div className="w-full flex items-center justify-between py-2 px-4 bg-background/10 rounded-xl backdrop-blur-sm">

                {/* ================= LEFT ================= */}
                <div className="flex items-baseline gap-6 md:gap-10">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-bold text-2xl tracking-tighter bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent"
                    >
                        Lampion
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-6 text-base font-medium">
                        <Link href="/" className="relative group hover:text-secondary duration-300">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full duration-300"></span>
                        </Link>

                        {/* ✅ FIX: pakai absolute path */}
                        <Link href="/#about-section" className="relative group hover:text-secondary duration-300">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full duration-300"></span>
                        </Link>

                        <Link href="/#timeline-section" className="relative group hover:text-secondary duration-300">
                            Timeline
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full duration-300"></span>
                        </Link>

                        {session ? (
                            <Link href="/dashboard" className="relative group hover:text-secondary duration-300">
                                Dashboard
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full duration-300"></span>
                            </Link>
                        ) : (
                            <Link href="/explore" className="relative group hover:text-secondary duration-300">
                                Explore
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full duration-300"></span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="flex items-center gap-4">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-9 w-9 cursor-pointer border border-primary/20 hover:ring-2 hover:ring-primary/50 transition-all">
                                    <AvatarImage
                                        src={session.user?.image || ""}
                                        alt={session.user?.name || ""}
                                    />
                                    <AvatarFallback className="bg-secondary/20 text-secondary">
                                        {session.user?.name?.[0]?.toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">
                                            {session.user?.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {session.user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                {/* ✅ FIX: gunakan asChild */}
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">
                                        Progres Belajar
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <Link href="/profile">
                                        Profil
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    <form
                                        action={async () => {
                                            "use server";
                                            await signOut({ redirectTo: "/" });
                                        }}
                                        className="w-full"
                                    >
                                        <button
                                            type="submit"
                                            className="w-full text-left font-medium"
                                        >
                                            Keluar
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-3">
                            {/* ✅ FIX: Button + Link */}
                            <Button size={"lg"} asChild className="bg-transparent hover:bg-secondary border border-border text-white hover:border-secondary">
                                <Link href="/login">Sign In</Link>
                            </Button>

                            <Button size={"lg"} asChild className="bg-transparent hover:bg-primary border border-border text-white hover:border-primary">
                                <Link href="/register">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}