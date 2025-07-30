import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

const env = process.argv[2] || "local";

dotenv.config({ path: `.env.${env}` });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Service Role Key is missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const syncGuestsToAuth = async () => {
    const { data: guests, error: fetchError } = await supabase
        .from("guests")
        .select("id, email, phone, name");

        console.log(guests); 
    if (fetchError) {
        console.error("failed to fetch guests", fetchError);
        return;
    }
    for (const guest of guests) {
        if (!guest.email) {
            continue;
        }

        try {
            const { data, error } = await supabase.auth.admin.createUser({
                id: guest.id,
                email: guest.email,
                phone: guest.phone,
                email_confirm: true,
                user_metadata: {
                    name: guest.name,
                },
            });

            if (error) {
                console.log(
                    `Error creating user ${guest.email}`,
                    error.message
                );
            }
        } catch (err) {
            console.error(
                `unexpected error for guest email ${guest.email}`,
                err
            );
        }
    }
};

syncGuestsToAuth();
