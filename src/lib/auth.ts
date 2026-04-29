import NextAuth, { type DefaultSession, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { compareSync } from "bcryptjs";
import { env } from "./env";

interface GoogleProfile {
    sub: string;
    name: string;
    email: string;
    picture: string;
}

declare module "next-auth" {
    interface User {
        emailVerified?: boolean | Date | null;
    }

    interface Session {
        user: {
            id: string;
            emailVerified?: boolean | Date | null;
        } & DefaultSession["user"];
    }

    interface JWT {
        id?: string;
        emailVerified?: boolean | Date | null;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        ...(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET
            ? [
                Google({
                    clientId: env.AUTH_GOOGLE_ID,
                    clientSecret: env.AUTH_GOOGLE_SECRET,
                    async profile(profile: GoogleProfile) {
                        return {
                            id: profile.sub,
                            name: profile.name,
                            email: profile.email,
                            image: profile.picture,
                            emailVerified: new Date(),
                        };
                    },
                }),
            ]
            : []),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                // ── Debug log (hapus setelah production fix dikonfirmasi) ──
                // console.log("[AUTH] authorize called", {
                //     hasEmail: !!credentials?.email,
                //     hasPassword: !!credentials?.password,
                //     nodeEnv: env.NODE_ENV,
                //     nextauthUrl: env.NEXTAUTH_URL,
                //     hasSecret: !!env.NEXTAUTH_SECRET,
                // });

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                    });

                    if (!user || !user.password) {
                        throw new Error("USER_NOT_FOUND");
                    }

                    // ── Gunakan compareSync — tidak ada bug di Node.js 22+ ──
                    const isValid = compareSync(
                        String(credentials.password),
                        String(user.password)
                    );

                    if (!isValid) {
                        throw new Error("INVALID_PASSWORD");
                    }

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        emailVerified: user.emailVerified,
                    };
                } catch (error) {
                    console.error("[AUTH] authorize error:", error);
                    throw error;
                }
            },
        }),
    ],

    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
    secret: env.NEXTAUTH_SECRET,
    trustHost: true,

    // ── Cookie config disederhanakan — domain dihapus ──
    // Domain dengan leading dot (`.example.com`) sering menyebabkan
    // cookie tidak terbaca di production, terutama di hosting seperti
    // Vercel / Railway / VPS tanpa subdomain khusus.
    cookies: {
        sessionToken: {
            name:
                env.NODE_ENV === "production"
                    ? "__Secure-next-auth.session-token"
                    : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: env.NODE_ENV === "production",
            },
        },
        callbackUrl: {
            name:
                env.NODE_ENV === "production"
                    ? "__Secure-next-auth.callback-url"
                    : "next-auth.callback-url",
            options: {
                sameSite: "lax",
                path: "/",
                secure: env.NODE_ENV === "production",
            },
        },
        csrfToken: {
            name:
                env.NODE_ENV === "production"
                    ? "__Host-next-auth.csrf-token"
                    : "next-auth.csrf-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: env.NODE_ENV === "production",
            },
        },
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.emailVerified = user.emailVerified as Date | null;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                if (token.id) session.user.id = token.id as string;
                session.user.emailVerified = token.emailVerified as Date | null;
            }
            return session;
        },
    },

    pages: {
        signIn: "/login",
        error: "/login",
    },
});