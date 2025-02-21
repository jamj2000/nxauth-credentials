import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import { getUserById, getUserByEmail } from "@/lib/data";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma"



const credentialsConfig = {
    // LOGIN ACTION -> AUTHORIZE -> JWT -> SESSION
    async authorize(credentials) {
        const user = await getUserByEmail(credentials.email)
        return user  
    },
}


export const options = {
    providers: [
        Credentials(credentialsConfig),
    ],
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error'
    },
    callbacks: {
        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await getUserById(token.sub)
            if (!user) return token;

            token.role = user?.role
            return token
        },

        async session({ session, token }) {
            session.user.id = token?.sub
            session.user.role = token?.role
            return session
        }
    }
}


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth( options )




