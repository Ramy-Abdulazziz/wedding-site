"use client";

import ArabicNames from "@/components/ArabicNames";
import Count from "@/components/Count";
import { cn } from "@/lib/utils";
import DialogEmailInput from "@/components/DialogEmailInput";
import { useSearchParams } from "next/navigation";
import AuthSignIn from "./AuthSignIn";

const AuthHeader = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const next = searchParams.get("next");

    return (
        <>
            <div className=" relative w-full mx-auto justify-center items-center text-center">
                <div className={cn("flex justify-center")}>
                    <h1
                        className={cn(
                            "mt-30 text-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl"
                        )}
                    >
                        You are invited to the wedding of
                    </h1>
                </div>

                <ArabicNames className={cn("text-white text-6xl")} />
                <div className={cn("flex justify-center object-scale-down")}>
                    <h1
                        className={cn(
                            "text-sm mt-10 mb-2 sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-nowrap"
                        )}
                    >
                        November 26th, 2025
                    </h1>
                </div>
                <div
                    className={cn(
                        "text-sm sm:text-lg md:text-xl lg:text-xl xl:text-2xl flex justify-center object-scale-down mb-8 "
                    )}
                >
                    <Count year={2025} month={10} days={26} down={true} />
                </div>
            </div>

            <div className={cn("flex  justify-center w-full")}>
                <AuthSignIn token={token} type={type} next={next} />
            </div>
            <div className="mt-12 flex justify-center">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            </div>
        </>
    );
};

export default AuthHeader;
