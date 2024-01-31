export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        // jwt token gets updated with id and isAdmin from user after logging in
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            };
            return token;
        },
        async session({ session, token }) {
            // session is updated thru jwt token
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            };
            return session;

        },
        authorized({ auth, request }) {
            const user = auth?.user;

            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

            // ONLY ADMIN CAN REACH ADMIN PANEL
            if(isOnAdminPanel && !user?.isAdmin) {
                return false;
            };

            // ONLY AUTHENTICATED USERS CAN REACH BLOG
            if(isOnBlogPage && !user) {
                return false;
            };

            // ONLY UNAUTHENTICATED USERS CAN REACH LOGIN 
            if (user && isOnLoginPage) {
                return Response.redirect(new URL("/", request.nextUrl));
            };

            return true;
        }
    }
}