import Nav from "@/components/Nav";

export default function rsvpLayout({ children }) {
    return (
        <section>
            <Nav />
            {children}
        </section>
    );
}
