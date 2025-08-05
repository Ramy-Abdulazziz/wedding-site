import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";
import { redirect } from "next/dist/server/api-utils";

export async function updateSession(request) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: guest } = await supabase
        .from("guests")
        .select("id")
        .eq("id", user.id)
        .single();

    const verifiedUser = user && guest;
    const pathname = request.nextUrl.pathname;
    if (!verifiedUser && pathname !== authConfig.unAuthedHomeRoute) {
        const url = request.nextUrl.clone();
        url.pathname = authConfig.unAuthedHomeRoute;
        return NextResponse.redirect(url);
    } else if (!verifiedUser && pathname === authConfig.unAuthedHomeRoute) {
        return supabaseResponse;
    }

    if (authConfig.unAuthedHomeRoute === pathname) {
        const url = request.nextUrl.clone();
        url.pathname = authConfig.authedHomeRoute;
        return NextResponse.redirect(url);
    } else if (authConfig.ticketedRoute.includes(pathname)) {
        const ticketName = pathname.split("/")[1];
        const ticket = await request.cookies.get(`${ticketName}_submitted`);
        if (!ticket || ticket.value !== "true") {
            const url = request.nextUrl.clone();
            url.pathname = `/${ticketName}`;
            return NextResponse.redirect(url);
        }

        const response = NextResponse.next();
        response.cookies.delete(`${ticketName}_submitted`);
        return response;
    }

    return supabaseResponse;
}
