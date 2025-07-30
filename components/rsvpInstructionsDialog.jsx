import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { cancelRsvp } from "@/app/(protected)/rsvp/_lib/actions";

const RsvpInstructionsDialog = () => {
    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>RSVP Form Instructions</DialogTitle>
                    <DialogDescription className={cn("text-lg")}>
                            You will be able to RSVP for all members of your
                            group - if you are allocated any plus ones, you will
                            also be able to RSVP for them as well. The RSVP will
                            remain open untill the RSVP deadline. You may change
                            your RSVP as often as you like untill such time.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className={cn("mt-5")}>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={cancelRsvp}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" varian="secondary">
                            Continue and RSVP
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RsvpInstructionsDialog;
