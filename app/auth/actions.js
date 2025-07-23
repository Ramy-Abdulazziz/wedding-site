"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendMagicLink(email) {
    const supabase = await createClient();
    console.log(email);
    // Optional: check if the email exists in your guest list
    //   const { data: guests, error: guestError } = await supabase
    //     .from('guests')
    //     .select('email')
    //     .eq('email', email)
    //     .maybeSingle()

    //   if (guestError || !guests) {
    //     return { error: '❌ Email not found on the guest list.' }
    //   }

    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            // This must match your Supabase project's redirect URL
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?next=/details`,
        },
    });

    if (error) {
        console.log(error);
        return { error: "❌ Failed to send magic link. Try again." };
    }

    return { success: true };
}
