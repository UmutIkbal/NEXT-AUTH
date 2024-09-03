import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

import { PUBLIC_ROUTES, LOGIN, PROTECTED_SUB_ROUTES, ROOT } from "@/lib/routes";

export async function middleware(request) {
    const { nextUrl } = request;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log("is auth:", isAuthenticated, "   url:", nextUrl.pathname, "nexturl:", nextUrl);

    const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
        || nextUrl.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));

    console.log("is pub:", isPublicRoute);

    if (!isAuthenticated && !isPublicRoute)
        return Response.redirect(new URL(LOGIN, nextUrl));
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};