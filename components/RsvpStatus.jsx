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
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DownloadIcon } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
    weight: "400",
    subsets: ["latin"],
});

const RsvpStatus = () => {
    const [allRsvps, setAllRsvps] = useState([]);
    const [currentView, setCurrentView] = useState([]);
    const [filteredView, setFilteredView] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numAttending, setNumAttending] = useState(0);
    const [numNotAttending, setNumNotAttending] = useState(0);
    const [numNotResponded, setNumNotResponded] = useState(0);
    const [noResponse, setNoResponse] = useState([]);
    const [filter, setFilter] = useState("");
    const [viewLabel, setViewLabel] = useState("");

    useEffect(() => {
        const loadRsvpData = async () => {
            try {
                setLoading(true);
                const rsvpData = await getAllRsvps();
                if (rsvpData.rsvpData) {
                    setAllRsvps(rsvpData.rsvpData);
                    setCurrentView(rsvpData.rsvpData);
                    setFilteredView(rsvpData.rsvpData);
                    setNumAttending(
                        rsvpData.rsvpData.filter((r) => r.attending === true)
                            .length
                    );
                    setNumNotAttending(
                        rsvpData.rsvpData.filter((r) => r.attending === false)
                            .length
                    );
                    setNoResponse(rsvpData.noRsvpData);
                    setNumNotResponded(rsvpData.noRsvpData.length);
                    toast.success("Successfully loaded all guest rsvp data");
                } else {
                    toast.error("Unable to load rsvp data");
                }
            } catch (err) {
                console.log(err);
            } finally {
                setViewLabel(`Set Guest View`);

                setLoading(false);
            }
        };

        loadRsvpData();
    }, []);

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        setFilter(value);

        if (!value) {
            setFilteredView(currentView);
            return;
        }

        const filteredRsvp = allRsvps.filter((r) => {
            const nameMatch = r.name.toLowerCase().includes(value);
            const statusMatch =
                (value === "attending" && r.attending === true) ||
                (value === "not attending" && r.attending === false);

            return nameMatch || statusMatch;
        });

        const filteredNoResponse = noResponse.filter((r) => {
            const nameMatch = r.name.toLowerCase().includes(value);
            const statusMatch =
                value === "no response" && r.responded === false;

            return nameMatch || statusMatch;
        });

        setFilteredView([...filteredRsvp, ...filteredNoResponse]);
    };

    const showAttending = () => {
        const filtered = allRsvps.filter((r) => r.attending === true);
        setCurrentView(filtered);
        setFilteredView(filtered);
        setViewLabel(`${numAttending} Attending`);
    };

    const showNotAttending = () => {
        const filtered = allRsvps.filter((r) => r.attending === false);
        setCurrentView(filtered);
        setFilteredView(filtered);
        setViewLabel(`${numNotAttending} Not Attending`);
    };

    const showNoResponse = () => {
        setCurrentView(noResponse);
        setFilteredView(noResponse);
        setViewLabel(`${numNotResponded} Not Responded`);
    };

    const downloadCSV = () => {
        if (!allRsvps.length) return;

        const headers = ["Name", "RSVP Status"];

        const rows = allRsvps.map((r) => [
            r.name,
            r.attending === true ? "Attending" : "Not Attending",
        ]);

        const csvContent = [headers, ...rows]
            .map((e) => e.map((v) => `"${v}"`).join(","))
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "rsvps.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
        allRsvps && (
            <div>
                <div
                    className={cn(
                        "flex flex-col space-y-2 justify-center space-x-5 mb-5 md:flex-row"
                    )}
                >
                    <Input
                        className={cn("w-full mb-5")}
                        placeholder="Filter name or status..."
                        value={filter}
                        onChange={handleFilterChange}
                    />
                    <div className={cn("hidden md:flex flex-row space-x-2")}>
                        <Button variant="secondary" onClick={showAttending}>
                            {numAttending} Attending
                        </Button>
                        <Button variant="secondary" onClick={showNotAttending}>
                            {numNotAttending} Not Attending
                        </Button>
                        <Button variant="secondary" onClick={showNoResponse}>
                            {numNotResponded} Not Responded
                        </Button>
                        <Button variant="secondary" onClick={downloadCSV}>
                            <DownloadIcon />
                        </Button>
                    </div>
                    <div
                        className={cn(
                            "flex flex-row w-full space-x-5 md:hidden"
                        )}
                    >
                        <DropdownMenu className={cn('w-full')}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" className={cn('grow-3')}>
                                    {" "}
                                    {viewLabel}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={cn("")}>
                                <DropdownMenuLabel>
                                    Guest View
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={showAttending}>
                                    {numAttending} Attending
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={showNotAttending}>
                                    {numNotAttending} Not Attending
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={showNoResponse}>
                                    {numNotResponded} Not Responded
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="secondary" onClick={downloadCSV} className={cn('grow-2')}>
                            <DownloadIcon />
                        </Button>
                    </div>
                </div>

                <div
                    className={cn(
                        "max-h-[500px] overflow-y-auto rounded-md border"
                    )}
                >
                    <Table className={cn("max-h-20 overflow-scroll")}>
                        <TableCaption>
                            A summary of all guest rsvp responses
                        </TableCaption>
                        <TableHeader
                            className={cn("sticky top-0 bg-background/85 z-50")}
                        >
                            <TableRow>
                                <TableHead> Name</TableHead>
                                <TableHead> Rsvp Status</TableHead>
                                <TableHead
                                    className={cn(
                                        "text-right hidden md:table-cell"
                                    )}
                                >
                                    Last Edit
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredView.map((rsvp) => (
                                <TableRow key={rsvp.name}>
                                    <TableCell> {rsvp.name}</TableCell>
                                    <TableCell>
                                        {rsvp.responded && rsvp.attending
                                            ? "Attending"
                                            : rsvp.responded
                                              ? "Not Attending"
                                              : "No Response"}
                                    </TableCell>
                                    <TableCell
                                        className={cn(
                                            "text-right hidden md:table-cell"
                                        )}
                                    >
                                        {formatDateTime(rsvp.last_edit)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    );
};

export default RsvpStatus;
