"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Count = ({ year, month, days, down = false }) => {
    const getDaysLeft = () => {
        const day = 24 * 60 * 60 * 1000;
        const currentDay = new Date();
        const countDownDate = new Date(year, month, days);

        return Math.round((countDownDate - currentDay) / day);
    };

    const [daysLeft, setDaysLeft] = useState(getDaysLeft());

    useEffect(() => {
        const calculateDaysLeft = () => {
            setDaysLeft(getDaysLeft());
        };

        calculateDaysLeft();
    }, []);

    return (
        <div
            className={cn(
                "text-lg xl:text-2xl lg:text-2xl md:text-xl sm:text-lg"
            )}
        >
            {daysLeft} {down ? "Days Away" : "Days Left"}
        </div>
    );
};

export default Count;
