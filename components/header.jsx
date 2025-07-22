"use client"

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
import { useRouter } from "next/navigation";
const Header = () => {
    const router = useRouter();

    const handleSubmit = () => {
        router.push("/rsvp", { scroll: false });
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
                    <form onSubmit={() => handleSubmit()}>
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
                            <DialogHeader>
                                <DialogTitle> Get Access and RSVP</DialogTitle>
                                <DialogDescription>
                                    We are limiting access to only invited
                                    guests please enter your email to get access
                                    and a link to enter will be emailed to you
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Email</Label>
                                    <Input id="email" name="email" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Close
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button asChild variant="secondary">
                                        <Link href="/rsvp"> Submit</Link>
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>
            <div className="mt-12 flex justify-center">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            </div>
        </>
    );
};

export default Header;
