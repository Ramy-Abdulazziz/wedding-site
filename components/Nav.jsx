"use client";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
    navigationMenuLinkStyle,
} from "@/components/ui/navigation-menu";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const Nav = () => {
    return (
        <div
            className={cn(
                "sticky top-0 z-50 w-full h-full flex flex-row bg-background/85 shadow-md dark:shadow-white/25 dark:shadow-xl/50"
            )}
        >
            <NavigationMenu
                viewport={false}
                className={cn(
                    "hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex w-full"
                )}
            >
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={cn(navigationMenuLinkStyle())}
                        >
                            <Link href="/rsvp">RSVP</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={cn(navigationMenuLinkStyle())}
                        >
                            <Link href="/details#when">Details</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={cn(
                                navigationMenuLinkStyle(),
                                "pointer-events-none text-gray-500"
                            )}
                        >
                            <Link href="/details#rsvp">Registry</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={cn(navigationMenuLinkStyle())}
                        >
                            <Link href="/details#faq">FAQ</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={cn(
                                navigationMenuLinkStyle(),
                                "pointer-events-none text-gray-500"
                            )}
                        >
                            <Link href="/details#travel">Travel</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div
                className={cn(
                    "hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex w-full justify-end pr-2"
                )}
            >
                <ThemeToggle />
            </div>
            <div
                className={cn(
                    "flex sm:flex md:flex lg:hidden xl:hidden 2xl:hidden w-full justify-start pl-2 pt-2 pb-2"
                )}
            >
                <Sheet className={cn('')}>
                    <SheetTrigger>
                        <MenuIcon />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Ramy and Shazia's Wedding</SheetTitle>
                        </SheetHeader>
                        <div className={cn("flex flex-col h-full")}>
                            <div className={cn("pl-5")}>
                                <div className={cn("flex flex-col mb-2")}>
                                    <p className={cn("text-gray-500")}>
                                        Details
                                    </p>
                                    <SheetClose asChild>
                                        <Link
                                            href="/details#when"
                                            className={cn("text-2xl")}
                                        >
                                            When
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/details#where"
                                            className={cn("text-2xl")}
                                        >
                                            Where
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/details#faq"
                                            className={cn("text-2xl")}
                                        >
                                            FAQ
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/details#faq"
                                            className={cn(
                                                "text-2xl pointer-events-none text-gray-500"
                                            )}
                                        >
                                            Registry
                                        </Link>
                                    </SheetClose>
                                </div>
                                <div className={cn("flex flex-col mb-2")}>
                                    <p className={cn("text-gray-500")}>RSVP</p>
                                    <SheetClose asChild>
                                        <Link
                                            href="/rsvp"
                                            className={cn("text-2xl")}
                                        >
                                            Find Your Invite
                                        </Link>
                                    </SheetClose>
                                </div>
                                <div className={cn("flex flex-col mb-2")}>
                                    <p className={cn("text-gray-500 ")}>
                                        Travel
                                    </p>
                                    <SheetClose asChild>
                                        <Link
                                            href="/rsvp"
                                            className={cn(
                                                "text-2xl pointer-events-none text-gray-500"
                                            )}
                                        >
                                            Hotel Block
                                        </Link>
                                    </SheetClose>
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "flex flex-col h-full justify-end pb-5 pl-5"
                                )}
                            >
                                <ThemeToggle />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Nav;
