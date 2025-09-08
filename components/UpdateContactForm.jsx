"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useEffect, useContext, useRef } from "react";
import { toast } from "sonner";
import {
    sendMagicLinkEmail,
    sendMagicLinkTextNoEmail,
} from "@/app/auth/confirm/_lib/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import parsePhoneNumber from "libphonenumber-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "./AuthContextProvider";
import {
    declinePhoneOptIn,
    sendConfirmationText,
    updateGuestEmail,
    updateGuestPhone,
    verifyOTP,
    setOTP,
    sendConfirmationEmailOTP,
} from "@/app/(protected)/complete-profile/_lib/actions";
import { Loader2Icon } from "lucide-react";
import OTPForm from "./OTPForm";

const emailSchema = z.object({
    email: z.email("Invalid email address"),
});

const textSchema = z.object({
    phone: z.string().refine(
        (val) => {
            const phone = parsePhoneNumber(val, "US");
            if (phone?.isValid()) {
                return true;
            }
            return false;
        },
        {
            message: "Please enter a valid phone number",
        }
    ),
});

const UpdateContactForm = ({ open, onOpenChange }) => {
    const { updateGuestEmailContext, updateGuestPhoneContext, guestName } =
        useContext(AuthContext);

    const [showOTP, setShowOTP] = useState(false);
    const [submittedContact, setSubmittedContact] = useState("");
    const emailOrPhone = useRef("email");

    const emailForm = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    });

    const textForm = useForm({
        resolver: zodResolver(textSchema),
        defaultValues: { phone: "" },
    });

    useEffect(() => {
        if (!open) {
            emailForm.reset();
            textForm.reset();
            handleOTPCancel();
        }
    }, [open, emailForm, textForm]);

    const onSubmitEmail = async ({ email }) => {
        emailOrPhone.current = "email";
        const sanitizedEmail = email.trim();
        const otp = await setOTP(sanitizedEmail, guestName, "email");
        if (otp.success) {
            setShowOTP(true);
            setSubmittedContact(sanitizedEmail);
            toast.success("Check your email for an otp");
        } else {
            toast.error("Error generating an otp - try again");
            setShowOTP(false);
            emailForm.reset();
            textForm.reset();
            onOpenChange(false);
        }
    };

    const onSubmitText = async ({ phone }) => {
        emailOrPhone.current = "phone";
        const sanitizedPhone = phone.trim();
        const otp = await setOTP(sanitizedPhone, guestName, "phone");
        if (otp.success) {
            setShowOTP(true);
            setSubmittedContact(sanitizedPhone);
            toast.success("Check your phone for an otp");
        } else {
            toast.error("Error generating an otp - try again");
            setShowOTP(false);
            emailForm.reset();
            textForm.reset();
            onOpenChange(false);
        }
    };

    const handleOTPCancel = () => {
        setShowOTP(false);
        onOpenChange(false);
        setSubmittedContact("");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                {!showOTP && (
                    <Tabs defaultValue="email">
                        <div
                            className={cn(
                                "container flex flex-row justify-center items-center mb-5"
                            )}
                        >
                            <TabsList className={cn("")}>
                                <TabsTrigger value="email">Email</TabsTrigger>
                                <TabsTrigger value="text">Phone</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="email">
                            <Form {...emailForm}>
                                <form
                                    onSubmit={emailForm.handleSubmit(
                                        onSubmitEmail
                                    )}
                                >
                                    <DialogHeader>
                                        <DialogTitle>
                                            {" "}
                                            Update Your Contact Info
                                        </DialogTitle>
                                        <DialogDescription
                                            className={cn("text-justify")}
                                        >
                                            You may update your contact info
                                            here. A confirmation will be sent to
                                            you.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 mt-5">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={emailForm.control}
                                                name="email"
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {" "}
                                                            Email{" "}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="email"
                                                                placeholder="foo@bar.com"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        {fieldState.error && (
                                                            <FormDescription
                                                                className={cn(
                                                                    "text-red-500"
                                                                )}
                                                            >
                                                                {
                                                                    fieldState
                                                                        .error
                                                                        .message
                                                                }
                                                            </FormDescription>
                                                        )}
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter className={cn("mt-5")}>
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                Close
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            type="submit"
                                            variant="secondary"
                                            disabled={
                                                emailForm.formState.isSubmitting
                                            }
                                        >
                                            {emailForm.formState
                                                .isSubmitting && (
                                                <Loader2Icon
                                                    className={cn(
                                                        "animate-spin"
                                                    )}
                                                />
                                            )}
                                            {emailForm.formState.isSubmitting
                                                ? "Sending Confirmation"
                                                : "Update"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="text">
                            <Form {...textForm}>
                                <form
                                    onSubmit={textForm.handleSubmit(
                                        onSubmitText
                                    )}
                                >
                                    <DialogHeader>
                                        <DialogTitle>
                                            {" "}
                                            Update Your Contact Info
                                        </DialogTitle>
                                        <DialogDescription
                                            className={cn("text-justify")}
                                        >
                                            You may update your contact info
                                            here. A confirmation will be sent to
                                            you.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 mt-5">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={textForm.control}
                                                name="phone"
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {" "}
                                                            Phone{" "}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="phone"
                                                                placeholder="123-456-7890"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        {fieldState.error && (
                                                            <FormDescription
                                                                className={cn(
                                                                    "text-red-500"
                                                                )}
                                                            >
                                                                {
                                                                    fieldState
                                                                        .error
                                                                        .message
                                                                }
                                                            </FormDescription>
                                                        )}
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter className={cn("mt-5")}>
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                Close
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            type="submit"
                                            variant="secondary"
                                            disabled={
                                                textForm.formState.isSubmitting
                                            }
                                        >
                                            {textForm.formState
                                                .isSubmitting && (
                                                <Loader2Icon
                                                    className={cn(
                                                        "animate-spin"
                                                    )}
                                                />
                                            )}
                                            {textForm.formState.isSubmitting
                                                ? "Sending Confirmation"
                                                : "Update"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                )}

                {showOTP && (
                    <OTPForm
                        submittedContact={submittedContact}
                        onOpenChange={onOpenChange}
                        emailOrPhone={emailOrPhone.current}
                        setShowOTP={handleOTPCancel}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UpdateContactForm;
