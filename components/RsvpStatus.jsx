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
    const [rsvps, setRsvps] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRsvpData = async () => {
            try {
                setLoading(true);
                const rsvpData = await getAllRsvps();
                if (rsvpData) {
                    setRsvps(rsvpData);
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
            <Table>
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
                                {rsvp.attending ? "Attending" : "Not Attending"}
                            </TableCell>
                            <TableCell className={cn("text-right")}>
                                {formatDateTime(rsvp.last_edit)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    );
};

export default RsvpStatus;
