export const authConfig = {
    publicRoutes: ["/", "/auth/confirm", "/error"],
    protectedRoutes: ["/details", "/rsvp", "/rsvp/thanks", "/complete-profile"],
    unAuthedHomeRoute: "/",
    authedHomeRoute: "/details",
    ticketedRoute: ["/rsvp/thanks"],
    emailOnlyRoutes: ["/rsvp"],
    noEmailUpdateRoute: "/complete-profile",
    noEmailPlaceHolder: 'guest.ramyandshazia.com'
};
