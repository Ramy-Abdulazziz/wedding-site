import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getFriendlyErrorCode } from "@/utils/authErrorCodes";
import { authConfig } from "@/auth.config";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const next = searchParams.get("next") ?? "/";

    console.log(token_hash);
    console.log(type);
    console.log(next);
    if (token_hash && type) {
        const cookieStore = await cookies();
        const supabase = await createClient(cookieStore);
        const { data: user, error: userError } = await supabase.auth.getUser();

        console.log("user", user);
        if (user && !userError) {
            return redirect(authConfig.authedHomeRoute);
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
            return redirect(`${next}`);
        } else {
            console.error("error authenticating magic link ", error);
            const message = encodeURIComponent(
                getFriendlyErrorCode(error.message)
            );
            return redirect(`/auth/error?code=${message}`);
        }
    }

    // redirect the user to an error page with some instructions
    return redirect(
        `/auth/error?code=${encodeURIComponent(getFriendlyErrorCode("default"))}`
    );
}
