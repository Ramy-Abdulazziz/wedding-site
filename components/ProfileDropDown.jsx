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
import {
    LogOutIcon,
    PhoneIcon,
    UserPenIcon,
    ShieldUserIcon,
} from "lucide-react";
import UpdateContactForm from "./UpdateContactForm";
import { cn } from "@/lib/utils";
import parsePhoneNumber from "libphonenumber-js";
import { Inter } from "next/font/google";

const inter = Inter({
    weight: "400",
    subsets: ["latin"],
});

const EmailSection = ({ guestEmail }) => {
    return (
        guestEmail &&
        !guestEmail.includes(authConfig.noEmailPlaceHolder) && (
            <DropdownMenuLabel>
                <div className={cn("flex flex-row justify-left")}>
                    {guestEmail}
                </div>
            </DropdownMenuLabel>
        )
    );
};

const PhoneSection = ({ guestPhone }) => {
    return (
        guestPhone &&
        !(guestPhone === authConfig.phoneDeclinedPlaceHolder) && (
            <DropdownMenuLabel>
                <div className={cn("flex flex-row justify-left")}>
                    {parsePhoneNumber(guestPhone, "US").formatNational()}
                </div>
            </DropdownMenuLabel>
        )
    );
};

const ProfileDropDown = () => {
    const {
        getInitials,
        guestName,
        logout,
        loading,
        guestEmail,
        guestPhone,
        isAdmin,
    } = useContext(AuthContext);
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
                            className={cn("flex justify-center items-center")}
                        >
                            <AvatarFallback
                                className={cn(
                                    "flex items-center justify-center"
                                )}
                            >
                                <span
                                    className={cn("text-sm ", inter.className)}
                                >
                                    {initials}
                                </span>
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <div
                            className={cn("flex flex-col justify-left w-full")}
                        >
                            <DropdownMenuLabel className={cn("")}>
                                {guestName || "Guest"}
                            </DropdownMenuLabel>
                            <div>
                                <EmailSection guestEmail={guestEmail} />
                            </div>
                            <div>
                                <PhoneSection guestPhone={guestPhone} />
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className={cn("inline-flex items-baseline ")}
                            onSelect={() => {
                                setIsDropdownOpen(false);
                                setIsDialogOpen(true);
                            }}
                        >
                            <div
                                className={cn(
                                    "inline-flex  items-center justify-center text-xs space-x-2",
                                    inter.className
                                )}
                            >
                                <UserPenIcon
                                    className={cn("w-5 h-5 shrink-0")}
                                />
                                <span>Update Contact Info</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={handleLogout}>
                            <div
                                className={cn(
                                    "inline-flex  items-center justify-center text-xs space-x-2",
                                    inter.className
                                )}
                            >
                                <LogOutIcon
                                    className={cn("w-5 h-5 shrink-0")}
                                />
                                <span>Log Out</span>
                            </div>
                        </DropdownMenuItem>
                        {isAdmin && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onSelect={() =>
                                        router.push("/admin/status")
                                    }
                                >
                                    <div
                                        className={cn(
                                            "inline-flex  items-center justify-center text-xs space-x-2",
                                            inter.className
                                        )}
                                    >
                                        <ShieldUserIcon
                                            className={cn("w-5 h-5 shrink-0")}
                                        />
                                        <span>Admin Panel</span>
                                    </div>
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className={cn("flex flex-row")}>
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
