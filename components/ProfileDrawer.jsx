"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
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
            <div className={cn("flex flex-row justify-left")}>{guestEmail}</div>
        )
    );
};

const PhoneSection = ({ guestPhone }) => {
    return (
        guestPhone &&
        !(guestPhone === authConfig.phoneDeclinedPlaceHolder) && (
            <div className={cn("flex flex-row justify-left")}>
                {parsePhoneNumber(guestPhone, "US").formatNational()}
            </div>
        )
    );
};

const ProfileDrawer = () => {
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
                <Drawer>
                    <DrawerTrigger asChild>
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
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className={cn("text-2xl")}>
                                {" "}
                                {guestName || "Guest"}
                            </DrawerTitle>
                            <DrawerDescription className={cn("text-lg")}>
                                <div
                                    className={cn(
                                        "flex flex-col justify-center items-center"
                                    )}
                                >
                                    <div>
                                        <EmailSection guestEmail={guestEmail} />
                                    </div>
                                    <div>
                                        <PhoneSection guestPhone={guestPhone} />
                                    </div>
                                </div>
                            </DrawerDescription>
                        </DrawerHeader>
                        <div
                            className={cn(
                                "flex flex-row justify-center gap-2 min-h-50 mt-2"
                            )}
                        >
                            <DrawerClose>
                                <div
                                    className={cn(
                                        "flex justify-center items-center border-1 max-w-35 min-w-30 h-25 mb-10 bg-card rounded-sm"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-2"
                                        )}
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        <UserPenIcon
                                            className={cn("w-10 h-10 shrink-0")}
                                        />
                                        <span className={cn(inter.className)}>
                                            Update Info
                                        </span>
                                    </div>
                                </div>
                            </DrawerClose>
                            <DrawerClose>
                                <div
                                    className={cn(
                                        "flex justify-center items-center border-1 max-w-35  min-w-30 h-25 mb-10 bg-card rounded-sm"
                                    )}
                                >
                                    {" "}
                                    <div
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-2"
                                        )}
                                        onClick={handleLogout}
                                    >
                                        <LogOutIcon
                                            className={cn("w-10 h-10 shrink-0")}
                                        />
                                        <span className={cn(inter.className)}>
                                            Log Out
                                        </span>
                                    </div>
                                </div>
                            </DrawerClose>
                        </div>
                    </DrawerContent>
                </Drawer>
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

export default ProfileDrawer;
