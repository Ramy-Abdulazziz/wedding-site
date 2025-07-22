import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(req) {
    let supabaseResponse = NextResponse.next({
        req,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        req.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        req,
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
        data: { session },
    } = await supabase.auth.getUser();

    const pathname = req.nextUrl.pathname;

    // Allow homepage through
    if (pathname === "/") return res;

    // If not logged in, redirect to home
    if (!session) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    // Check if user is in guests table
    const { data: guest } = await supabase
        .from("guests")
        .select("id")
        .eq("id", session.user.id)
        .single();

    if (!guest) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
