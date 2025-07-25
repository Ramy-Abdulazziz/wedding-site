"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendMagicLink(email) {
    const supabase = await createClient();
    const { data: guests, error: guestError } = await supabase.rpc(
        "find_guest_by_email",
        { guest_email: email }
    );

    if (guestError || !guests || guests.length === 0) {
        console.log(guestError);
        return { success: true };
    }

    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?next=/details`,
        },
    });

    if (error) {
        console.log(error);
        return { error: "❌ Failed to send magic link. Try again." };
    }

    return { success: true };
}
