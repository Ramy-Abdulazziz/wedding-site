import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    console.log(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const next = searchParams.get("next") ?? "/";

    if (token_hash && type) {
        const cookieStore = cookies();

        const supabase = await createClient(cookieStore);

        const { data, error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });

        if (!error) {
            // redirect user to specified redirect URL or root of app
            redirect("/details");
        }
    }

    // redirect the user to an error page with some instructions
    redirect("/error");
}
