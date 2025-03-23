import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            authorize: async (credentials) => {
                try {
                    const user = await prisma.users.findUnique({ where: { email: credentials.email } });


                    if (!user) {
                        return null;
                    }

                    const isValidPass = bcrypt.compare(credentials.password, user.password);

                    if (!isValidPass) {
                        return null;
                    }

                    return { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin, isBanned: user.isBanned, isVerified: user.isVerified };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user = token.user;
            }
            return session;
        },
    },
});
