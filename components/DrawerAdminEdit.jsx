import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { adminUpdateGuestRsvp } from "@/app/(protected)/(admin)/admin/_lib/actions";
import { toast } from "sonner";
import React from "react";
import { Loader2Icon } from "lucide-react";

const DrawerAdminEdit = ({ rsvpData, onStatusChange }) => {
    const [submitting, setSubmitting] = React.useState(false);

    const handleStatusUpdate = async (attendingStatus) => {
        setSubmitting(true);
        try {
            const updated = await adminUpdateGuestRsvp(
                rsvpData.id,
                attendingStatus,
                rsvpData.group_id
            );
            if (updated?.error) {
                toast.error(updated.error);
                return;
            }

            toast.success("Successfully updated rsvp status");
            onStatusChange(rsvpData.id, attendingStatus);
        } catch (err) {
            console.error("error updating status", err);
            toast.error("Unexpected error - please try again");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <DrawerContent className={cn("")}>
            <div
                className={cn("flex flex-col mx-auto w-full mx-auto min-h-150")}
            >
                <DrawerHeader>
                    <DrawerTitle className={cn("text-2xl")}>
                        {rsvpData.name}
                    </DrawerTitle>
                    <DrawerDescription className={cn("text-lg")}>
                        Update {rsvpData.name}'s rsvp status
                    </DrawerDescription>
                </DrawerHeader>
                <div className={cn("flex flex-row mx-auto space-x-10")}>
                    {submitting && (
                        <div
                            className={cn(
                                "flex justify-self-center items-center mx-auto w-full"
                            )}
                        >
                            <Loader2Icon className={cn("animate-spin")} />
                        </div>
                    )}
                    {!submitting && (
                        <>
                            <DrawerClose>
                                <Button
                                    onClick={() => handleStatusUpdate(true)}
                                    disabled={submitting}
                                >
                                    Attending
                                </Button>
                            </DrawerClose>
                            <DrawerClose>
                                <Button
                                    onClick={() => handleStatusUpdate(false)}
                                    disabled={submitting}
                                >
                                    Not Attending
                                </Button>
                            </DrawerClose>
                        </>
                    )}
                </div>
            </div>
        </DrawerContent>
    );
};

export default DrawerAdminEdit;
