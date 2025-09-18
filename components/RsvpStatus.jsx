"use client";

import getAllRsvps from "@/app/(protected)/(admin)/admin/_lib/actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const RsvpStatus = () => {
    const [rsvps, setRsvps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numAttending, setNumAttending] = useState(0);
    const [numNotAttending, setNumNotAttending] = useState(0);
    const [numNotResponded, setNumNotResponded] = useState(0);

    useEffect(() => {
        const loadRsvpData = async () => {
            try {
                setLoading(true);
                const rsvpData = await getAllRsvps();
                if (rsvpData.rsvpData) {
                    setRsvps(rsvpData.rsvpData);
                    setNumAttending(
                        rsvpData.rsvpData.filter((r) => r.attending === true).length
                    );
                    setNumNotAttending(
                        rsvpData.rsvpData.filter((r) => r.attending === false).length
                    );
                    setNumNotResponded(rsvpData.noRsvpData.length);
                    toast.success("Successfully loaded all guest rsvp data");
                } else {
                    toast.error("Unable to load rsvp data");
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        loadRsvpData();
    }, []);

    const formatDateTime = (isoString) => {
        return new Date(isoString).toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <Skeleton
                className={cn("mx-auto h-[500px]  pb-[5vh] rounded-xl")}
            />
        );
    }

    return (
        !loading &&
        rsvps && (
            <div>
                <div className={cn("flex flex-row justify-left space-x-5")}>
                    <span>{numAttending} Attending</span>
                    <span>{numNotAttending} Not Attending</span>
                    <span>{numNotResponded} Not Responded</span>
                </div>
                <Table className={cn("")}>
                    <TableCaption>
                        A summary of all guest rsvp responses
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead> Name</TableHead>
                            <TableHead> Rsvp Status</TableHead>
                            <TableHead className={cn("text-right")}>
                                Last Edit
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rsvps.map((rsvp) => (
                            <TableRow key={rsvp.name}>
                                <TableCell> {rsvp.name}</TableCell>
                                <TableCell>
                                    {rsvp.attending
                                        ? "Attending"
                                        : "Not Attending"}
                                </TableCell>
                                <TableCell className={cn("text-right")}>
                                    {formatDateTime(rsvp.last_edit)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    );
};

export default RsvpStatus;
