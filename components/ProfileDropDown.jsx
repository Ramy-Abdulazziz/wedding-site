"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "./AuthContextProvider";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { logoutSession } from "@/app/auth/confirm/_lib/actions";
import { toast } from "sonner";
import { authConfig } from "@/auth.config";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { LogOutIcon, UserPenIcon } from "lucide-react";
import UpdateContactForm from "./UpdateContactForm";
import { cn } from "@/lib/utils";
import parsePhoneNumber from "libphonenumber-js";
const ProfileDropDown = () => {
    const { getInitials, guestName, logout, loading, guestEmail, guestPhone } =
        useContext(AuthContext);
    const [initials, setInitials] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const router = useRouter();

    const handleLogout = async () => {
        const loggedOut = await logoutSession();
        if (loggedOut?.success) {
            toast.success("You have logged out successfully!");
            logout();
            router.push(authConfig.unAuthedHomeRoute);
        } else {
            toast.error(loggedOut.error);
        }
    };
    useEffect(() => {
        setInitials(getInitials()?.toUpperCase() || "");
    }, [guestName, getInitials]);

    if (loading) {
        return <Skeleton className="h-8 w-8 rounded-full" />;
    }

    return (
        !loading && (
            <>
                <DropdownMenu
                    className={cn("")}
                    open={isDropdownOpen}
                    onOpenChange={setIsDropdownOpen}
                >
                    <DropdownMenuTrigger>
                        <Avatar
                            className={cn(
                                "inline-flex items-center justify-center align-middle"
                            )}
                        >
                            <AvatarFallback
                                className={cn(
                                    "flex h-full w-full items-center justify-center"
                                )}
                            >
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <div
                            className={cn(
                                "flex flex-col justify-center items-center w-full"
                            )}
                        >
                            <DropdownMenuLabel>
                                {guestName || "Guest"}
                            </DropdownMenuLabel>
                            {guestEmail &&
                                !guestEmail.includes(
                                    authConfig.noEmailPlaceHolder
                                ) && (
                                    <DropdownMenuLabel>
                                        {guestEmail}
                                    </DropdownMenuLabel>
                                )}
                            {guestPhone &&
                                !(
                                    guestPhone ===
                                    authConfig.phoneDeclinedPlaceHolder
                                ) && (
                                    <DropdownMenuLabel>
                                        {parsePhoneNumber(
                                            guestPhone,
                                            "US"
                                        ).formatNational()}
                                    </DropdownMenuLabel>
                                )}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className={cn("")}
                            onSelect={() => {
                                setIsDropdownOpen(false);
                                setIsDialogOpen(true);
                            }}
                        >
                            <UserPenIcon />
                            Update Contact Info
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={handleLogout}>
                            <LogOutIcon />
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className={cn('flex flex-row')}>
                    <UpdateContactForm
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                    />
                </div>
            </>
        )
    );
};

export default ProfileDropDown;
