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
import { useState, useEffect, useContext, useRef } from "react";
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
    verifyOTP,
    setOTP,
    sendConfirmationEmailOTP,
    sendConfirmationTextOTP,
    updateGuestEmailOTP,
    updateGuestPhoneOTP,
} from "@/app/(protected)/complete-profile/_lib/actions";
import { Loader2Icon } from "lucide-react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

const otpSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one time password must be 6 characters.",
    }),
});

const OTPForm = ({
    submittedContact,
    onOpenChange,
    emailOrPhone,
    setShowOTP,
}) => {
    const { updateGuestEmailContext, updateGuestPhoneContext, guestName } =
        useContext(AuthContext);

    const [isCoolingDown, setIsCoolingDown] = useState(false);
    const [countdown, setCountdown] = useState(120);
    let refCountDown = useRef(120);

    const startCooldown = () => {
        setIsCoolingDown(true);
    };

    useEffect(() => {
        if (!isCoolingDown) return;

        if (countdown <= 0) {
            setIsCoolingDown(false);
            refCountDown.current = 120;
            setCountdown(refCountDown.current);
            return;
        }

        const timerId = setInterval(() => {
            refCountDown.current -= 1;
            setCountdown(refCountDown.current);
        }, 1000);

        return () => clearInterval(timerId);
    }, [isCoolingDown, countdown]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const otpForm = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: { pin: "" },
    });

    const handleOTPSubmit = async ({ otp }) => {
        const verified = await verifyOTP(otp);
        if (verified.success) {
            let updated;
            if (emailOrPhone === "email") {
                updated = await updateGuestEmailOTP(submittedContact);
            } else if (emailOrPhone === "phone") {
                updated = await updateGuestPhoneOTP(submittedContact);
            }
            if (updated.success) {
                if (emailOrPhone === "email") {
                    updateGuestEmailContext(submittedContact);
                } else if (emailOrPhone === "phone") {
                    updateGuestPhoneContext(submittedContact);
                }
                setShowOTP(false);
                toast.success(`Successfully updated your ${emailOrPhone}`);
            } else {
                toast.error(updated.error);
            }

            otpForm.reset();
            onOpenChange(false);
        }
    };

    const handleNewPin = async () => {
        startCooldown();
        const otp = await setOTP(submittedContact, guestName, emailOrPhone);
        if (otp.success) {
            toast.success("Check for a new otp");
        } else {
            toast.error("Error generating an otp - try again");
        }
    };

    return (
        <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)}>
                <DialogHeader>
                    <DialogTitle> Enter Your OTP</DialogTitle>
                    <DialogDescription className={cn("text-justify")}>
                        An otp was sent to the email you provided.
                    </DialogDescription>
                </DialogHeader>
                <div className={cn("flex flex-row justify-center mt-5")}>
                    <FormField
                        control={otpForm.control}
                        name="pin"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                {fieldState.error && (
                                    <FormDescription
                                        className={cn("text-red-500")}
                                    >
                                        {fieldState.error.message}
                                    </FormDescription>
                                )}
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter>
                    <div className={cn("flex mt-5 space-x-5")}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleNewPin}
                            disabled={
                                otpForm.formState.isSubmitting || isCoolingDown
                            }
                        >
                            {isCoolingDown
                                ? `Resend in ${formatTime(countdown)}`
                                : "Request New Pin"}
                        </Button>
                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={otpForm.formState.isSubmitting}
                        >
                            {otpForm.formState.isSubmitting && (
                                <Loader2Icon className={cn("animate-spin")} />
                            )}
                            {otpForm.formState.isSubmitting
                                ? "Verifying"
                                : "Verify"}
                        </Button>
                    </div>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default OTPForm;
