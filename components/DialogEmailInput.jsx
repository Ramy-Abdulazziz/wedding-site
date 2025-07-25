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
import { useState } from "react";
import { toast } from "sonner";

import { sendMagicLink } from "@/app/auth/actions";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
} from "@/components/ui/form";

const schema = z.object({
    email: z.email("Invalid email address"),
});

const DialogEmailInput = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { email: "" },
    });

    const [open, setOpen] = useState(false);

    const onSubmit = async ({ email }) => {
        const sanitizedEmail = email.trim().toLowerCase();
        const emailSuccess = await sendMagicLink(sanitizedEmail);
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
        }

        form.reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle> Get Access and RSVP</DialogTitle>
                            <DialogDescription>
                                We are limiting access to invited guests only
                                please enter your email and a link to enter will
                                be emailed to you
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 mt-5">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Email </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
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
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "Sending..."
                                    : "Send Magic Link"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogEmailInput;
