import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemHeader,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { GemIcon, HandPlatterIcon, DessertIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ScheduleBranch = ({ event, side }) => {
    const isLeft = side === "left";
    const getIcon = (eventId) => {
        switch (eventId) {
            case "nikkah":
                return <GemIcon />;
            case "recep":
                return <HandPlatterIcon />;
            case "cocktail":
                return <DessertIcon />;
        }
    };
    return (
        <div
            className={cn(
                `flex items-center gap-5 mb-12 last:mb-0 z-20 ${!isLeft ? "" : ""}`
            )}
        >
            <div className={cn(`flex-1 ${isLeft ? "" : "invisible"}`)}>
                <div className={cn("flex flex-col md:min-w-[220px] gap-6")}>
                    <ItemGroup className={cn("gap-4 z-20")}>
                        <Item
                            variant="muted"
                            role="listitem"
                            className={cn("bg-card")}
                        >
                            <ItemMedia variant="icon">
                                {getIcon(event.id)}
                            </ItemMedia>
                            <ItemContent className={cn()}>
                                <ItemTitle className={cn("md:text-2xl")}>
                                    {event.name}
                                </ItemTitle>
                                <ItemDescription className={cn("md:text-xl")}>
                                    {event.time_start} PM
                                </ItemDescription>
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </div>
            </div>

            <div className={cn("relative flex flex-col items-center")}>
                <div
                    className={cn(
                        "w-4 h-4 rounded-full bg-foreground border-5 border-ring shadow-md z-10"
                    )}
                />
                <div
                    className={cn(
                        `absolute top-1/2 -translate-y-1/2 h-0.5 ${isLeft ? "right-2 w-16" : "left-2 w-16"} bg-slate-400`
                    )}
                />
            </div>

            <div className={cn(`flex-1 ${!isLeft ? "" : "invisible"} z-20`)}>
                <div className={cn("flex flex-col md:min-w-[220px] gap-6")}>
                    <ItemGroup className={cn("gap-4 z-20")}>
                        <Item
                            variant="muted"
                            role="listitem"
                            className={cn("bg-card")}
                        >
                            <ItemMedia variant="icon">
                                {getIcon(event.id)}
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className={cn("md:text-2xl")}>
                                    {event.name}
                                </ItemTitle>
                                <ItemDescription className={cn("md:text-xl")}>
                                    {event.time_start} PM
                                </ItemDescription>
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </div>
            </div>
        </div>
    );
};

export default ScheduleBranch;
