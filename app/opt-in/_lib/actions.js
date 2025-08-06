"use server";
import { sleep } from "@/utils/sleep";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { success } from "zod";

const handleConsentFormSubmit = async (data) => {
    console.log(data);
    sleep(2);

    return { success: true };
};

export default handleConsentFormSubmit;
