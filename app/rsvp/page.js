import RsvpContent from "@/components/RsvpContent";
import { createClient } from "@/utils/supabase/server";

export default async function Rsvp() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect("/");
    }

    return <RsvpContent />;
}
