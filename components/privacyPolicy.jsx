import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PrivacyPolicy = () => {
    return (
        <Card
            className={cn(
                "flex flex-shrink max-w-[80%] sm:max-w-[85%] md:max-w-[70%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[60%] mx-auto mt-20 sm:mt-15 md:mt-15 lg:mt-13 xl:mt-13 2xl:mt-30 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
            )}
        >
            <CardHeader>
                <CardTitle className={cn("text-xl")}> Privacy Policy</CardTitle>
                <CardDescription> Last Updated 08/11/2025</CardDescription>
            </CardHeader>
            <CardContent className={cn("flex flex-col space-y-4")}>
                <p>
                    Your privacy is very important to us. This Privacy Policy
                    explains how we collect, use, and protect your personal
                    information in connection with our wedding website.
                </p>

                <h3 className={cn("font-bold")}>1. Information We Collect</h3>
                <p>
                    We may collect the following personal information from you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-left">
                    <li>
                        <strong>Contact Information:</strong> Your full name,
                        phone number, and email address.
                    </li>
                    <li>
                        <strong>RSVP Information:</strong> Your response to our
                        wedding invitation (attending or not attending), meal
                        preferences, and any plus-ones you may bring.
                    </li>
                    <li>
                        <strong>Guest Information:</strong> Information you
                        voluntarily provide, such as song requests or messages
                        to the couple.
                    </li>
                </ul>
                <h3 className={cn("font-bold")}>
                    2. How We Use Your Information
                </h3>
                <p>
                    We use the information we collect for the sole purpose of
                    our wedding planning and to communicate with you about our
                    wedding. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        Sending you your magic link invitation and other
                        wedding-related SMS messages.
                    </li>
                    <li>Managing our guest list and RSVPs.</li>
                    <li>
                        Coordinating with our wedding vendors (for example,
                        providing the caterer with a headcount and meal
                        choices).
                    </li>
                    <li>
                        Keeping you informed of any updates or changes to our
                        wedding plans.
                    </li>
                </ul>

                <h3 className={cn("font-bold")}>
                    3. Data Storage and Security
                </h3>
                <p>
                    All personal information you provide is securely stored on
                    Supabase. We have taken appropriate measures to protect your
                    data from unauthorized access, use, or disclosure.
                </p>

                <h3 className={cn("font-bold")}>
                    4. Information Sharing and Disclosure
                </h3>
                <p>
                    We will not sell, rent, or share your personal information
                    with any third parties for marketing purposes. Your
                    information will only be shared with our trusted wedding
                    vendors for the express purpose of organizing our wedding.
                    For example, we may share guest names with our wedding
                    planner or the venue for seating arrangements.
                </p>

                <h3 className={cn("font-bold")}>5. Your Data Rights</h3>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-left">
                    <li>
                        Request a copy of the personal information we hold about
                        you.
                    </li>
                    <li>Request that we correct any inaccurate information.</li>
                    <li>
                        Request that we delete your personal information from
                        our records.
                    </li>
                </ul>
                <p>
                    To exercise any of these rights, please contact us at
                    ramy@ramyandshazia.com.
                </p>

                <h3 className={cn("font-bold")}>
                    6. Changes to This Privacy Policy
                </h3>
                <p>
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page.
                </p>

                <h3 className={cn("font-bold")}>7. Contact Us</h3>
                <p>
                    If you have any questions or concerns about our use of your
                    personal information, please contact us at
                    ramy@ramyandshazia.com.
                </p>
            </CardContent>
        </Card>
    );
};

export default PrivacyPolicy;
