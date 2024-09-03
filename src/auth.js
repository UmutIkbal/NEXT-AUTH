import User from "@/models/user";
import { connectDB } from "@/utils/database";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { authConfig } from "@/auth.config"
require("dotenv")

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} =
    NextAuth({
        pages: {
            signIn: "/login"
        },
        secret: process.env.NEXTAUTH_SECRET,
        ...authConfig,
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),

            CredentialsProvider({
                credentials:
                {
                    email: {},
                    password: {}
                },
                async authorize(credentials) {
                    await connectDB()

                    const user = await User.findOne({ email: credentials.email })
                    console.log("im cred:", credentials)

                    if (credentials === null) { return null }

                    try {
                        if (user) {
                            const isMatch =
                                await bcrypt.compare(credentials.password, user.password)

                            if (isMatch) {
                                return user;
                            } else {
                                throw new Error("Email or Password is not correct");
                            }
                        } else {
                            throw new Error("User not found");
                        }
                    } catch (error) {
                        throw new Error(error);
                    }
                },
            })
        ],
        callbacks: {
            jwt: async ({ token, account, user }) => {
                console.log("jwt token in callback is:", { token, account, user })
                if (user) {
                    return {
                        ...token,
                        id: user.id,
                    }
                }
                return token
            },
            session: async ({ session, token }) => {
                console.log("session callback", { session, token })
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.id
                    }
                }
            }
        }
    })
