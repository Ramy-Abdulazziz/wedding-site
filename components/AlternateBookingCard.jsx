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

const AlternateBookingCard = ({ hotelDetails }) => {
    console.log(hotelDetails.bookingSite);
    const name = hotelDetails.name;
    const address = hotelDetails.address;
    const bookingSite = hotelDetails.bookingSite;
    const photoUrl = hotelDetails.url;
    const price = hotelDetails.price;

    return (
        <Card className={cn('flex flex-col h-full hover:shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 hover:dark:shadow-2xl/50 hover:dark:shadow-white/25')}>
            <CardHeader className={cn("flex flex-row justify-between md:min-h-12 lg:min-h-12 xl:min-h-5 2xl:min-h-5")}>
                <CardTitle>{name}</CardTitle>
                <CardAction className={cn("text-green-500")}>
                    {price}
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className={cn("flex flex-col space-y-5 ")}>
                    <div className={cn('relative w-full aspect-[4/3]')}>
                        <Image
                            src={photoUrl}
                            fill={true}
                            objectFit="contain"
                            alt="picture of hotel"
                        />
                    </div>
                    <div>{address}</div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    asChild
                    variant={"secondary"}
                    className={cn("flex w-full")}
                >
                    <Link href={bookingSite} target="_blank">
                        {" "}
                        Book
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AlternateBookingCard;
