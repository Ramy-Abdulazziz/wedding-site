import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full mr-6 md:mr-7 xl:mr-26"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    Will My Dietary Restrictions Be Accommodated?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        All food at the reception will be fully Halal, with
                        vegan and vegetarian options available as well.
                    </p>
                    <p>No alcoholic beverages will be served.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Are Children Invited?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        We adore your little ones, but we kindly ask that our
                        celebration remain adults-only. The only exception will
                        be for the children of our immediate family.
                    </p>
                    <p>
                        We truly appreciate your understanding and can’t wait to
                        celebrate with you!
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>
                    I missed the RSVP deadline - can I still respond?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
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
                <AccordionTrigger>
                    Can I bring additional guests?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        We are only able to accommodate the guests listed on
                        your invitation.
                    </p>
                    <p>We look forward to seeing you there!</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>What is the dress code?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        We kindly ask all guests to observe a formal dress code.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger>
                    What if i have questions, need help, or have issues with the
                    RSVP process?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
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
