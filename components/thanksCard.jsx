import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Image from "next/image";

const ThanksCard = () => {
    return (
        <Card
            className={cn(
                "flex flex-shrink max-w-[80%] sm:max-w-[85%] md:max-w-[70%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[60%] mx-auto mt-20 sm:mt-15 md:mt-15 lg:mt-13 xl:mt-13 2xl:mt-30 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
            )}
        >
            <CardHeader>
                <CardTitle className={cn("text-xl")}>Thanks!</CardTitle>
                <CardDescription className={cn("text-md")}>
                    Look out for an email confirmation of your RSVP.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div
                    className={cn(
                        "flex flex-col justify-center justify-items-center"
                    )}
                >
                    <div
                        className={cn(
                            "relative w-[50%] sm:w-[35%] md:w-[40%] lg:w-[30%] xl:w-[28%] 2xl:w-[30%] max-w-[800px] mx-auto flex justify-center justify-items-center-safe items-center"
                        )}
                    >
                        <Image
                            src="/us.png"
                            layout="responsive"
                            width={3}
                            height={4}
                            alt="Picture of wedding invitation"
                            className={cn()}
                        />
                    </div>

                    <div
                        className={cn(
                            " mx-auto max-w-md flex justify-center mt-5 text-justify"
                        )}
                    >
                        <p>
                            It means the world to us that you join us for our
                            special day. We look forward to seeing you. For any
                            issues with the RSVP process or form - please reach
                            out to Ramy.
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                {/* <div
                    className={cn(
                        "flex flex-row-reverse justify-between w-full "
                    )}
                >
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => redirect("/details")}
                    >
                        Home
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => redirect("/rsvp")}
                    >
                        Resubmit
                    </Button>
                </div> */}
            </CardFooter>
        </Card>
    );
};

export default ThanksCard;
