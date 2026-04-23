"use client";

import {
    LayoutDashboard,
    Settings,
    User as UserIcon,
    Compass,
    ArrowLeftCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/shared/logoutButton";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";

import { User } from "next-auth";

const menu = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/profile", icon: UserIcon },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Settings", href: "/settings", icon: Settings },
];

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user?: User;
}

export function DashboardSidebar({ user, ...props }: DashboardSidebarProps) {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <ArrowLeftCircle className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold text-white">Lampion</span>
                                    <span className="truncate text-xs text-muted-foreground">Go to Landing</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {menu.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        tooltip={item.name}
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-border/50 overflow-hidden">
                <div className="flex items-center gap-3 mb-4 px-2 group-data-[collapsible=icon]:hidden">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-white truncate w-32">
                            {user?.name || "User"}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate w-32">
                            {user?.email}
                        </span>
                    </div>
                </div>
                <LogoutButton />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}