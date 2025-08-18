import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getFriendlyErrorCode } from "@/utils/authErrorCodes";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server"; // 👈 Change this import

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const next = searchParams.get("next") ?? "/";
    const requestUrl = new URL(request.url);
    const pathname = request.nextUrl.pathname;

    console.log("requestUrl", requestUrl);
    console.log(token_hash);
    console.log(type);
    console.log(next);

    if (token_hash && type) {
        const cookieStore = await cookies();
        const supabase = await createClient(cookieStore);
        const { data: user, error: userError } = await supabase.auth.getUser();

        console.log("user", user);
        if (user && !userError) {
            const url = request.nextUrl.clone();
            url.pathname = authConfig.authedHomeRoute;
            return NextResponse.redirect(url);
        }

        const { data, error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });
        console.log("data", data);
        console.log("error", error);
        if (!error) {
            // redirect user to specified redirect URL or root of app
            console.log("redirecting to ", next);
            const url = request.nextUrl.clone();
            url.pathname = next;
            return NextResponse.redirect(url);
        } else {
            console.error("error authenticating magic link ", error);
            const message = encodeURIComponent(
                getFriendlyErrorCode(error.message)
            );
            const url = request.nextUrl.clone();
            url.pathname = `/auth/error?code=${message}`;
            return NextResponse.redirect(url);
        }
    }

    // redirect the user to an error page with some instructions
    const url = request.nextUrl.clone();
    url.pathname = `/auth/error?code=${encodeURIComponent(getFriendlyErrorCode("default"))}`;
    return NextResponse.redirect(url);
}
