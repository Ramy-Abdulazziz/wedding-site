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
            className="w-full"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    Will My Dietary Restrictions Be Accomadated?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        All food at the reception will be fully Halal. There
                        will also be Vegan/Vegetarian options.
                    </p>
                    <p>
                        Unfourtunately we will not be able to accomadate any
                        other dietary restrictions as we are using a set menu.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Are Children Allowed?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        We are only inviting a select few children that are
                        close relatives of the bride and groom.
                    </p>
                    <p>
                        Other children will not be allowed during any part of
                        the reception, or ceremony.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>
                    What food and drinks will be served?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        Guests will have unlimited soft drinks and mock tails.
                        No alcoholic beverages will be served.
                    </p>
                    <p>
                        Food will be a mix of different dishes featuring a
                        variety of cuisine. Each guest will additionally have a
                        choice of one of 7 entrees. Rest assured, there will be
                        something for everyone.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>
                    I missed the RSVP deadline - can an exception be made?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>No.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>
                    Can I get an aditional plus one?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>No.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default Faq;
