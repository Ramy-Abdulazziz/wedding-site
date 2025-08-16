"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as ccs } from "@supabase/supabase-js";
import { Resend } from "resend";
import { MagicLinkEmail } from "@/emails/magicLinkEmail";
import { z } from "zod";
import twilio from "twilio";
import { authConfig } from "@/auth.config";
import parsePhoneNumber from "libphonenumber-js";

const emailSchema = z.email();

const sendMagicLinkEmail = async (email) => {
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
        return { error: "❌ Failed to send magic link. Please try again." };
    }

    return { success: true };
};

const sendMagicLinkTextNoEmail = async (phone) => {
    const sanitizedPhone = phone.trim();
    const phoneNumber = parsePhoneNumber(sanitizedPhone, "US");
    if (!phoneNumber.isValid()) {
        console.error("Invalid phone number format");
        return { error: "❌ Phone number is not valid. Please try again" };
    }
    const supabase = await createClient();
    const { data: guests, error: guestError } = await supabase.rpc(
        "find_guest_by_phone",
        { guest_phone: sanitizedPhone }
    );

    if (guestError || !guests || guests.length === 0) {
        return { success: true };
    }

    const guest = guests[0];
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

    let userEmail;
    if (
        guest.email !== null &&
        !guest.email.includes(authConfig.noEmailPlaceHolder)
    ) {
        userEmail = `${sanitizedPhone}@guest.ramyandshazia.com`;
    } else {
        userEmail = guest.email;
    }

    const { data: linkData, error: linkError } =
        await supabaseAdmin.auth.admin.generateLink({
            type: "magiclink",
            email: userEmail,
        });

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
    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    try {
        await client.messages.create({
            body: `You're invited to Ramy and Shazia's wedding 🎉! Click the link below for details, to RSVP, and more: ${magicLink}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber.formatInternational(),
        });
    } catch (textError) {
        console.error("Error sending text", textError);
        return {
            error: "❌ Failed to send magic link via text. Please try again.",
        };
    }

    return { success: true };
};

export { sendMagicLinkEmail, sendMagicLinkTextNoEmail };
