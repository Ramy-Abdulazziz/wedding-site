"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { RsvpConfEmail } from "@/emails/rsvpConfEmail";
import { authConfig } from "@/auth.config";

const getCurrentUser = async () => {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (!user || error) {
        redirect(authConfig.unAuthedHomeRoute);
    }

    return user;
};

const getGuestByEmail = async (email) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("email", email)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Failed to find guest by email", error);
    }

    return data;
};

const getGuestById = async (id) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Failed to find guest by id, ", error);
    }

    return data;
};

const getGroupMembersGuests = async (groupId, userId) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("group_id", groupId)
        .eq("is_plus_one", false);
    if (error) {
        console.error(error);
        throw new Error("Failed to get group members", error);
    }

    return data;
};

const getGroupMembersPlusOnes = async (groupId) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("group_id", groupId)
        .eq("is_plus_one", true);

    if (error) {
        console.error(error);
        throw new Error("Failed to get group members", error);
    }

    return data;
};

const getRsvpsForGroup = async (groupId) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .eq("group_id", groupId);

    if (error) {
        console.error(error);
        throw new Error("Failed to get group members", error);
    }

    return data;
};

const getGroupInfo = async (groupId) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("id", groupId)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Unable to locate group info");
    }

    return data;
};

const loadRsvpData = async () => {
    try {
        const user = await getCurrentUser();
        const guest = await getGuestById(user.id);
        const groupGuests = await getGroupMembersGuests(
            guest.group_id,
            user.id
        );
        const groupPlusOnes = await getGroupMembersPlusOnes(guest.group_id);
        const rsvps = await getRsvpsForGroup(guest.group_id);
        const groupInfo = await getGroupInfo(guest.group_id);
        return {
            guest: guest,
            guests: groupGuests,
            plusOnes: groupPlusOnes,
            rsvps: rsvps,
            group: groupInfo,
        };
    } catch (err) {
        console.error("Error loading rsvp data", err);
        redirect(authConfig.unAuthedHomeRoute);
    }
};

const updateRsvpGuests = async (rsvpInfo, plusOnesRsvpInfo) => {
    const supabase = await createClient();
    const guestsToUpdate = rsvpInfo.map((guest) => ({
        guest_id: guest.guest_id,
        attending: guest.attending,
        last_edit: new Date().toISOString(),
        group_id: guest.group_id,
    }));

    const { data, error } = await supabase
        .from("rsvps")
        .upsert(guestsToUpdate, { onConflict: "guest_id" })
        .select();

    if (error) {
        console.error(error);
        return { error: "Unable to update RSVP info. Please try Again" };
    }

    return { sucess: true };
};

const updateRsvps = async (namedGuests, plusOnes, groupId) => {
    const supabase = await createClient();
    const { error } = await supabase.rpc("submit_full_rsvp", {
        named_guests_data: namedGuests,
        plus_ones_data: plusOnes,
        p_group_id: groupId,
    });

    if (error) {
        console.error(error);
        return { error: "Unable to update RSVP info. Please try Again" };
    }

    await (
        await cookies()
    ).set("rsvp_submitted", "true", {
        path: "/",
        httpOnly: true, // More secure, client-side JS can't access it
        maxAge: 120, // Expires after 60 seconds
    });

    return { sucess: true };
};

const sendRsvpConfEmail = async (namedGuests, plusOnes, guestName, email) => {
    const sanitizedEmail = email.trim().toLowerCase();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error: sendError } = await resend.emails.send({
        from: "Ramy and Shazia <noreply@notifications.ramyandshazia.com>",
        to: sanitizedEmail,
        subject: "Your RSVP confirmation email",
        react: (
            <RsvpConfEmail
                namedGuests={namedGuests}
                plusOneGuests={plusOnes}
                name={guestName}
            />
        ),
    });

    if (sendError) {
        console.error("error sending email ", sendError);
        return {
            error: "❌ Failed to send confirmation email. Your responses were still recorded.",
        };
    }

    return { succes: true };
};

const submitRsvpAndSendEmail = async (namedGuests, plusOnes, guestInfo) => {
    const supabase = await createClient();

    const { error: dbError } = await supabase.rpc("submit_full_rsvp", {
        named_guests_data: namedGuests,
        plus_ones_data: plusOnes,
        p_group_id: guestInfo.groupId,
    });

    if (dbError) {
        console.error("Database Error:", dbError);
        return { error: "Unable to update RSVP info. Please try again." };
    }
    (await cookies()).set("rsvp_submitted", "true", {
        path: "/",
        httpOnly: true, // More secure, client-side JS can't access it
        maxAge: 120, // Expires after 60 seconds
    });
    const sanitizedEmail = guestInfo.email.trim().toLowerCase();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error: sendError } = await resend.emails.send({
        from: "Ramy and Shazia <noreply@notifications.ramyandshazia.com>",
        to: sanitizedEmail,
        subject: "Your RSVP confirmation email",
        react: (
            <RsvpConfEmail
                namedGuests={namedGuests}
                plusOneGuests={plusOnes}
                name={guestInfo.name}
            />
        ),
    });

    if (sendError) {
        console.error("error sending email ", sendError);
        return {
            success: true,
            error: "❌ Failed to send confirmation email. Your responses were still recorded.",
        };
    }

    return { success: true, error: null };
};

const cancelRsvp = () => {
    redirect("/details");
};

export {
    getCurrentUser,
    getGuestByEmail,
    getGroupMembersGuests,
    getGroupMembersPlusOnes,
    getRsvpsForGroup,
    loadRsvpData,
    cancelRsvp,
    updateRsvpGuests,
    getGroupInfo,
    updateRsvps,
    sendRsvpConfEmail,
    submitRsvpAndSendEmail,
    getGuestById,
};
