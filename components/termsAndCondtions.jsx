import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TermsConditions = () => {
    return (
        <Card
            className={cn(
                "flex flex-shrink max-w-[80%] sm:max-w-[85%] md:max-w-[70%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[60%] mx-auto mt-20 sm:mt-15 md:mt-15 lg:mt-13 xl:mt-13 2xl:mt-30 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
            )}
        >
            <CardHeader>
                <CardTitle className={cn("text-xl")}>
                    Terms Of Service
                </CardTitle>
                <CardDescription> Last Updated 08/11/2025</CardDescription>
            </CardHeader>
            <CardContent className={cn("flex flex-col space-y-4")}>
                <p>
                    Welcome to our wedding website! We are so excited to share
                    our special day with you. Before you use our website and
                    RSVP, please read these Terms of Service ("Terms")
                    carefully. By providing your phone number and using this
                    website, you agree to be bound by these Terms.
                </p>

                <h3 className={cn("font-bold")}>
                    1. SMS/Text Message Consent & Opt-In
                </h3>
                <p>
                    By providing your mobile phone number on this website, you
                    are giving your express written consent to receive SMS/text
                    messages from us regarding our wedding. These messages are
                    for informational purposes only and are intended to make our
                    wedding planning and communication as smooth as
                    possible.{" "}
                </p>
                <h3 className={cn("font-bold")}>2. What to Expect </h3>
                <p>
                    You can expect to receive messages related to our wedding,
                    which may include:
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        Your initial magic link invitation to our wedding
                        website.
                    </li>
                    <li>Confirmations of your RSVP.</li>
                    <li>
                        Important updates and reminders about wedding events
                        (e.g., ceremony time, reception location, schedule
                        changes).
                    </li>
                    <li>A thank you message after the wedding.</li>
                </ul>

                <p>
                    {" "}
                    We promise not to spam you and to only send messages
                    directly related to our wedding festivities.
                </p>
                <h3 className={cn("font-bold")}>3. How to Opt-Out </h3>
                <p>
                    You may opt-out of receiving SMS messages from us at any
                    time. To stop receiving messages, simply reply{" "}
                    <strong>"STOP"</strong> to any message you receive from us.
                    After you send the "STOP" message, we will send you one
                    final SMS message to confirm that you have been
                    unsubscribed. After this, you will no longer receive SMS
                    messages from us. If you change your mind and want to join
                    again, just let us know, and we will add you back to our
                    list.
                </p>

                <h3 className={cn("font-bold")}>4. Help </h3>
                <p>
                    If you are experiencing any issues or have questions, please
                    reply with the keyword <strong>"HELP"</strong> to any
                    message for more assistance, or you can get help directly by
                    contacting us at ramy@ramyandshazia.com.
                </p>

                <h3 className={cn("font-bold")}>5. Message and Data Rates</h3>
                <p>
                    As always, message and data rates may apply for any messages
                    sent to you from us and to us from you. If you have any
                    questions about your text plan or data plan, it is best to
                    contact your wireless provider.
                </p>

                <h3 className={cn("font-bold")}>6. Carrier Liability </h3>
                <p>
                    Carriers are not liable for delayed or undelivered messages.
                </p>

                <h3 className={cn("font-bold")}>7. Changes to These Terms</h3>
                <p>
                    We reserve the right to modify these Terms at any time. We
                    will notify you of any changes by posting the new Terms on
                    this page.
                </p>

                <h3 className={cn("font-bold")}>8. Contact Us</h3>
                <p>
                    If you have any questions about these Terms, please contact
                    us at ramy@ramyandshazia.com.
                </p>
            </CardContent>
        </Card>
    );
};

export default TermsConditions;
