"use client";

import { useLogout } from "@/hooks/useLogout";
import { LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
export function LogoutButton() {
    const { logout, isLoggingOut } = useLogout();

    return (
        <Button
            size={"lg"}
            variant={"outline"}
            onClick={logout}
            disabled={isLoggingOut}
            className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 rounded-xl hover:bg-red-500/10 w-full transition-colors",
                isLoggingOut && "opacity-50 cursor-not-allowed"
            )}
        >
            {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <LogOut size={18} />
            )}
            <span>{isLoggingOut ? "Keluar..." : "Keluar"}</span>
        </Button>
    );
}