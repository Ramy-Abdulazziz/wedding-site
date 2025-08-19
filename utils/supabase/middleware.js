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
        error: userError,
    } = await supabase.auth.getUser();

    console.log("user", user);
    const pathname = request.nextUrl.pathname;
    if (!user || userError) {
        if (pathname !== authConfig.unAuthedHomeRoute) {
            const url = request.nextUrl.clone();
            url.pathname = authConfig.unAuthedHomeRoute;
            return NextResponse.redirect(url);
        }

        return supabaseResponse;
    }

    const { data: guest, error: guestError } = await supabase
        .from("guests")
        .select("id, email")
        .eq("id", user.id)
        .single();

    console.log("guest", guest);

    const verifiedUser = user && guest && !guestError && !userError;

    if (!verifiedUser) {
        console.log("unauthed");
        if (pathname !== authConfig.unAuthedHomeRoute) {
            const url = request.nextUrl.clone();
            url.pathname = authConfig.unAuthedHomeRoute;
            return NextResponse.redirect(url);
        }
        return supabaseResponse;
    }

    if (authConfig.unAuthedHomeRoute === pathname) {
        const url = request.nextUrl.clone();
        url.pathname = authConfig.authedHomeRoute;
        return NextResponse.redirect(url);
    }

    const userHasEmail =
        user.email !== null &&
        guest.email !== null &&
        user.email === guest.email &&
        !user.email.includes(authConfig.noEmailPlaceHolder) &&
        !guest.email.includes(authConfig.noEmailPlaceHolder);

    console.log(userHasEmail);
    if (authConfig.emailOnlyRoutes.includes(pathname)) {
        if (!userHasEmail) {
            const url = request.nextUrl.clone();
            url.pathname = authConfig.noEmailUpdateRoute;
            return NextResponse.redirect(url);
        }
    }

    if (authConfig.noEmailUpdateRoute === pathname) {
        if (userHasEmail) {
            const url = request.nextUrl.clone();
            url.pathname = '/rsvp';
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
