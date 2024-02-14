import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
}

const handler = NextAuth ({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        })
    ],
    callbacks: {
        session: async function ({session, token}) {
            console.log("Session is loaded")
            if (token.accessToken) {
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
    }
})

export { handler as GET, handler as POST }