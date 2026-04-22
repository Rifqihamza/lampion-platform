import { LoginForm } from "@/app/(auth)/login/_components/login-form";

export default function Page() {
  return (
    <main className="w-full h-dvh relative">
      <LoginForm className="w-full max-w-md flex items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-4" />
    </main>
  );
}