import Nav from "@/components/Nav";

export default function protectedLayout({ children }) {
    return (
        <section>
            <Nav />
            {children}
        </section>
    );
}
