export const authConfig = {
    session:
    {
        strategy: 'jwt',
        maxAge: Number(process.env.NEXTAUTH_SESSION_AGE)
    },
    providers: [],
}