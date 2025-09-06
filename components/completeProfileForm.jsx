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
    updateGuestEmail,
    sendConfirmationEmail,
} from "@/app/(protected)/complete-profile/_lib/actions";
import { AuthContext } from "./AuthContextProvider";


const schema = z.object({
    email: z.email("Invalid email address"),
});

const CompleteProfileForm = () => {
    const router = useRouter();
    const { updateGuestEmailContext, guestName } = useContext(AuthContext);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { email: "" },
    });

    const onSubmit = useCallback(
        async (data) => {
            const sanitizedEmail = data.email.trim();
            const updated = await updateGuestEmail(sanitizedEmail, guestName);
            if (updated.success) {
                updateGuestEmailContext(sanitizedEmail);
                toast.success("successfully updated your email!");
                router.push("/rsvp");
            } else {
                toast.error(updated.error);
            }
        },
        [router, updateGuestEmail]
    );

    return (
        <Card
            className={cn(
                "flex flex-shrink max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] mx-auto mt-20 md:mt-35 lg:mt-35 xl:mt-35 2xl:mt-50 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
            )}
        >
            <CardHeader>
                <CardTitle className={cn("text-xl")}>
                    <span> We just need a bit more info</span>
                </CardTitle>
                <CardDescription>
                    We need to collect your email address so we can send you a
                    confirmation of your RSVP response and important updates
                    about the wedding.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 mt-5">
                            <div className="grid gap-5 space-y-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel> Email </FormLabel>
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
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CompleteProfileForm;
