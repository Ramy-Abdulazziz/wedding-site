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
        error: userError,
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;
    if ((!user || userError) && !authConfig.authRoutes.includes(pathname)) {
        if (pathname !== authConfig.unAuthedHomeRoute) {
            const url = request.nextUrl.clone();
            url.pathname = authConfig.unAuthedHomeRoute;
            return NextResponse.redirect(url);
        }

        return supabaseResponse;
    }

    if ((!user || userError) && authConfig.authRoutes.includes(pathname)) {
        return supabaseResponse;
    }

    const { data: guest, error: guestError } = await supabase
        .from("guests")
        .select("id, email, phone, groups(name)")
        .eq("id", user.id)
        .single();

    const verifiedUser = user && guest && !guestError && !userError;
    const isAdmin = guest.groups.name === "Admin";
    if (!verifiedUser) {
        if (pathname !== authConfig.unAuthedHomeRoute) {
            const url = request.nextUrl.clone();
            url.pathname = authConfig.unAuthedHomeRoute;
            return NextResponse.redirect(url);
        }
        return supabaseResponse;
    }

    if (verifiedUser && authConfig.authRoutes.includes(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = authConfig.authedHomeRoute;
        return NextResponse.redirect(url);
    }

    if (authConfig.unAuthedHomeRoute === pathname) {
        const url = request.nextUrl.clone();
        url.pathname = authConfig.authedHomeRoute;
        return NextResponse.redirect(url);
    }

    const userHasEmail =
        guest.email !== null &&
        !guest.email.includes(authConfig.noEmailPlaceHolder);

    const userHasPhone = guest.phone !== null;
    if (authConfig.emailOnlyRoutes.includes(pathname)) {
        if (!userHasEmail || !userHasPhone) {
            const url = request.nextUrl.clone();
            url.pathname = authConfig.profileCompleteRoute;
            return NextResponse.redirect(url);
        }
    }

    if (authConfig.profileCompleteRoute === pathname) {
        if (userHasEmail && userHasPhone) {
            const url = request.nextUrl.clone();
            url.pathname = "/rsvp";
            return NextResponse.redirect(url);
        }
    }

    if (authConfig.ticketedRoute.includes(pathname)) {
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
