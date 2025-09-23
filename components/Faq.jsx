import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const Faq = () => {
    return (
        <Accordion
            type="single"
            collapsible
            className={cn("w-full mr-6 md:mr-7 xl:mr-26")}
        >
            <AccordionItem value="item-1">
                <AccordionTrigger
                    className={cn("text-md lg:text-lg xl:text-lg 2xl:text-xl")}
                >
                    Will My Dietary Restrictions Be Accommodated?
                </AccordionTrigger>
                <AccordionContent
                    className={cn(
                        "text-lg flex flex-col gap-4 text-pretty text-md lg:text-lg xl:text-lg 2xl:text-xl"
                    )}
                >
                    <p>
                        All food at the reception will be fully Halal, with
                        vegan and vegetarian options available as well.
                    </p>
                    <p>No alcoholic beverages will be served.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger
                    className={cn("text-md lg:text-lg xl:text-lg 2xl:text-xl")}
                >
                    Are Children Invited?
                </AccordionTrigger>
                <AccordionContent
                    className={cn(
                        "flex flex-col gap-4 text-pretty text-md lg:text-lg xl:text-lg 2xl:text-xl"
                    )}
                >
                    <p>
                        We adore your little ones, but we kindly ask that our
                        celebration remain adults-only. As such, no children
                        are allowed.
                    </p>
                    <p>
                        We truly appreciate your understanding and can't wait to
                        celebrate with you!
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger
                    className={cn("text-md lg:text-lg xl:text-lg 2xl:text-xl")}
                >
                    I missed the RSVP deadline - can I still respond?
                </AccordionTrigger>
                <AccordionContent
                    className={cn(
                        "flex flex-col gap-4 text-pretty text-md lg:text-lg xl:text-lg 2xl:text-xl"
                    )}
                >
                    <p>
                        Unfortunately we aren't able to accept RSVPs after the
                        deadline as we've already finalized details with our
                        venue and vendors.
                    </p>
                    <p>
                        Thank you for understanding and we hope to celebrate
                        together in the future!
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger
                    className={cn("text-md lg:text-lg xl:text-lg 2xl:text-xl")}
                >
                    Can I bring additional guests?
                </AccordionTrigger>
                <AccordionContent
                    className={cn(
                        "flex flex-col gap-4 text-pretty text-md lg:text-lg xl:text-lg 2xl:text-xl"
                    )}
                >
                    <p>
                        We are only able to accommodate the guests listed on
                        your invitation.
                    </p>
                    <p>We look forward to seeing you there!</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger
                    className={cn("text-md lg:text-lg xl:text-lg 2xl:text-xl")}
                >
                    What is the dress code?
                </AccordionTrigger>
                <AccordionContent
                    className={cn(
                        "flex flex-col gap-4 text-pretty text-md lg:text-lg xl:text-lg 2xl:text-xl"
                    )}
                >
                    <p>
                        We kindly ask all guests to observe a formal dress code.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger
                    className={cn("text-md lg:text-lg xl:text-lg 2xl:text-xl")}
                >
                    What if i have questions, need help, or have issues with the
                    RSVP process?
                </AccordionTrigger>
                <AccordionContent
                    className={cn(
                        "flex flex-col gap-4 text-pretty text-md lg:text-lg xl:text-lg 2xl:text-xl"
                    )}
                >
                    <p>
                        If you have any issues, questions, or concerns please
                        reach out to Ramy and Shazia via text at 631-869-7432.
                    </p>
                    <p>You can also email Ramy at ramy@ramyandshazia.com</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default Faq;
