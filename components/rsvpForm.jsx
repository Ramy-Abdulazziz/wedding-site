"use client";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import RsvpInstructionsDialog from "@/components/rsvpInstructionsDialog";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormDescription,
} from "@/components/ui/form";
import { Switch } from "./ui/switch";
import {
    Card,
    CardHeader,
    CardAction,
    CardContent,
    CardDescription,
    CardTitle,
} from "./ui/card";
import { updateRsvps } from "@/app/(protected)/rsvp/_lib/actions";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { X, Plus } from "lucide-react";

const genSchema = (guestData) => {
    const guestSchema = z.object({
        namedGuests: z.object(
            Object.fromEntries(
                guestData.map((guest) => [
                    guest.id,
                    z.boolean().default(false).optional(),
                ])
            )
        ),
        plusOnes: z.array(
            z.object({
                name: z.string().min(1, { message: "name is required" }),
            })
        ),
    });

    return guestSchema;
};

const RsvpForm = ({ initialData }) => {
    const [step, setStep] = useState(0);
    const { guest, guests, plusOnes, rsvps, group } = initialData;

    const form = useForm({
        resolver: zodResolver(genSchema(guests)),
        defaultValues: {
            namedGuests: guests.reduce((acc, guest) => {
                const rsvp = rsvps.find((r) => r.guest_id === guest.id);
                acc[guest.id] = rsvp ? rsvp.attending : false;
                return acc;
            }, {}),

            plusOnes: plusOnes.map((plusOneGuest) => {
                const rsvp = rsvps.find((r) => r.guest_id === plusOneGuest.id);
                return {
                    name: plusOneGuest.name,
                };
            }),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "plusOnes",
    });

    const handleNext = async () => {
        const isValid = await form.trigger("namedGuests");
        if (isValid) setStep(1);
    };

    const onSubmit = async (data) => {
        const rsvpArray = Object.entries(data.namedGuests).map(
            ([guestId, isAttending]) => ({
                guest_id: guestId,
                attending: isAttending,
                group_id: guest.group_id,
            })
        );

        const plusOnesRsvpArray = data.plusOnes.map((item) => ({
            name: item.name.trim(),
            groupId: guest.group_id,
            is_plus_one: true,
        }));

        const updateRsvp = await updateRsvps(
            rsvpArray,
            plusOnesRsvpArray,
            guest.group_id
        );
        if (updateRsvp?.error) {
            toast.error(updateRsvp.error);
        } else {
            toast.success("Successfully updated rsvp info");
        }
    };

    return (
        <>
            <RsvpInstructionsDialog />
            <Card
                className={cn(
                    "flex flex-shrink max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] mx-auto mt-20 md:mt-35 lg:mt-35 xl:mt-35 2xl:mt-50 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
                )}
            >
                <CardHeader>
                    <CardTitle className={cn("text-xl")}>
                        <div
                            className={cn(
                                step === 1
                                    ? "flex flex-row-reverse justify-between"
                                    : "flex flex-row-"
                            )}
                        >
                            {" "}
                            <span>Welcome {guest.name} </span>
                            {step === 1 && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            className={cn(
                                                "rounded-2xl dark:shadow-white/25 hover:shadow-lg order-first"
                                            )}
                                            disabled={
                                                fields.length >= group.plus_ones
                                            }
                                            onClick={() => append({ name: "" })}
                                        >
                                            <Plus
                                                className={cn(
                                                    "text-sky-500 dark:text-purple-500"
                                                )}
                                            />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add a plus one</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                    </CardTitle>
                    <CardDescription className={cn("text-md")}>
                        {step === 0
                            ? "Rsvp for all members of your group"
                            : `Add your plus ones (${group.plus_ones - fields.length} remaining)`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {step == 0 && (
                                <div className={cn("")}>
                                    {guests.map((guest) => (
                                        <div
                                            key={guest.id}
                                            className={cn("mb-10")}
                                        >
                                            <FormField
                                                control={form.control}
                                                name={`namedGuests.${guest.id}`}
                                                render={({ field }) => (
                                                    <FormItem
                                                        className={cn(
                                                            "flex flex-row items-center justify-between rounded-lg border p-5 shadow-md dark:shadow-2xl"
                                                        )}
                                                    >
                                                        <div className="space-y-0.5">
                                                            <FormLabel
                                                                className={cn(
                                                                    "text-md"
                                                                )}
                                                            >
                                                                {`RSVP for ${guest.name}`}
                                                            </FormLabel>
                                                            <FormDescription
                                                                className={cn(
                                                                    "text-md"
                                                                )}
                                                            >
                                                                {`Is ${guest.name} attending?`}
                                                            </FormDescription>
                                                        </div>
                                                        <div
                                                            className={cn(
                                                                "flex flex-shrink flex-row justify-right space-x-2"
                                                            )}
                                                        >
                                                            <FormControl>
                                                                <Switch
                                                                    checked={
                                                                        field.value
                                                                    }
                                                                    onCheckedChange={
                                                                        field.onChange
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <Label>
                                                                attending
                                                            </Label>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            {step === 1 && (
                                <div>
                                    <div className={cn("space-y-4")}>
                                        {fields.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className={cn(
                                                    "flex items-center mb-7 space-x-2 p-3 rounded-lg"
                                                )}
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name={`plusOnes.${index}.name`}
                                                    render={({
                                                        field,
                                                        fieldState,
                                                    }) => (
                                                        <FormItem
                                                            className={cn(
                                                                "flex-grow"
                                                            )}
                                                        >
                                                            <FormControl>
                                                                <Input
                                                                    placeholder={`Name`}
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
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                        >
                                                            <X className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Remove this person
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className={cn(
                                            "flex flex-row-reverse mb-10"
                                        )}
                                    ></div>
                                </div>
                            )}
                            <div
                                className={cn(
                                    "flex flex-row-reverse justify-between w-full "
                                )}
                            >
                                {(step === 1 || group.plus_ones === 0) && (
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
                                )}
                                {step >= 1 && (
                                    <Button
                                        type="button"
                                        disabled={form.formState.isSubmitting}
                                        onClick={() =>
                                            setStep((step) => step - 1)
                                        }
                                        className={cn("order-2")}
                                    >
                                        Previous
                                    </Button>
                                )}

                                {step === 0 && group.plus_ones > 0 && (
                                    <Button
                                        type="button"
                                        className={cn("order-2")}
                                        disabled={form.formState.isSubmitting}
                                        onClick={handleNext}
                                    >
                                        {" "}
                                        Next
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
};

export default RsvpForm;
