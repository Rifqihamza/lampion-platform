import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Compass, Settings, User, LayoutDashboard, ArrowLeftCircle } from "lucide-react";
import { LogoutButton } from "@/components/shared/logoutButton";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) redirect("/login");

    const menu = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Profile", href: "/profile", icon: User },
        { name: "Explore", href: "/explore", icon: Compass },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-76 border-r border-border/50 hidden md:flex flex-col">
                <div className="p-6 flex flex-row items-center gap-2">
                    <Link href={"/"} className="text-foreground hover:text-primary duration-300">
                        <ArrowLeftCircle size={18} />
                    </Link>
                    <h2 className="text-xl font-bold tracking-tighter text-foreground">Dashboard</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menu.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl hover:bg-secondary transition-colors"
                        >
                            <item.icon size={18} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-border/50">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-zinc-950/20">
                {children}
            </main>
        </div>
    );
}