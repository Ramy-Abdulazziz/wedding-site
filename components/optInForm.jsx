"use client";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { success, z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardHeader,
    CardAction,
    CardContent,
    CardDescription,
    CardTitle,
    CardFooter,
} from "./ui/card";
import handleConsentFormSubmit from "@/app/opt-in/_lib/actions";
import { redirect } from "next/navigation";
const schema = z.object({
    name: z.string().min(1, "Name is Required"),
    phone: z
        .string()
        .transform((val) => val.replace(/\D/g, ""))
        .refine((val) => /^\d+$/.test(val), {
            message: "Please enter a valid phone number",
        })
        .refine((val) => val.length >= 10 && val.length <= 15, {
            message: "Please enter a valid phone number",
        }),

    consent: z.literal(true, {
        errorMap: () => ({ message: "Consent is required" }),
    }),
});

const OptInForm = () => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            phone: "",
            consent: false,
        },
    });

    const onSubmit = async (data) => {
        const consentSubmission = await handleConsentFormSubmit(data);
        if (consentSubmission?.error) {
            toast.error(
                "There was an error with your submission - please try again"
            );
        }

        form.reset();
        toast.info("Your submission has successfully been recorded!");
        redirect("/");
    };

    return (
        <div className={cn("container mx-auto")}>
            <Card
                className={cn(
                    "flex flex-shrink max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] mx-auto mt-20 md:mt-35 lg:mt-35 xl:mt-35 2xl:mt-50 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
                )}
            >
                <CardHeader>
                    <CardTitle>
                        Opt In To Receive Texts From Ramy and Shazia
                    </CardTitle>
                    <CardDescription>
                        By submitting this form you agree to receive a one time
                        SMS invitation for Ramy and Shazia's wedding.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div
                                className={cn(
                                    "flex flex-col justify-left justify-items-left mb-7 space-y-5 p-3 rounded-lg"
                                )}
                            >
                                <FormField
                                    control={form.control}
                                    name={"name"}
                                    render={({ field, fieldState }) => (
                                        <FormItem className={cn("flex-grow")}>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className={cn(
                                                        "dark:shadow-white/25 hover:shadow-lg"
                                                    )}
                                                    placeholder={`Alan Turing`}
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
                                <FormField
                                    control={form.control}
                                    name={"phone"}
                                    render={({ field, fieldState }) => (
                                        <FormItem className={cn("flex-grow")}>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className={cn(
                                                        "dark:shadow-white/25 hover:shadow-lg"
                                                    )}
                                                    placeholder={`123-456-7890`}
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
                                <FormField
                                    control={form.control}
                                    name={"consent"}
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <div
                                                className={cn(
                                                    "flex flex-row mt-5 space-x-2"
                                                )}
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel>
                                                    I consent to receive a one
                                                    time SMS message to the
                                                    wedding of Ramy and Shazia
                                                </FormLabel>
                                            </div>
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
                            <div
                                className={cn(
                                    "flex flex-row-reverse justify-between w-full "
                                )}
                            >
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    disabled={form.formState.isSubmitting}
                                    className={cn()}
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
        </div>
    );
};

export default OptInForm;
