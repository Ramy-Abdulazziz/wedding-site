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
import { Progress } from "@/components/ui/progress";
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
import {
    sendRsvpConfEmail,
    updateRsvps,
    submitRsvpAndSendEmail,
} from "@/app/(protected)/rsvp/_lib/actions";
import { Label } from "@/components/ui/label";
import { useState, useMemo, useReducer, useCallback, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { redirect } from "next/navigation";

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
                name: z
                    .string()
                    .min(1, { message: "name is required" })
                    .refine(
                        (name) =>
                            name.split(" ").filter((word) => word).length >= 2,
                        {
                            message: "Please enter both a first and last name.",
                        }
                    )
                    .refine((name) => /^[a-zA-Z-' ]+$/.test(name), {
                        message:
                            "Name can only contain letters, hyphens, and apostrophes.",
                    }),
            })
        ),
    });

    return guestSchema;
};

const initialStepProgress = { step: 0, progress: 50 };
const stepReducer = (state, action) => {
    switch (action.type) {
        case "NEXT_STEP":
            return { step: 1, progress: 100 };
        case "PREV_STEP":
            return { step: 0, progress: 50 };
        default:
            return state;
    }
};

const RsvpForm = ({ initialData }) => {
    const [formStep, dispatch] = useReducer(stepReducer, initialStepProgress);

    const { guest, guests, plusOnes, rsvps, group } = initialData;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const schema = useMemo(() => genSchema(guests), [guests]);
    const defaultFormValues = useMemo(() => ({
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
    }));

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultFormValues,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "plusOnes",
    });

    const handleNext = useCallback(async () => {
        const isValid = await form.trigger("namedGuests");
        if (isValid) {
            dispatch({ type: "NEXT_STEP" });
        }
    }, [form, dispatch]);

    const handlePrev = useCallback(async () => {
        dispatch({ type: "PREV_STEP" });
    }, [dispatch]);

    const onSubmit = useCallback(
        async (data) => {
            const rsvpArray = Object.entries(data.namedGuests).map(
                ([guestId, isAttending]) => ({
                    guest_id: guestId,
                    attending: isAttending,
                    group_id: guest.group_id,
                    name: guests.find((g) => g.id === guestId).name,
                })
            );

            const plusOnesRsvpArray = data.plusOnes.map((item) => ({
                name: item.name.trim(),
                groupId: guest.group_id,
                is_plus_one: true,
            }));

            const result = await submitRsvpAndSendEmail(
                rsvpArray,
                plusOnesRsvpArray,
                {
                    groupId: guest.group_id,
                    name: guest.name,
                    email: guest.email,
                }
            );

            if (result.success) {
                if (result.error) {
                    toast.warning(result.error);
                } else {
                    toast.success("Successfully updated rsvp info");
                }
                redirect("/rsvp/thanks");
            } else {
                toast.error(result.error);
            }
        },
        [guest, guests, submitRsvpAndSendEmail]
    );

    return (
        <>
            <RsvpInstructionsDialog />
            <Card
                className={cn(
                    "flex flex-shrink max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] mx-auto mt-20 md:mt-35 lg:mt-35 xl:mt-35 2xl:mt-50 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
                )}
            >
                <CardHeader>
                    <div>
                        <h3>Step {formStep.step + 1} of 2</h3>
                        <Progress
                            value={formStep.progress}
                            className={cn("mb-7 mt-2")}
                        />
                    </div>
                    <CardTitle className={cn("text-xl")}>
                        <div
                            className={cn(
                                formStep.step === 1
                                    ? "flex flex-row-reverse justify-between"
                                    : "flex flex-row-"
                            )}
                        >
                            {" "}
                            <span>Welcome {guest.name} </span>
                            {formStep.step === 1 && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            className={cn(
                                                "rounded-full dark:hover:shadow-white/25 hover:shadow-lg order-first"
                                            )}
                                            disabled={
                                                fields.length >= group.plus_ones
                                            }
                                            onClick={() => append({ name: "" })}
                                        >
                                            <Plus
                                                className={cn(
                                                    "text-sky-500 dark:text-sky-700"
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
                        {formStep.step === 0
                            ? "RSVP for all members of your group"
                            : group.plus_ones > 0
                              ? `Add your plus ones (${group.plus_ones - fields.length} remaining)`
                              : ""}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {formStep.step == 0 && (
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
                            {formStep.step === 1 && (
                                <div>
                                    <div
                                        className={cn(
                                            "relative z-10 space-y-4"
                                        )}
                                    >
                                        {fields.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className={cn(
                                                    "flex flex-row justify-left justify-items-left mb-7 space-x-2 p-3 rounded-lg"
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
                                                                    className={cn(
                                                                        "dark:shadow-white/25 hover:shadow-lg"
                                                                    )}
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
                                                            variant="secondary"
                                                            size="icon"
                                                            className={cn(
                                                                "rounded-xl dark:hover:shadow-white/25 hover:shadow-lg "
                                                            )}
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                        >
                                                            <X className="h-4 w-4 text-red-500 dark:text-rose-700 " />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        Remove this person
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        ))}
                                        {group.plus_ones === 0 && (
                                            <div
                                                className={cn(
                                                    "w-full flex justify-center text-muted-foreground"
                                                )}
                                            >
                                                You have no plus ones available
                                                - submit to continue
                                            </div>
                                        )}
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
                                {formStep.step === 1 && (
                                    <Button
                                        type="submit"
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
                                {formStep.step >= 1 && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        disabled={form.formState.isSubmitting}
                                        onClick={handlePrev}
                                        className={cn("order-2")}
                                    >
                                        Previous
                                    </Button>
                                )}

                                {formStep.step === 0 && (
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
