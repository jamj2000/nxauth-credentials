import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/data";
// import prisma from "@/lib/prisma";  // MAL: No admitido en Vercel Edge

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
                // MAL: No admitido en Vercel Edge
                // const user = await prisma.user.findUnique({
                //   where: {
                //     email: credentials.email,
                //   },
                // });
                const user = await getUserByEmail(credentials.email)

                if (user) // && user.emailVerified
                {  
                    const matchPassword = bcrypt.compare(credentials.password, user?.password)
                    if (matchPassword) return user
                } else {
                    return null
                }

            },
        }),
    ]
}
