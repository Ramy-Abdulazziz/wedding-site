"use client";
import {
    useCallback,
    useMemo,
    useState,
    createContext,
    useEffect,
} from "react";
import { createClient } from "@/utils/supabase/client";

export const AuthContext = createContext({
    guestData: null,
    guestName: null,
    loading: true,
});

const AuthContextProvider = ({ children }) => {
    const [guestData, setGuestData] = useState(null);
    const [guestName, setGuestName] = useState(null);
    const [guestEmail, setGuestEmail] = useState(null);
    const [guestPhone, setGuestPhone] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const setCurrentGuest = useCallback(
        (guest) => {
            setGuestData(guest);
            setGuestName(guest?.name || null);
            setGuestEmail(guest?.email || null);
            setGuestPhone(guest?.phone || null);
            setIsAdmin(guest?.groups.name === "Admin" ? true : false);
        },
        [guestData]
    );

    const updateGuestEmailContext = (email) => {
        setGuestEmail(email);
    };

    const updateGuestPhoneContext = (phone) => {
        setGuestPhone(phone);
    };
    const reloadGuestInfo = async () => {
        try {
            setLoading(true);
            const supabase = createClient();
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (!user || error) {
                logout();
                return;
            }
            if (error) {
                console.error("Unable to retrieve user info", error);
            }
            const { data: guestInfo, error: guestError } = await supabase
                .from("guests")
                .select("*")
                .eq("id", user.id)
                .single();

            if (guestInfo) {
                setCurrentGuest(guestInfo);
            } else {
                console.error("No guest info", guestError);
                logout();
            }
        } catch (e) {
            console.error("Error populating gust data", e);
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback(() => {
        setGuestData(null);
        setGuestName(null);
        setGuestEmail(null);
    }, [guestData]);

    const getInitials = useCallback(() => {
        if (!guestName) return "";
        const splitName = guestName.trim().split(" ");
        const first = splitName[0]?.[0] || "";
        const last = splitName[splitName.length - 1]?.[0] || "";
        return first + last;
    }, [guestName]);

    useEffect(() => {
        const loadGuestInfo = async () => {
            try {
                setLoading(true);
                const supabase = createClient();
                const {
                    data: { user },
                    error,
                } = await supabase.auth.getUser();
                if (!user || error) {
                    logout();
                    return;
                }
                if (error) {
                    console.error("Unable to retrieve user info", error);
                }
                const { data: guestInfo, error: guestError } = await supabase
                    .from("guests")
                    .select("*, groups(name)")
                    .eq("id", user.id)
                    .single();

                if (guestInfo) {
                    setCurrentGuest(guestInfo);
                } else {
                    console.error("No guest info", guestError);
                    logout();
                }
            } catch (e) {
                console.error("Error populating gust data", e);
            } finally {
                setLoading(false);
            }
        };

        loadGuestInfo();
    }, []);

    const contextValue = useMemo(
        () => ({
            guestData,
            setCurrentGuest,
            guestName,
            guestEmail,
            getInitials,
            logout,
            guestPhone,
            loading,
            reloadGuestInfo,
            updateGuestEmailContext,
            updateGuestPhoneContext,
            isAdmin,
        }),
        [
            guestData,
            setCurrentGuest,
            getInitials,
            guestName,
            guestEmail,
            logout,
            guestPhone,
            loading,
            reloadGuestInfo,
            updateGuestEmailContext,
            updateGuestPhoneContext,
            isAdmin,
        ]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
