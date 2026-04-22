"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";

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

import { useRegister } from "@/hooks/useRegister";
import { RegisterInput, registerSchema } from "@/lib/validators/auth";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register: submitAction, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    await submitAction(data);
  };

  return (
    <>
      <div className={cn("flex flex-col justify-center gap-4", className)} {...props}>
        <Card className="w-full relative rounded-xl bg-card/50 backdrop-blur-xl py-6 px-4">
          <Link
            href="/"
            className="absolute top-5 left-5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>

          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Create New Account</CardTitle>
            <CardDescription>
              Daftar untuk mulai belajar di Lampion Platform
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Field Nama */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Nama Lengkap</label>
                <Input
                  {...register("name")}
                  placeholder="John Doe"
                  className={cn(errors.name ? "border-destructive" : "bg-zinc-950/20")}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm font-medium text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Field Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="nama@email.com"
                  className={cn(errors.email ? "border-destructive" : "bg-primary/10")}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className={cn(errors.password ? "border-destructive" : "bg-primary/10")}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Konfirmasi</label>
                  <Input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="••••••••"
                    className={cn(errors.confirmPassword ? "border-destructive" : "bg-primary/10")}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {errors.password && (
                <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
              )}
              {errors.confirmPassword && (
                <p className="text-sm font-medium text-destructive">{errors.confirmPassword.message}</p>
              )}

              <div className="mt-3">
                <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Daftar dengan Email"}
                </Button>
              </div>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-muted-foreground">atau</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              size="lg"
              disabled={isLoading}
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
              </svg>
              Daftar dengan Google
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Masuk di sini
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}