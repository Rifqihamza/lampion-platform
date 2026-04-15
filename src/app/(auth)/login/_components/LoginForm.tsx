"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/dashboard",
        });
    };

    return (
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
            <h1 className="text-2xl font-bold text-yellow-400 mb-6">
                Login Lampion
            </h1>

            <input
                className="w-full mb-3 p-2 bg-black border border-white/10"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                className="w-full mb-3 p-2 bg-black border border-white/10"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleLogin}
                className="w-full bg-yellow-500 p-2 rounded-lg"
            >
                Login
            </button>

            <div className="my-4 text-center text-gray-400">OR</div>

            <button
                onClick={() => signIn("google")}
                className="w-full bg-white text-black p-2 rounded-lg"
            >
                Continue with Google
            </button>
        </div>
    );
}