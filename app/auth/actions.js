"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as ccs } from "@supabase/supabase-js";
import { Resend } from "resend";
import { MagicLinkEmail } from "@/emails/magicLinkEmail";
import { z } from "zod";

const emailSchema = z.email();

export async function sendMagicLink(email) {
    const parseResult = emailSchema.safeParse(email);
    if (!parseResult.success) {
        return { error: "❌ Invalid email format." };
    }

    const sanitizedEmail = parseResult.data.trim().toLowerCase();

    const supabase = await createClient();
    const { data: guests, error: guestError } = await supabase.rpc(
        "find_guest_by_email",
        { guest_email: sanitizedEmail }
    );

    if (guestError || !guests || guests.length === 0) {
        console.log(guestError);
        return { success: true };
    }

    const supabaseAdmin = ccs(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );

    const { data: linkData, error: linkError } =
        await supabaseAdmin.auth.admin.generateLink({
            type: "magiclink",
            email: sanitizedEmail,
        });
    console.log(linkData);

    if (linkError) {
        console.error("Error generating magic link:", linkError);
        return { error: "❌ Failed to create magic link. Please try again." };
    }
    const { hashed_token, verification_type } = linkData.properties;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const verificationUrl = new URL("/auth/confirm", siteUrl);
    verificationUrl.searchParams.set("token_hash", hashed_token);
    verificationUrl.searchParams.set("type", verification_type);
    verificationUrl.searchParams.set("next", "/details");

    const magicLink = verificationUrl.toString();
    console.log(magicLink);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const name = guests[0].name;
    const { data, error: sendError } = await resend.emails.send({
        from: "Ramy and Shazia <noreply@notifications.ramyandshazia.com>",
        to: sanitizedEmail,
        subject: "Your Invitation to Ramy & Shazia's Wedding",
        react: <MagicLinkEmail magicLink={magicLink} name={name} />,
    });

    if (sendError) {
        console.error("error sending email ", sendError);
        return { error: "❌ Failed to create magic link. Please try again." };
    }

    return { success: true };
}
