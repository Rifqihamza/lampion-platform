"use client";

import { useLogout } from "@/hooks/useLogout";
import { LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useSidebar } from "@/components/ui/sidebar"; // Import hook ini

export function LogoutButton() {
    const { logout, isLoggingOut } = useLogout();
    const { state } = useSidebar(); // Ambil state sidebar (expanded atau collapsed)

    const isCollapsed = state === "collapsed";

    return (
        <Button
            size={isCollapsed ? "icon-sm" : "lg"} // Ubah size jadi icon jika tertutup
            variant={"outline"}
            onClick={logout}
            disabled={isLoggingOut}
            className={cn(
                "flex items-center text-sm font-medium text-red-500 rounded-xl hover:bg-red-500/10 transition-all duration-500 overflow-hidden border-red-500/20",
                // Jika terbuka, gunakan width full dan gap, jika tertutup biarkan ukuran icon
                !isCollapsed ? "w-full px-3 py-2 gap-3 justify-start" : "size-9 justify-center -ml-2.5",
                isLoggingOut && "opacity-50 cursor-not-allowed"
            )}
        >
            <div className="flex shrink-0 items-center justify-center">
                {isLoggingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <LogOut size={18} />
                )}
            </div>

            {/* Sembunyikan teks secara kondisional dengan class CSS agar transisi lebih halus */}
            {!isCollapsed && (
                <span className="truncate whitespace-nowrap">
                    {isLoggingOut ? "Keluar..." : "Keluar"}
                </span>
            )}
        </Button>
    );
}