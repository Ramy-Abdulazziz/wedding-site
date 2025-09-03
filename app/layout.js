import "./globals.css";
import { cn } from "@/lib/utils";
import { Tajawal } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/theme-provider";
import Footer from "@/components/footer";
import { headers } from "next/headers";
import PathNameWrapper from "@/components/PathNameWrapper";

const tajawal = Tajawal({
    weight: "400",
    subsets: ["arabic"],
});

export const metadata = {
    title: "Ramy and Shazia's Wedding",
    description: "Ramy and Shazia's wedding website",
    openGraph: {
        title: "Ramy and Shazia's Wedding Site",
        description: "You're Invited to Ramy and Shazia's Wedding",
        url: "https://ramyandshazia.com",
        siteName: "Ramy and Shazia's Wedding Site",
        images: [
            {
                url: "https://ramyandshazia.com/site-card.png",
                width: 800,
                height: 600,
                alt: "",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default async function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={cn(tajawal.className)}
            suppressHydrationWarning
        >
            <body className={cn("")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="relative flex min-h-screen flex-col">
                        <main className="flex-1">{children}</main>
                        <PathNameWrapper />
                        <Toaster />
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
