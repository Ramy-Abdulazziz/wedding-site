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
import { Separator } from "./ui/separator";

const HotelBlockInfoCard = () => {
    return (
        <Card
            className={cn(
                "flex flex-col h-full shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
            )}
        >
            <CardHeader className={cn("flex flex-row justify-between")}>
                <CardTitle className={cn("text-2xl")}>
                    {" "}
                    Holiday Inn Plainview
                </CardTitle>
                <CardAction className={cn("text-xl text-green-500")}>
                    $140/night
                </CardAction>
            </CardHeader>
            <CardContent>
                <div
                    className={cn(
                        "flex flex-col h-full md:flex-row lg:flex-row xl:flex-row 2xl:flex-row space-y-5 "
                    )}
                >
                    <div
                        className={cn(
                            "relative w-full md:max-w-sm lg:max-w-xl xl:max-w-xl 2xl:max-w-xl aspect-[4/3]"
                        )}
                    >
                        <Image
                            src={
                                "https://lh3.googleusercontent.com/p/AF1QipPPbqt1gPsLIFZ3eQN8Ux0cbCF-q-dfhFAnLdbT=s873-k-no"
                            }
                            fill={true}
                            objectFit="contain"
                            alt="picture of hotel"
                        />
                    </div>
                    <div
                        className={cn(
                            "-mb-1 xl:mb-5 xl-mt-5 xl:ml-5 2xl:mb-5 2xl:mt-5 2xl:ml-5 "
                        )}
                    >
                        <Separator
                            orientation="vertical"
                            className={cn("h-full ml-5 mr-5 pb-0")}
                        />
                    </div>
                    <div
                        className={cn(
                            "container mx-auto flex flex-col h-full space-y-5 md:max-w-md lg:max-w-lg xl:max-w-xl md:mt-5 lg:mt-0 xl:mt-5 2xl:mt-5"
                        )}
                    >
                        <div
                            className={cn(
                                "container mx-auto text-justify hyphens-auto text-sm lg:text-xl xl:text-xl 2xl:text-xl"
                            )}
                        >
                            A hotel block has been reserved and can be booked
                            using the link below (use Group Code: ABD). Rooms
                            are limited so we recommend booking as soon as
                            possible. Additional accommodations are listed
                            below, but no hotel block has been set up for them.
                        </div>
                        <div id="when" className={cn("scroll-mt-24")}>
                            <p
                                className={cn(
                                    "text-md text-gray-500 lg:text-lg xl:text-lg 2xl:text-xl"
                                )}
                            >
                                {" "}
                                Deadline
                            </p>

                            <div>
                                <p
                                    className={cn(
                                        "text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl"
                                    )}
                                >
                                    October 25th, 2025
                                </p>
                            </div>
                        </div>
                        <div id="when" className={cn("scroll-mt-24")}>
                            <p
                                className={cn(
                                    "text-md text-gray-500 lg:text-lg xl:text-lg 2xl:text-xl"
                                )}
                            >
                                {" "}
                                Address
                            </p>

                            <div>
                                <p
                                    className={cn(
                                        "text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl"
                                    )}
                                >
                                    215 Sunnyside Blvd, Plainview, NY 11803
                                </p>
                            </div>
                        </div>
                        <div
                            className={cn(
                                "flex flex-row justify-content-center justify-center w-full mt-15 md:mt-5"
                            )}
                        >
                            <Button
                                asChild
                                variant={"secondary"}
                                className={cn(
                                    "md:text-md lg:text-xl 2xl:text-xl hidden w-full sm:hidden md:flex lg:flex lg:max-w-lg xl:flex xl:max-w-xl xl:mt-10 2xl:flex 2xl:max-w-xl "
                                )}
                            >
                                <Link
                                    href="https://www.ihg.com/holidayinn/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qDest=215%20Sunnyside%20Blvd,%20Plainview,%20NY%2011803,%20USA&qErm=false&qSlH=nycpv&qRms=1&qAdlt=1&qChld=0&qCiD=26&qCiMy=102025&qCoD=27&qCoMy=102025&qGrpCd=ABD&setPMCookies=true&qSHBrC=HI&qpMbw=0&qpMn=1&srb_u=1&qRmFltr="
                                    target="_blank"
                                >
                                    {" "}
                                    Book{" "}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter
                className={cn("md:hidden lg:hidden xl:hidden 2xl:hidden")}
            >
                <Button
                    asChild
                    variant={"secondary"}
                    className={cn("flex w-full -mt-10")}
                >
                    <Link
                        href="https://www.ihg.com/holidayinn/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qDest=215%20Sunnyside%20Blvd,%20Plainview,%20NY%2011803,%20USA&qErm=false&qSlH=nycpv&qRms=1&qAdlt=1&qChld=0&qCiD=26&qCiMy=102025&qCoD=27&qCoMy=102025&qGrpCd=ABD&setPMCookies=true&qSHBrC=HI&qpMbw=0&qpMn=1&srb_u=1&qRmFltr="
                        target="_blank"
                    >
                        {" "}
                        Book{" "}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default HotelBlockInfoCard;
