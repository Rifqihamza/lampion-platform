"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordInput } from "@/lib/validators/auth";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, ShieldCheck } from "lucide-react";

interface ResetFormProps {
    token: string;
    className?: string;
}

export function UpdatePassForm({ token, className }: ResetFormProps) {
    const { reset, isLoading } = useUpdatePassword(token);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordInput) => {
        reset(data);
    };

    return (
        <div className={cn("flex flex-col justify-center gap-4", className)}>
            <Card className="w-full relative rounded-xl bg-primary/5 backdrop-blur-sm py-6 px-4 border-none shadow-none">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-2 text-primary">
                        <ShieldCheck size={40} />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Set New Password</CardTitle>
                    <CardDescription>
                        Masukkan password baru Anda untuk mengamankan akun Lampion Anda.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Password Baru</label>
                            <Input
                                {...register("password")}
                                type="password"
                                placeholder="••••••••"
                                className={cn(errors.password ? "border-destructive" : "bg-zinc-950/20")}
                                disabled={isLoading}
                            />
                            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Konfirmasi Password</label>
                            <Input
                                {...register("confirmPassword")}
                                type="password"
                                placeholder="••••••••"
                                className={cn(errors.confirmPassword ? "border-destructive" : "bg-zinc-950/20")}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Perbarui Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}