"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const getCurrentUser = async () => {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (!user || error) {
        throw new Error("Not authenticated");
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
        const guest = await getGuestByEmail(user.email);
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
        return { error: err.message };
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

    return { sucess: true };
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
};
