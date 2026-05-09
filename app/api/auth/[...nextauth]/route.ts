import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import sql from '@/lib/db'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        try {

          await sql`INSERT INTO users(email) VALUES (${user.email}) ON CONFLICT (email) DO NOTHING`
          return true

        } catch (error) {
          console.error(error)
          throw new Error("Something Went Wrong")
        }
      }
      return false
    }
  }
})

export { handler as GET, handler as POST }
