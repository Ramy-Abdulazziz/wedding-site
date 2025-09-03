export const metadata = {
    title: "Ramy & Shazia's Wedding 🎉",
    description: "Tap to RSVP and see details about Ramy & Shazia's wedding!",
    openGraph: {
        title: "You're invited to Ramy & Shazia's Wedding 🎉",
        description: "Tap to RSVP and see details about the wedding!",
        url: "https://ramyandshazia.com/auth/confirm",
        images: [
            {
                url: "https://ramyandshazia.com/site-card.png",
                width: 800,
                height: 600,
            },
        ],
    },
};

export default function authLayout({ children }) {
    return <>{children}</>;
}
