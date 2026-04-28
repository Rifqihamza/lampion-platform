import NextAuth, { type DefaultSession, type User, } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { env } from "./env";

// 1. Perluas interface User agar menyertakan emailVerified
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
        ...(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET ? [
            Google({
                clientId: env.AUTH_GOOGLE_ID,
                clientSecret: env.AUTH_GOOGLE_SECRET,
                async profile(profile) {
                    return {
                        id: profile.sub,
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                        emailVerified: new Date(),
                    }
                }
            })
        ] : []),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.password) {
                    throw new Error("USER_NOT_FOUND");
                }

                // Di development bypass email verification
                if (env.NODE_ENV === 'production' && !user.emailVerified) {
                    throw new Error("EMAIL_NOT_VERIFIED");
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isValid) {
                    throw new Error("INVALID_PASSWORD");
                }

                // Return object yang sesuai dengan interface User yang sudah di-extend
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    emailVerified: user.emailVerified,
                };
            },
        }),
    ],
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
    secret: env.NEXTAUTH_SECRET,
    trustHost: true,
    callbacks: {
        async jwt({ token, user }) {
            // User hanya tersedia saat login pertama kali (sign in)
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