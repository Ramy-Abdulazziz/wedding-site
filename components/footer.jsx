import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex w-full flex-row justify-center space-x-5 py-5 text-muted-foreground pt-[20vh] pb-10">
            <Link
                href="/opt-in/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className=""
            >
                Terms of Service{" "}
            </Link>
            <p>-</p>
            <Link
                href="/opt-in/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className=""
            >
                Privacy Policy
            </Link>
        </footer>
    );
};

export default Footer;
