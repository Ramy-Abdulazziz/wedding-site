import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import DetailsContent from "@/components/DetailsContent";
import { sleep } from "@/utils/sleep";

export default async function Details() {
    await sleep(5000);

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        console.log("redirect 3");
        redirect("/");
    }
    return <DetailsContent />;
}
