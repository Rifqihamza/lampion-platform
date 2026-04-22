"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validators/auth";
import { useLogin } from "@/hooks/useLogin";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <div className={cn("flex flex-col justify-center gap-4", className)} {...props}>
      <Card className="w-full relative rounded-xl bg-card/50 backdrop-blur-xl py-6 px-4">
        <Link
          href="/"
          className="absolute top-5 left-5 text-muted-foreground hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight leading-tight">Sign In to <br /> Lampion Platform</CardTitle>
          <CardDescription>
            Pilih cara masuk untuk melanjutkan belajar
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="nama@email.com"
                className={errors.email ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">Lupa password?</Link>
              </div>
              <Input
                {...register("password")}
                type="password"
                autoComplete="none"
                className={errors.password ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <div className="mt-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Masuk dengan Email"}
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
            Masuk dengan Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Belum punya akun?{" "}
            <Link href="/register" className="text-primary hover:underline">Daftar sekarang</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}