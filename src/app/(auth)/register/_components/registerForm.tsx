"use client";

import { registerUser } from "@/app/actions/register";
import { useTransition } from "react";

export default function RegisterForm() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await registerUser(formData);
            window.location.href = "/login";
        });
    };

    return (
        <form
            action={handleSubmit}
            className="w-full max-w-md bg-white/5 p-8 rounded-2xl border border-white/10"
        >
            <h1 className="text-2xl font-bold text-yellow-400 mb-6">
                Create Account
            </h1>

            <input name="name" placeholder="Name" className="w-full mb-3 p-2 bg-black border border-white/10" />
            <input name="email" placeholder="Email" className="w-full mb-3 p-2 bg-black border border-white/10" />
            <input name="password" type="password" placeholder="Password" className="w-full mb-3 p-2 bg-black border border-white/10" />

            <button
                type="submit"
                className="w-full bg-yellow-500 p-2 rounded-lg"
            >
                {isPending ? "Loading..." : "Register"}
            </button>
        </form>
    );
}