import { cn } from "@/lib/utils";
import {
    Card,
    CardHeader,
    CardTitle,
    CardAction,
    CardContent,
    CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { NavigationIcon, BedDoubleIcon } from "lucide-react";

const AlternateBookingCard = ({ hotelDetails }) => {
    const name = hotelDetails.name;
    const address = hotelDetails.address;
    const bookingSite = hotelDetails.bookingSite;
    const photoUrl = hotelDetails.url;
    const price = hotelDetails.price;
    const map = hotelDetails.map;

    return (
        <Card
            className={cn(
                "flex flex-col h-full hover:shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 hover:dark:shadow-2xl/50 hover:dark:shadow-white/25"
            )}
        >
            <CardHeader
                className={cn(
                    "flex flex-row justify-between items-center gap-2 min-h-10 md:min-h-12 lg:min-h-12 xl:min-h-5 2xl:min-h-5"
                )}
            >
                <CardTitle className={cn("")}>{name}</CardTitle>
                <CardAction className={cn("text-green-500 shrink-0")}>
                    {price}
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className={cn("flex flex-col space-y-5")}>
                    <div className={cn("relative w-full aspect-[4/3] h-full")}>
                        <Image
                            src={photoUrl}
                            fill={true}
                            objectFit="contain"
                            alt={`picture of hotel ${name}`}
                        />
                    </div>
                    <div className={cn("")}>{address} </div>
                </div>
            </CardContent>
            <CardFooter>
                <div
                    className={cn(
                        "flex w-full flex-row justify-center space-x-2"
                    )}
                >
                    <Button
                        asChild
                        variant={"secondary"}
                        className={cn("grow-3")}
                    >
                        <Link href={bookingSite} target="_blank">
                            {" "}
                            <BedDoubleIcon />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant={"secondary"}
                        className={cn("grow-3")}
                    >
                        <Link href={map} target="_blank">
                            <NavigationIcon />
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default AlternateBookingCard;
