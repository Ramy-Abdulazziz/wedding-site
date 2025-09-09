"use client";

import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormDescription,
} from "@/components/ui/form";
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardTitle,
} from "./ui/card";
import { useState, useMemo, useReducer, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import {
    declinePhoneOptIn,
    sendConfirmationText,
    updateGuestEmail,
    updateGuestPhone,
} from "@/app/(protected)/complete-profile/_lib/actions";
import parsePhoneNumber, { isPossiblePhoneNumber } from "libphonenumber-js";
import { AuthContext } from "./AuthContextProvider";
import { authConfig } from "@/auth.config";

const schema = z.object({
    phone: z
        .string()
        .min(1, "Please enter a phone number")
        .refine((val) => {
            try {
                const possibleNumber = parsePhoneNumber(val, "US");
                return (
                    possibleNumber !== undefined &&
                    possibleNumber.isValid() &&
                    possibleNumber.country === "US"
                );
            } catch {
                return false;
            }
        }, "Please enter a valid US phone number"),
});

const CompleteProfileFormPhone = () => {
    const router = useRouter();
    const { updateGuestPhoneContext } = useContext(AuthContext);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { phone: "" },
    });

    const onSubmit = useCallback(
        async (data) => {
            const sanitizedPhone = data.phone.trim();
            const updated = await updateGuestPhone(sanitizedPhone);
            if (updated.success) {
                updateGuestPhoneContext(sanitizedPhone);
                router.push("/rsvp");
                toast.success(
                    "successfully updated your phone! Look out for a confirmation text!"
                );
            } else {
                toast.error(updated.error);
            }
        },
        [updateGuestPhone, router]
    );

    const onError = useCallback(
        (errors) => {
            if (errors.phone) {
                const possiblePhone = form.getValues("phone");
                const phone = parsePhoneNumber(possiblePhone, "US");
                if (phone !== undefined && phone.country !== "US") {
                    toast.error(
                        "We can only text US numbers at this time. We apologize for the inconvenience"
                    );
                }
            }
        },
        [form]
    );

    const declineInput = useCallback(async () => {
        const declined = await declinePhoneOptIn();
        if (declined?.success) {
            updateGuestPhoneContext(authConfig.declinePhoneOptIn);
            router.push("/rsvp");
            toast.info("You may update your phone number later");
        } else {
            toast.error(declined.error);
        }
        router.push("/rsvp");
    }, [router, declinePhoneOptIn]);
    return (
        <Card
            className={cn(
                "flex flex-shrink max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] mx-auto mt-20 md:mt-35 lg:mt-35 xl:mt-35 2xl:mt-50 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
            )}
        >
            <CardHeader>
                <CardTitle className={cn("text-xl")}>
                    <span> Would you like to update your phone number?</span>
                </CardTitle>
                <CardDescription>
                    If you wish you can update your phone number so that you can
                    receive text updates, and log in links via text. US numbers
                    only.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <div className="grid gap-4 mt-5">
                            <div className="grid gap-5 space-y-2">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel> Phone </FormLabel>
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
                                                    {fieldState.error.message}
                                                </FormDescription>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div
                            className={cn(
                                "flex flex-row-reverse justify-between w-full mt-5"
                            )}
                        >
                            <Button
                                type="submit"
                                variant="secondary"
                                disabled={form.formState.isSubmitting}
                                className={cn("order-1")}
                            >
                                {form.formState.isSubmitting && (
                                    <Loader2Icon
                                        className={cn("animate-spin")}
                                    />
                                )}
                                {form.formState.isSubmitting
                                    ? "Submitting"
                                    : "Submit"}
                            </Button>

                            <Button
                                type="button"
                                variant=""
                                disabled={form.formState.isSubmitting}
                                className={cn("order-2")}
                                onClick={declineInput}
                            >
                                No Thanks
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CompleteProfileFormPhone;
