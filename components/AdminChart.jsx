"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
const calcRsvpValues = (responseData, noResponseData) => {
    const numAttending = responseData.filter(
        (r) => r.attending === true
    ).length;
    const numNotAttending = responseData.filter(
        (r) => r.attedning === false
    ).length;
    const noResponse = noResponseData.length;

    return [
        {
            rsvpGroup: "attending",
            groupSize: numAttending,
            fill: "var(--color-attending)",
        },
        {
            rsvpGroup: "notAttending",
            groupSize: numNotAttending,
            fill: "var(--color-notAttending)",
        },
        {
            rsvpGroup: "noResponse",
            groupSize: noResponse,
            fill: "var(--color-noResponse)",
        },
    ];
};

const AdminChart = ({ rsvpData }) => {
    const chartData = useMemo(
        () => calcRsvpValues(rsvpData.rsvpData, rsvpData.noRsvpData),
        [rsvpData]
    );
    const chartConfig = {
        responses: {
            label: "Amount",
        },
        attending: {
            label: "Attending",
            color: "var(--chart-1)",
        },
        notAttending: {
            label: "Not Attending",
            color: "var(--chart-2)",
        },
        noResponse: {
            label: "No Response",
            color: "var(--chart-2)",
        },
    };

    return (
        <ChartContainer
            config={chartConfig}
            className={cn(" mx-auto min-h-[200px]")}
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="groupSize"
                    nameKey="rsvpGroup"
                    innerRadius={50}
                    strokeWidth={60}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {chartData[0].groupSize.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            Attending
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    );
};

export default AdminChart;
