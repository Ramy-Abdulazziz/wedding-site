"use client";

import ArabicNames from "@/components/ArabicNames";
import Count from "@/components/Count";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { sendMagicLink } from "@/app/auth/actions";
const Header = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("sending");
        setLoading(true);
        setMessage("Checking guest list...");

        const result = await sendMagicLink(email);
        if (result?.error) {
            setMessage(result.error);
        } else {
            setMessage("✅ Magic link sent! Check your email.");
        }

        setLoading(false);
    };

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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "mt-3 lg:text-lg xl:text-lg 2xl:text-xl w-20p"
                            )}
                        >
                            Get Access & RSVP
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle> Get Access and RSVP</DialogTitle>
                                <DialogDescription>
                                    We are limiting access to only invited
                                    guests please enter your email to get access
                                    and a link to enter will be emailed to you
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 mt-5">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                {message && (
                                    <p className="text-sm text-center text-muted-foreground">
                                        {message}
                                    </p>
                                )}
                            </div>
                            <DialogFooter className={cn('mt-5')}>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button type="submit" variant="secondary" disabled={loading}>
                                    {loading ? "Sending..." : "Send Magic Link"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="mt-12 flex justify-center">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            </div>
        </>
    );
};

export default Header;
