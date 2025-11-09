"use server";
import { createClient } from "@/utils/supabase/server";

export const getAllRsvps = async () => {
    const supabase = await createClient();
    const { data: rsvps, error: rsvpError } = await supabase.rpc("get_rsvps");

    if (rsvpError) {
        console.error("Error getting rsvp data");
        return null;
    }

    const { data: guests, error: fetchError } = await supabase.rpc(
        "get_unrsvped_guests"
    );

    if (fetchError) {
        console.error("Error getting non rsvp guests");
    }

    const rsvpMap = rsvps.map((d) => ({
        id: d.guest_id,
        attending: d.attending,
        responded: true,
        name: d.guest_name,
        last_edit: d.last_edit,
        group_id: d.group_id,
    }));

    const now = new Date();

    const noRsvpmap = guests.map((d) => ({
        id: d.id,
        attending: false,
        responded: false,
        name: d.name,
        group_id: d.group_id,
        last_edit: now.toISOString(),
    }));

    return { rsvpData: rsvpMap, noRsvpData: noRsvpmap };
};

export const adminUpdateGuestRsvp = async (
    guestId,
    attendingStatus,
    groupId
) => {
    const supabase = await createClient();
    const { error } = await supabase.rpc("admin_update_rsvp", {
        update_id: guestId,
        update_group_id: groupId,
        attending_status: attendingStatus,
    });

    if (error) {
        console.error("Unable to update guest rsvp from admin console", error);
        return {
            error: "Unable to update guest rsvp from admin console - try again",
        };
    }

    return { success: true };
};

const adminSendUserLogin = async (userId) => {
    const supabase = await createClient();
    const { data: userData, error } =
        await supabase.auth.admin.getUserById(userId);

    const logInEmail = userData.user.email.trim();
    const { data: linkData, error: linkError } =
        await supabaseAdmin.auth.admin.generateLink({
            type: "magiclink",
            email: logInEmail,
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
};

const sendBatch = async (batch) => {
    const supabase = await createClient();
    const { data: userData, error } =
        await supabase.auth.admin.getUserById(userId);

    const logInEmail = userData.user.email.trim();
    const { data: linkData, error: linkError } =
        await supabaseAdmin.auth.admin.generateLink({
            type: "magiclink",
            email: logInEmail,
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
};

const randomReminderMessage = ({ guestName, link }) => {
    const variants = [
        `Hi ${guestName}! 🎉 You're invited to Ramy & Shazia's wedding — view details & RSVP here:\r\r\n${link}`,

        `Hey ${guestName}! Ramy & Shazia can't wait to celebrate with you ❤️ RSVP & event info:\r\r\n${link}`,

        `${guestName}, you're invited! 🎊 View the wedding details & RSVP below:\r\r\n${link}`,

        `Ramy & Shazia's wedding 🎉 Don't miss it! RSVP link:\r\r\n${link}`,

        `It's official 🎊 Ramy & Shazia are getting married! Tap to RSVP:\r\r\n${link}`,
    ];

    const randomIndex = Math.floor(Math.random() * variants.length);
    return variants[randomIndex];
};

const adminBatchSend = async (userIds) => {
    const supabase = await supabase.createClient();

    const { guestData, error } = await supabase
        .from("guests")
        .select("*")
        .neq("is_plus_one", true);

    const guestQueue = [];
    for (let guest of guestData) {
        guestQueue.push(guest.id);
    }

    while (guestQueue.length > 0) {
        const sendQueue = guestQueue.slice(0, 5);
        setTimeout(() => sendBatch(sendQueue), Math.random() * 10 + 5);
    }
};
