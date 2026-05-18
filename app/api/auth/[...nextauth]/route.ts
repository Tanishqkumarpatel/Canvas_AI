import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import sql from '@/lib/db'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (credentials?.email === 'demo@canvasai.com' && credentials?.password === 'demo123') {
          return { id: '1', email: 'demo@canvasai.com', name: 'Demo user' }
        }
        return null
      }
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
