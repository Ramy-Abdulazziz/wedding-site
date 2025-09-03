import twilio from "twilio";
import { createClient } from "@/utils/supabase/server";
import parsePhoneNumber from "libphonenumber-js";

export async function POST(req) {
    const rawBody = await req.text();
    const params = new URLSearchParams(rawBody);
    const from = params.get("From");
    const body = params.get("Body");

    const phoneNumberFrom = parsePhoneNumber(from, "US");

    const supabase = await createClient();
    const { data: guests, error: noPhoneError } = await supabase.rpc(
        "find_guest_by_phone",
        { guest_phone: phoneNumberFrom.nationalNumber }
    );

    if (noPhoneError || !guests || guests.length === 0) {
        return new Response("number not found", { status: 200 });
    }
    const guest = guests[0];
    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
        body: `You received a text from ${guest.name} from number ${phoneNumberFrom.formatNational()}:
        
${body}
        `,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.VOICE_NUMBER,
    });

    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(
        "We have received your message, we will follow up with you shortly."
    );

    return new Response(twiml.toString(), {
        status: 200,
        headers: { "Content-Type": "text/xml" },
    });
}
