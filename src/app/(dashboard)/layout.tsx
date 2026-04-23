import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/shared/dashboard-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) redirect("/login");

    return (
        <TooltipProvider delayDuration={0}>

            <SidebarProvider>
                {/* Sidebar Component */}
                <DashboardSidebar user={session.user} />

                <main className="flex-1 overflow-y-auto bg-zinc-950/20 min-h-screen">
                    {/* Navbar / Header Mobile */}
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
                        <SidebarTrigger />
                        <div className="h-4 w-px bg-border/50 mx-2" />
                        <h1 className="text-sm font-medium">Dashboard</h1>
                    </header>

                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </TooltipProvider>
    );
}