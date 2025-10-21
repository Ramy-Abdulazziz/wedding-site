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
