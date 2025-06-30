import Nav from "@/components/Nav";

export default function RsvpLayout({ children }) {
    return (
        <section>
            <Nav />
            {children}
        </section>
    );
}
