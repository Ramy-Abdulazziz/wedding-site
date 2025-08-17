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
import { useState, useEffect } from "react";
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
} from "@/components/ui/form";
import parsePhoneNumber from "libphonenumber-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const DialogEmailInput = () => {
    const emailForm = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    });

    const textForm = useForm({
        resolver: zodResolver(textSchema),
        defaultValues: { phone: "" },
    });

    const [open, setOpen] = useState(false);
    const [isCoolingDown, setIsCoolingDown] = useState(false);
    const [countdown, setCountdown] = useState(120);

    useEffect(() => {
        if (!isCoolingDown) return;

        if (countdown <= 0) {
            setIsCoolingDown(false);
            setCountdown(120); // Reset for next time
            return;
        }

        const timerId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Cleanup interval on component unmount or state change
        return () => clearInterval(timerId);
    }, [isCoolingDown, countdown]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const startCooldown = () => {
        setIsCoolingDown(true);
    };

    const onSubmitEmail = async ({ email }) => {
        const sanitizedEmail = email.trim().toLowerCase();
        const emailSuccess = await sendMagicLinkEmail(sanitizedEmail);
        if (emailSuccess?.error) {
            toast.error("Error sending link", {
                description: emailSuccess.error,
                position: "bottom-right",
            });
        } else {
            toast.success("Link Sent", {
                description: "Check your email!",
                position: "bottom-right",
            });
            startCooldown();
        }
    };

    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
            setIsCoolingDown(false);
            setCountdown(120);
            emailForm.reset();
            textForm.reset();
        }
    };

    const onSubmitText = async ({ phone }) => {
        const sanitizedPhone = phone.trim().toLowerCase();
        const textSuccess = await sendMagicLinkTextNoEmail(sanitizedPhone);
        if (textSuccess?.error) {
            toast.error("Error sending link", {
                description: textSuccess.error,
                position: "bottom-right",
            });
        } else {
            toast.success("Link Sent", {
                description: "Check your texts!",
                position: "bottom-right",
            });

            startCooldown();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "mt-3 lg:text-lg xl:text-lg 2xl:text-xl w-20p"
                    )}
                >
                    Get Access & RSVP
                </Button>
            </DialogTrigger>
            <DialogContent>
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
                                onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                            >
                                <DialogHeader>
                                    <DialogTitle>
                                        {" "}
                                        Get Access and RSVP
                                    </DialogTitle>
                                    <DialogDescription
                                        className={cn("text-justify")}
                                    >
                                        We are limiting access to invited guests
                                        only. Please enter your email address
                                        and a link will be sent to you
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 mt-5">
                                    <div className="grid gap-3">
                                        <FormField
                                            control={emailForm.control}
                                            name="email"
                                            render={({ field, fieldState }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {" "}
                                                        Email{" "}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="you@example.com"
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
                                                                fieldState.error
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
                                        <Button type="button" variant="outline">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        disabled={
                                            emailForm.formState.isSubmitting ||
                                            isCoolingDown
                                        }
                                    >
                                        {isCoolingDown
                                            ? `Resend in ${formatTime(countdown)}`
                                            : emailForm.formState.isSubmitting
                                              ? "Sending..."
                                              : "Send Link"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="text">
                        <Form {...textForm}>
                            <form
                                onSubmit={textForm.handleSubmit(onSubmitText)}
                            >
                                <DialogHeader>
                                    <DialogTitle>
                                        {" "}
                                        Get Access and RSVP
                                    </DialogTitle>
                                    <DialogDescription
                                        className={cn("text-justify")}
                                    >
                                        We are limiting access to invited guests
                                        only. Please enter your phone number and
                                        a link to enter will be sent to you via
                                        text.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 mt-5">
                                    <div className="grid gap-3">
                                        <FormField
                                            control={textForm.control}
                                            name="phone"
                                            render={({ field, fieldState }) => (
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
                                                                fieldState.error
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
                                        <Button type="button" variant="outline">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        disabled={
                                            textForm.formState.isSubmitting ||
                                            isCoolingDown
                                        }
                                    >
                                        {isCoolingDown
                                            ? `Resend in ${formatTime(countdown)}`
                                            : textForm.formState.isSubmitting
                                              ? "Sending..."
                                              : "Send Link"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default DialogEmailInput;
