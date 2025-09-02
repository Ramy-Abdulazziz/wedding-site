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
                    <DialogDescription
                        className={cn("text-lg text-justify hyphens-auto mt-2")}
                    >
                        Please RSVP for all members of your party. The form will
                        remain open until the deadline, and you may update your
                        responses as often as needed by resubmitting the form.
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
