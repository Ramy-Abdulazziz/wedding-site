import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import DetailsContent from "@/components/DetailsContent";

export default async function Details() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect("/");
    }
    return <DetailsContent />;
}
