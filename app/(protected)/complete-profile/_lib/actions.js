"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as ccs } from "@supabase/supabase-js";
import { success, z } from "zod";
import parsePhoneNumber from "libphonenumber-js";
import twilio from "twilio";
import { Resend } from "resend";
import { EmailUpdateConfEmail } from "@/emails/emailUpdateConfEmail";
import { authConfig } from "@/auth.config";
import OTPEmail from "@/emails/otpEmail";

const emailSchema = z.email();

const getCurrentUser = async () => {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (!user || error) {
        console.error("Error loading current user data", error);
        return null;
    }

    return user;
};

const updateGuestEmail = async (email, name) => {
    try {
        const parseResult = emailSchema.safeParse(email);
        if (!parseResult.success) {
            return { error: "❌ Invalid email format." };
        }

        const sanitizedEmail = parseResult.data.trim().toLowerCase();
        const supabase = await createClient();
        const authedUser = await getCurrentUser();
        if (!authedUser) {
            return { error: "No auth session" };
        }
        const { data, error } = await supabase
            .from("guests")
            .update({ email: sanitizedEmail })
            .eq("id", authedUser.id);

        if (error) {
            console.error(error);
            return { error: "Unable to update email. Please try again" };
        }

        const confEmail = await sendConfirmationEmail(sanitizedEmail, name);
        if (confEmail?.error) {
            console.warn(
                `Error sendin gconfirmation email for user ${authedUser.id}`,
                confEmail.error
            );
        }

        return { success: true };
    } catch (err) {
        console.error("error updating email", err);
        return { error: "Error updating email" };
    }
};

const updateGuestEmailOTP = async (email) => {
    try {
        const parseResult = emailSchema.safeParse(email);
        if (!parseResult.success) {
            return { error: "❌ Invalid email format." };
        }

        const sanitizedEmail = parseResult.data.trim().toLowerCase();
        const supabase = await createClient();
        const authedUser = await getCurrentUser();
        if (!authedUser) {
            return { error: "No auth session" };
        }
        const { data, error } = await supabase
            .from("guests")
            .update({ email: sanitizedEmail })
            .eq("id", authedUser.id);

        if (error) {
            console.error(error);
            return { error: "Unable to update email. Please try again" };
        }

        return { success: true };
    } catch (err) {
        console.error("error updating email", err);
        return { error: "Error updating email" };
    }
};

const updateGuestPhone = async (phone) => {
    try {
        const sanitizedPhone = phone.trim();
        const phoneNumber = parsePhoneNumber(sanitizedPhone, "US");
        if (!phoneNumber.isValid()) {
            console.error("Invalid phone number format");
            return { error: "❌ Phone number is not valid. Please try again" };
        }

        const supabase = await createClient();
        const authedUser = await getCurrentUser();
        if (!authedUser) {
            return { error: "No auth session" };
        }
        const { data, error } = await supabase
            .from("guests")
            .update({ phone: phoneNumber.nationalNumber })
            .eq("id", authedUser.id);

        if (error) {
            console.error(error);
            return { error: "Unable to update phone number. Please try again" };
        }

        const confText = await sendConfirmationText(
            phoneNumber.formatInternational()
        );

        if (confText?.error) {
            console.warn(
                `Phone number updated but confirmation failed for user ${authedUser.id}`
            );
        }

        return { success: true };
    } catch (err) {
        console.error("Error updating phone", err);
        return { error: "Error updating phone" };
    }
};

const updateGuestPhoneOTP = async (phone) => {
    try {
        const sanitizedPhone = phone.trim();
        const phoneNumber = parsePhoneNumber(sanitizedPhone, "US");
        if (!phoneNumber.isValid()) {
            console.error("Invalid phone number format");
            return { error: "❌ Phone number is not valid. Please try again" };
        }

        const supabase = await createClient();
        const authedUser = await getCurrentUser();
        if (!authedUser) {
            return { error: "No auth session" };
        }
        const { data, error } = await supabase
            .from("guests")
            .update({ phone: phoneNumber.nationalNumber })
            .eq("id", authedUser.id);

        if (error) {
            console.error(error);
            return { error: "Unable to update phone number. Please try again" };
        }

        const confText = await sendConfirmationText(
            phoneNumber.formatInternational()
        );

        if (confText?.error) {
            console.warn(
                `Phone number updated but confirmation failed for user ${authedUser.id}`
            );
        }

        return { success: true };
    } catch (err) {
        console.error("Error updating phone", err);
        return { error: "Error updating phone" };
    }
};

const sendConfirmationText = async (phoneNumberInternational) => {
    const sanitizedPhone = phoneNumberInternational.trim();
    const phoneNumber = parsePhoneNumber(sanitizedPhone, "US");
    if (!phoneNumber.isValid()) {
        console.error("Invalid phone number format");
        return { error: "❌ Phone number is not valid. Please try again" };
    }

    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    try {
        await client.messages.create({
            body: "Your phone number has been successfully updated! We look forward to celebrating with you 🎉!",
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber.formatInternational(),
        });
    } catch (textError) {
        console.error("Error sending text", textError);
        return {
            error: "❌ Failed to text confirmation. Please try again.",
        };
    }

    return { success: true };
};

