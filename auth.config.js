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
    noEmailUpdateRoute: "/complete-profile",
    noEmailPlaceHolder: "guest.ramyandshazia.com",
    authRoutes: ["/auth/confirm", "/auth/confirm/email"],
};
