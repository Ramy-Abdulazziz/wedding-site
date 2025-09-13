"use server"; 
import { createClient } from "@/utils/supabase/server";

const getAllRsvps = async () => {
    const supabase = await createClient();
    const { data: rsvps, error: rsvpError } = await supabase
        .from("rsvps")
        .select("guest_id, attending, last_edit, guests(name)");

    if (rsvpError) {
        console.error("Error getting rsvp data");
        return null;
    }

    return rsvps.map((d) => ({
        id: d.id,
        attending: d.attending,
        name: d.guests?.name,
        last_edit: d.last_edit,
    }));
};

export default getAllRsvps;
