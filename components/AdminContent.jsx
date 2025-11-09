"use client";
import { Skeleton } from "./ui/skeleton";
import AdminRsvpCard from "@/components/AdminRsvpCard";
import AdminGraphView from "@/components/AdminGraphView";
import { useState, useEffect } from "react";
import { getAllRsvps } from "@/app/(protected)/(admin)/admin/_lib/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
const AdminContent = () => {
    const [loading, setLoading] = useState(true);
    const [rsvpData, setRsvpData] = useState(null);
    useEffect(() => {
        const loadRsvpData = async () => {
            try {
                setLoading(true);
                const allRsvps = await getAllRsvps();
                setRsvpData(allRsvps);
                toast.success("Successfully loaded rsvpData");
            } catch (err) {
                toast.error("Unable to load rsvp data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadRsvpData();
    }, []);

    return (
        <>
            {!loading && (
                <>
                    <AdminGraphView rsvpData={rsvpData} loading={loading} />
                    <AdminRsvpCard rsvpData={rsvpData} loading={loading} />
                </>
            )}
        </>
    );
};

export default AdminContent;
