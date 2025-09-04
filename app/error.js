"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default function GlobalErrorPage() {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const showErrorToast = () => {
            toast.error("Uh oh - something went wrong!");
        };

        showErrorToast();
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            redirect("/");
        }
        const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <div className={cn("container mx-auto")}>
            <Card
                className={cn(
                    "mt-20 flex flex-shrink max-w-[80%] sm:max-w-[85%] md:max-w-[70%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[60%] mx-auto mt-20 sm:mt-15 md:mt-15 lg:mt-13 xl:mt-13 2xl:mt-30 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
                )}
            >
                <CardHeader>
                    <CardTitle className={cn("text-xl")}>Uh Oh!</CardTitle>
                    <CardDescription className={cn("text-md")}>
                        Something went wrong...
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
                                Try requesting a new log in link or retrying
                                your last action. If you are consistently seeing
                                this page please reach out to Ramy at
                                ramy@ramyandshazia.com.
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter
                    className={cn(
                        " mx-auto max-w-md flex justify-center mt-5 text-justify"
                    )}
                >
                    Redirecting you home in {countdown}...
                </CardFooter>
            </Card>
        </div>
    );
}
