"use server";
import { createClient } from "@/utils/supabase/server";

const getAllRsvps = async () => {
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
        name: d.guest_name,
        last_edit: d.last_edit,
    }));

    return { rsvpData: rsvpMap, noRsvpData: guests };
};

export default getAllRsvps;
