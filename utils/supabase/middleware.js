import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

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

    if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    const { data: guest } = await supabase
        .from("guests")
        .select("id")
        .eq("id", user.id)
        .single();

    const verifiedUser = user && guest;
    if (!verifiedUser) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    const pathname = request.nextUrl.pathname;
    if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = "/details";
        return NextResponse.redirect(url);
    } else if (pathname === "/rsvp/thanks") {
        const rsvpCookie = await request.cookies.get("rsvp_submitted");
        if (!rsvpCookie || rsvpCookie.value !== "true") {
            const url = request.nextUrl.clone();
            url.pathname = "/rsvp";
            return NextResponse.redirect(url);
        }

        const response = NextResponse.next();
        response.cookies.delete("rsvp_submitted");
        return response;
    }

    return supabaseResponse;
}
