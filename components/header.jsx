import ArabicNames from "@/components/ArabicNames";
import Count from "@/components/Count";
import { cn } from "@/lib/utils";
import DialogEmailInput from "@/components/DialogEmailInput";
import { Card, CardContent } from "./ui/card";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
    weight: "400",
    subsets: ["latin"],
});

const Header = () => {
    return (
        <div className={cn("flex justify-center")}>
            <div
                className={cn("flex mt-15 rounded-xl flex-col justify-center")}
            >
                <Card
                    className={cn(
                        "bg-background/40 backdrop-blur-xs shadow-2xl/50 inset-shadow-xs outline-double outline-zinc-300/25 dark:inset-shadow-gray-500 dark:shadow-3xl/50 dark:shadow-white/25"
                    )}
                >
                    <CardContent className={cn("")}>
                        <div className=" relative w-full  mx-auto justify-center items-center text-center">
                            <div className={cn("flex justify-center")}>
                                <div
                                    className={cn(
                                        "flex flex-col text-center mx-auto justify-center"
                                    )}
                                >
                                    <h1
                                        className={cn(
                                            "mt-5 ml-2 mr-2 mb-5 text-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl tracking-wide",
                                            playfairDisplay.className
                                        )}
                                    >
                                        You are invited to the wedding of
                                    </h1>
                                </div>
                            </div>

                            <ArabicNames
                                className={cn("text-white text-6xl")}
                            />
                            <div
                                className={cn(
                                    "flex justify-center object-scale-down"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex flex-col text-center mx-auto  rounded-xl justify-center"
                                    )}
                                >
                                    <h1
                                        className={cn(
                                            "text-sm mt-8 ml-2 mr-2 mb-2 text-lg xl:text-2xl lg:text-2xl md:text-xl sm:text-lg text-nowrap",
                                            playfairDisplay.className
                                        )}
                                    >
                                        November 26th, 2025
                                    </h1>
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "text-sm sm:text-lg md:text-xl lg:text-xl xl:text-2xl flex justify-center object-scale-down mb-5 mt-2"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex flex-col text-center mx-auto  rounded-xl justify-center",
                                        playfairDisplay.className
                                    )}
                                >
                                    <Count
                                        year={2025}
                                        month={11}
                                        days={26}
                                        down={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={cn("flex  justify-center w-full")}>
                            <DialogEmailInput />
                        </div>
                        <div className="mt-12 mb-5 flex justify-center">
                            <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Header;
