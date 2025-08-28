"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { verifyMagicLink } from "@/app/auth/confirm/_lib/actions";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
    token_hash: z.string().min(1),
    type: z.string().min(1),
    next: z.string().min(1),
});

export default function AuthSignIn({ token, type, next }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token_hash: token || "",
            type: type || "",
            next: next || "",
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("token_hash", data.token_hash);
        formData.append("type", data.type);
        formData.append("next", data.next);
        console.log(formData);
        await verifyMagicLink(formData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="token_hash"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} value={token} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} value={type} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="next"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" {...field} value={next} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div
                    className={cn(
                        "flex flex-row-reverse justify-between w-full "
                    )}
                >
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className={cn("order-1")}
                    >
                        {form.formState.isSubmitting && (
                            <Loader2Icon className={cn("animate-spin")} />
                        )}
                        {form.formState.isSubmitting
                            ? "Signing you in"
                            : "Log In and RSVP"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
