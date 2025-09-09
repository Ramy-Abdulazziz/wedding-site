import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { FaGoogle } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CalendarPlus } from "lucide-react";

const AddToCalendar = ({ googleUrl, icalUrl }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"secondary"}
                    className={cn("mt-3 lg:text-lg xl:text-lg 2xl:text-xl ")}
                >
                    <CalendarPlus />
                    Add To Calendar
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("")}>
                <DropdownMenuItem asChild>
                    <div
                        className={cn(
                            "flex flex-row justify-left w-full text-center"
                        )}
                    >
                        <FaGoogle/>
                        <Link href={googleUrl}> Google </Link>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <a href={icalUrl} download>
                        <div
                            className={cn(
                                "flex items-center gap-2 cursor-pointer"
                            )}
                        >
                            <CalendarIcon/>
                            <span>iCal</span>
                        </div>
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AddToCalendar;
