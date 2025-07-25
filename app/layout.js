import "./globals.css";
import { cn } from "@/lib/utils";
import { Tajawal } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/theme-provider";
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
                url: "https://ramyandshazia.com/PREVIEW.png",
                width: 800,
                height: 600,
                alt: "",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({ children }) {
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
                    <main className={cn("relative z-20")}>
                        <div className="min-h-screen bg-gradient-to-b from-slate-100 to-zinc-100 dark:from-zinc-900 dark:to-background">
                            <Toaster />
                            {children}
                        </div>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
