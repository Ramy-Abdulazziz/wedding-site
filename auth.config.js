export const authConfig = {
    publicRoutes: ["/", "/auth/confirm", "/error"],
    protectedRoutes: ["/details", "/rsvp", "/rsvp/thanks"],
    unAuthedHomeRoute: "/",
    authedHomeRoute: "/details",
    ticketedRoute: ["/rsvp/thanks"],
};
