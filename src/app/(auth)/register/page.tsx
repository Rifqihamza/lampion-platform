import { SignupForm } from "./_components/signup-form";

export default function Page() {
  return (
    <main className="w-full h-dvh relative">
      <SignupForm className="w-full max-w-md flex items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
    </main>
  );
}