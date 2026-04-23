import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import NavbarWrapper from "@/components/shared/navbarWrapper"; // Import wrapper tadi
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default async function Navbar() {
    const session = await auth();

    return (
        <NavbarWrapper>
            {/* ================= LEFT ================= */}
            <div className="flex items-baseline-last gap-4 md:gap-10 relative">
                <Link
                    href="/"
                    className="font-bold text-2xl tracking-tighter flex items-center"
                >
                    <Image src={"/apple-touch-icon.png"} alt="Icon Navbar" width={40} height={40} />
                    Lampion
                </Link>

                <div className="hidden md:flex items-center gap-4 text-sm font-medium">
                    <Link
                        href="/"
                        className="hover:text-primary transition-colors relative group">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full duration-300"></span>
                    </Link>
                    <Link
                        href="/#learningPath-section"
                        className="hover:text-primary transition-colors relative group">
                        About
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full duration-300"></span>
                    </Link>
                    <Link
                        href="/#timeline-section"
                        className="hover:text-primary transition-colors relative group">
                        Timeline
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full duration-300"></span>
                    </Link>
                    {session ? (
                        <Link
                            href="/dashboard"
                            className="hover:text-primary transition-colors relative group">
                            Dashboard
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full duration-300"></span>
                        </Link>
                    ) : (
                        <Link
                            href="/explore"
                            className="hover:text-primary transition-colors relative group">
                            Explore
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full duration-300"></span>
                        </Link>
                    )}
                </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="flex items-center gap-4">
                {session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-primary">
                                <AvatarImage src={session.user?.image || ""} />
                                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-full flex flex-col justify-center">
                            <DropdownMenuLabel className="flex flex-row items-center gap-2">
                                <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-primary">
                                    <AvatarImage src={session.user?.image || ""} />
                                    <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium">{session.user?.name}</p>
                                    <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="px-4 py-3">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard" className="px-4 py-3">Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/setting" className="px-4 py-3">Setting</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                                <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }} className="w-full">
                                    <Button type="submit" variant={"default"} className="w-full bg-transparent text-error hover:text-error hover:bg-red-500">Keluar</Button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button size={"lg"} variant="ghost" asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button size={"lg"} asChild className="bg-primary text-foreground hover:bg-primary/90">
                            <Link href="/register">Sign Up</Link>
                        </Button>
                    </div>
                )}
            </div>
        </NavbarWrapper>
    );
}