"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getGuestData, verifyMagicLink } from "@/app/auth/confirm/_lib/actions";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { AuthContext } from "./AuthContextProvider";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authConfig } from "@/auth.config";
import { motion } from "framer-motion";
import { attentionItem } from "@/lib/variants";
const formSchema = z.object({
    token_hash: z.string().min(1),
    type: z.string().min(1),
    next: z.string().min(1),
});

export default function AuthSignIn({ token, type, next }) {
    const { setCurrentGuest } = useContext(AuthContext);
    const router = useRouter();
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
        const login = await verifyMagicLink(formData);
        if (login?.success) {
            setCurrentGuest(login.guest);
            router.push(data.next);
        } else {
            toast.error("Unable to validate link - please request a new one");
            router.push(authConfig.unAuthedHomeRoute);
        }
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
                <motion.div
                    variants={attentionItem}
                    initial="hidden"
                    animate="attention"
                    className={cn(
                        "flex flex-row-reverse justify-between w-full "
                    )}
                >
                    <Button
                        type="submit"
                        variant="outline"
                        disabled={form.formState.isSubmitting}
                        className={cn(
                            "order-1 mt-3 lg:text-lg xl:text-lg 2xl:text-xl w-20p"
                        )}
                    >
                        {form.formState.isSubmitting && (
                            <Loader2Icon className={cn("animate-spin")} />
                        )}
                        {form.formState.isSubmitting
                            ? "Signing you in"
                            : "Log In and RSVP"}
                    </Button>
                </motion.div>
            </form>
        </Form>
    );
}
