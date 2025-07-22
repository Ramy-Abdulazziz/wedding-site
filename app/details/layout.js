import Nav from "@/components/Nav";

export default function detailsLayout({ children }) {
    return (
        <section>
            <Nav />
            {children}
        </section>
    );
}
