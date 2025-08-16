"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as ccs } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

const getGuestByPhone = async (phone) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("phone", phone)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Failed to find guest by phone", error);
    }

    return data;
};

const updateGuestEmail = async (email) => {
    const supabase = await createClient();
    const authedUser = await getCurrentUser();
    const { error } = await supabase.rpc("update_user_email", {
        user_id: authedUser.id,
        new_email: email,
    });

    if (error) {
        console.error(error);
        return { error: "Unable to update email. Please try again" };
    }

    return { success: true };
};

export { updateGuestEmail, getCurrentUser };
