import Link from "next/link";
// import { auth, signOut } from "@/lib/auth/auth";
import { auth, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
            <div className="w-full flex items-center justify-between py-2 px-6 bg-background/80 backdrop-blur-xl rounded-xl border border-white/5 shadow-[0_0_20px_rgba(153,27,27,0.1)]">
                {/* Logo + Navigation */}
                <div className="flex items-center gap-6 md:gap-10">
                    <Link
                        href="/"
                        className="font-bold text-2xl tracking-tighter text-primary"
                    >
                        Lampion
                    </Link>

                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {/* Menggunakan path absolut agar navigasi dari page explore aman */}
                        <Link href="/" className="transition-colors text-foreground hover:text-secondary">
                            Home
                        </Link>
                        <Link href="/#about-section" className="transition-colors text-foreground hover:text-secondary">
                            About
                        </Link>
                        {session ? (
                            <Link href="/dashboard" className="transition-colors text-foreground hover:text-secondary">
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/explore" className="transition-colors text-foreground hover:text-secondary">
                                Explore
                            </Link>
                        )}
                    </div>
                </div>

                {/* Auth Section */}
                <div className="flex items-center gap-4">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger >
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
                                        <p className="text-sm font-medium text-foreground">{session.user?.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {session.user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator className="bg-white/5" />

                                <DropdownMenuItem className="cursor-pointer hover:bg-secondary/10 focus:bg-secondary/10">
                                    <Link href="/dashboard" className="w-full text-foreground/80">
                                        Progres Belajar
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer hover:bg-secondary/10 focus:bg-secondary/10">
                                    <Link href="/profile" className="w-full text-foreground/80">
                                        Profil
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-white/5" />

                                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer focus:bg-destructive/10">
                                    <form
                                        action={async () => {
                                            "use server";
                                            await signOut({ redirectTo: "/" });
                                        }}
                                        className="w-full"
                                    >
                                        <button type="submit" className="w-full text-left font-medium">
                                            Keluar
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button size="sm" variant="ghost" className="text-foreground hover:text-secondary hover:bg-secondary/10" >
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(234,179,8,0.2)] font-bold" >
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}