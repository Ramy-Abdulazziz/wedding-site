"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const emailSchema = z.email();

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

const updateGuestEmail = async (email) => {
    const parseResult = emailSchema.safeParse(email);
    if (!parseResult.success) {
        return { error: "❌ Invalid email format." };
    }

    const sanitizedEmail = parseResult.data.trim().toLowerCase();
    const supabase = await createClient();
    const authedUser = await getCurrentUser();
    const { error } = await supabase.rpc("update_user_email", {
        user_id: authedUser.id,
        new_email: sanitizedEmail,
    });

    if (error) {
        console.error(error);
        return { error: "Unable to update email. Please try again" };
    }

    return { success: true };
};

export { updateGuestEmail, getCurrentUser };