const sendConfirmationTextOTP = async (phoneNumberInternational, name, otp) => {
    const sanitizedPhone = phoneNumberInternational.trim();
    const phoneNumber = parsePhoneNumber(sanitizedPhone, "US");
    if (!phoneNumber.isValid()) {
        console.error("Invalid phone number format");
        return { error: "❌ Phone number is not valid. Please try again" };
    }

    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    try {
        await client.messages.create({
            body: `Your one time pin is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber.formatInternational(),
        });
    } catch (textError) {
        console.error("Error sending text", textError);
        return {
            error: "❌ Failed to text otp. Please try again.",
        };
    }

    return { success: true };
};

const sendConfirmationEmail = async (email, name) => {
    const parseResult = emailSchema.safeParse(email);
    if (!parseResult.success) {
        console.error("invalid email for user in database");
        return { error: "Invalid email has been saved" };
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error: sendError } = await resend.emails.send({
        from: "Ramy and Shazia <noreply@notifications.ramyandshazia.com>",
        to: email,
        subject: "You've successfully updated your email",
        react: <EmailUpdateConfEmail name={name} />,
    });

    if (sendError) {
        console.error("error sending email ", sendError);
        return {
            error: "❌ Failed to send email confirmation. Please try again.",
        };
    }

    return { success: true };
};

const sendConfirmationEmailOTP = async (email, name, otp) => {
    const parseResult = emailSchema.safeParse(email);
    if (!parseResult.success) {
        console.error("invalid email for user in database");
        return { error: "Invalid email has been saved" };
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error: sendError } = await resend.emails.send({
        from: "Ramy and Shazia <noreply@notifications.ramyandshazia.com>",
        to: email,
        subject: "Your one time pin",
        react: <OTPEmail name={name} otp={otp} />,
    });

    if (sendError) {
        console.error("error sending email ", sendError);
        return {
            error: "❌ Failed to send email confirmation. Please try again.",
        };
    }

    return { success: true };
};

const getGuestContactCompletion = async () => {
    const user = await getCurrentUser();
    if (!user) {
        console.error("Cannot get guest contact completion - not authed");
        return { error: "Not authed" };
    }
    const supabase = await createClient();
    const { data: guest, error: guestError } = await supabase
        .from("guests")
        .select("email, phone")
        .eq("id", user.id)
        .single();

    const contactCompletionData = {
        phone: guest?.phone ? true : false,
        email: guest?.email.includes(authConfig.noEmailPlaceHolder)
            ? false
            : true,
    };

    return contactCompletionData;
};

const declinePhoneOptIn = async () => {
    try {
        const sanitizedPhone = authConfig.phoneDeclinedPlaceHolder.trim();
        const supabase = await createClient();
        const authedUser = await getCurrentUser();
        if (!authedUser) {
            return { error: "No auth session" };
        }
        const { data, error } = await supabase
            .from("guests")
            .update({ phone: sanitizedPhone })
            .eq("id", authedUser.id);

        if (error) {
            console.error(error);
            return { error: "Unable to update phone number. Please try again" };
        }

        return { success: true };
    } catch (err) {
        console.error("Error updating phone", err);
        return { error: "Error opting out" };
    }
};

const setOTP = async (contact, name, type) => {
    try {
        const supabase = await createClient();
        const authedUser = await getCurrentUser();
        if (!authedUser) {
            return { error: "No auth session" };
        }
        const randomOTP = createOTP();
        const { data: otpData, error: otpError } = await supabase
            .from("update_otps")
            .upsert(
                {
                    id: authedUser.id,
                    code: randomOTP,
                    created_at: new Date().toISOString(),
                },
                { onConflict: ["id"] }
            );

        if (!otpError) {
            let conf;
            if (type === "email") {
                conf = await sendConfirmationEmailOTP(contact, name, randomOTP);
            } else if (type === "phone") {
                conf = await sendConfirmationTextOTP(contact, name, randomOTP);
            } else {
                return { error: "Unsupported otp type" };
            }

            if (conf.error) {
                return { error: conf.error };
            }
            return { success: true };
        } else {
            console.log(otpError);
            return { error: otpError };
        }
    } catch (err) {
        console.error(err);
        return { error: "unable to retrieve otp" };
    }
};

const verifyOTP = async (otp) => {
    try {
        const supabase = await createClient();
        const authedUser = await getCurrentUser();
        if (!authedUser) {
            return { error: "No auth session" };
        }

        const { data: otpData, error: otpError } = await supabase
            .from("update_otps")
            .select("code, created_at")
            .eq("id", authedUser.id);

        const expires_at = new Date(Date.now() + 10 * 60 * 1000);

        if (otp === otpData.code && Date.now() < new Date(expires_at)) {
            return { success: true };
        } else {
            return { error: "OTP code is incorrect or expired" };
        }
    } catch (err) {
        return { error: "Unable to verify otp" };
    }
};

const createOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

export {
    updateGuestEmail,
    getCurrentUser,
    updateGuestPhone,
    sendConfirmationText,
    sendConfirmationEmail,
    getGuestContactCompletion,
    declinePhoneOptIn,
    setOTP,
    verifyOTP,
    sendConfirmationEmailOTP,
    sendConfirmationTextOTP,
    updateGuestEmailOTP,
    updateGuestPhoneOTP,
};
