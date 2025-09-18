export const authConfig = {
    publicRoutes: ["/", "/auth/confirm", "/error", "/auth/confirm/email"],
    protectedRoutes: [
        "/details",
        "/rsvp",
        "/rsvp/thanks",
        "/complete-profile",
        "/travel",
    ],
    unAuthedHomeRoute: "/",
    authedHomeRoute: "/details",
    ticketedRoute: ["/rsvp/thanks"],
    emailOnlyRoutes: ["/rsvp"],
    profileCompleteRoute: "/complete-profile",
    noEmailPlaceHolder: "guest.ramyandshazia.com",
    phoneDeclinedPlaceHolder: "0000000000",
    authRoutes: ["/auth/confirm", "/auth/confirm/email"],
    adminRoutes: ["/admin/status"],
};
