import TopoBack from "@/components/TopoBack";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Tajawal } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import Nav from "@/components/Nav";

const tajawal = Tajawal({
    weight: "400",
    subsets: ["arabic"],
});

export const metadata = {
    title: "Ramy and Shazia's Wedding",
    description: "Ramy and Shazia's wedding website",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={cn(tajawal.className)}
            suppressHydrationWarning
        >
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className={cn("relative z-20")}>
                        {" "}
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
