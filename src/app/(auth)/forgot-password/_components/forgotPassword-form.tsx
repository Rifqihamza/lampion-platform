"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, SendHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/validators/auth";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
    const { requestReset, isLoading, isSent, resetStatus } = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    // ✅ Langsung delegate ke hook — tidak ada logic di sini
    const onSubmit = async (data: ForgotPasswordInput) => {
        await requestReset(data);
    };

    return (
        <div className={cn("flex flex-col justify-center gap-4", className)} {...props}>
            <Card className="w-full relative rounded-xl bg-primary/5 backdrop-blur-xl py-6 px-4 border-white/10 shadow-2xl">
                <Link
                    href="/login"
                    className="absolute top-5 left-5 text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>

                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">Reset Password</CardTitle>
                    <CardDescription>
                        {isSent
                            ? "Cek kotak masuk email kamu untuk langkah selanjutnya."
                            : "Masukkan email yang terdaftar untuk menerima link reset password."}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!isSent ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-medium">Email Terdaftar</label>
                                <Input
                                    {...register("email")}
                                    type="email"
                                    placeholder="nama@email.com"
                                    className={cn(
                                        "bg-zinc-950/40 border-white/10 focus:border-primary/50 transition-all",
                                        errors.email && "border-destructive focus:border-destructive"
                                    )}
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <p className="text-xs text-destructive font-medium">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="mt-2">
                                <Button
                                    type="submit"
                                    className="w-full bg-primary text-background font-bold hover:scale-[1.02] transition-transform"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <SendHorizontal className="mr-2 h-4 w-4" />
                                            Kirim Instruksi
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col gap-4 text-center animate-in fade-in zoom-in duration-300">
                            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                                <SendHorizontal size={32} />
                            </div>
                            <p className="text-sm text-zinc-400">
                                Belum menerima email? Periksa folder spam atau tunggu beberapa menit.
                            </p>
                            {/* ✅ Gunakan resetStatus dari hook, bukan setState lokal */}
                            <Button
                                variant="ghost"
                                onClick={resetStatus}
                                className="text-primary hover:bg-primary/10"
                            >
                                Coba email lain
                            </Button>
                        </div>
                    )}

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Ingat password kamu?{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Kembali ke Login
                        </Link>
                    </p>
                </CardContent>
            </Card>

            <div className="absolute -z-10 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
    );
}