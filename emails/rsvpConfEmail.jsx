import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    pixelBasedPreset,
    Row,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

export const RsvpConfEmail = ({ namedGuests, plusOneGuests, name }) => {
    const previewText = `Your RSVP responses`;

    return (
        <Html>
            <Head />
            <Tailwind
                config={{
                    presets: [pixelBasedPreset],
                }}
            >
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Preview>{previewText}</Preview>
                    <Container className="mx-auto my=[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
                        <Section className="mt-[32px]">
                            <Img
                                src="https://www.ramyandshazia.com/emailIcon.png"
                                width="40"
                                height="37"
                                alt="R+S Logo"
                                className="mx-auto my-0"
                            />
                        </Section>
                        <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                            Your RSVP Responses
                        </Heading>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Hello {name},
                        </Text>

                        <Text className="text-[14px] text-black leading-[24px]">
                            We are so happy to have you join us on our special
                            day. Your RSVP submission is listed below. as a
                            reminder - you may update your RSVP as often as you
                            like until the RSVP deadline. Thank you again, and
                            we look forward to celebrating with you!
                        </Text>

                        <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
                        <Section>
                            {namedGuests.map((guest) => (
                                <Container
                                    key={guest.name}
                                    className="grid justify-items-center border border-[#eaeaea] border-solid p-[20px]"
                                >
                                    <span className="justify-self-center font-semibold">
                                        {guest.name} :{" "}
                                        {guest.attending
                                            ? "Attending"
                                            : "Not Attending"}
                                    </span>
                                </Container>
                            ))}

                            {plusOneGuests.map((guest) => (
                                <Container
                                    key={guest.name}
                                    className="grid justify-items-center  border border-[#eaeaea] border-solid p-[20px]"
                                >
                                    <span className="justify-self-center font-semibold">
                                        {guest.name} : Attending
                                    </span>
                                </Container>
                            ))}
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

const RsvpConfEmailPreview = () => {
    const previewText = `Your RSVP responses`;

    const namedGuestsMock = [
        { name: "Ramy Abdulazziz", attending: true },
        { name: "Shazia Naderi", attending: false },
    ];

    const nameMock = "Ramy Abdulazziz";

    const plusOneGuestsMock = [
        { name: "Yasmina Abdulazziz" },
        { name: "Nadia Abdulazzizz" },
    ];

    return (
        <Html>
            <Head />
            <Tailwind
                config={{
                    presets: [pixelBasedPreset],
                }}
            >
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Preview>{previewText}</Preview>
                    <Container className="mx-auto my=[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
                        <Section className="mt-[32px]">
                            <Img
                                src="https://www.ramyandshazia.com/emailIcon.png"
                                width="40"
                                height="37"
                                alt="R+S Logo"
                                className="mx-auto my-0"
                            />
                        </Section>
                        <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                            Your RSVP Responses
                        </Heading>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Hello {nameMock},
                        </Text>

                        <Text className="text-[14px] text-black leading-[24px]">
                            We are so happy to have you join us on our special
                            day. Your RSVP submission is listed below. as a
                            reminder - you may update your RSVP as often as you
                            like until the RSVP deadline. Thank you again, and
                            we look forward to celebrating with you!
                        </Text>

                        <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
                        <Section>
                            {namedGuestsMock.map((guest) => (
                                <Container
                                    key={guest.name}
                                    className="grid justify-items-center border border-[#eaeaea] border-solid p-[20px]"
                                >
                                    <span className="justify-self-center font-semibold">
                                        {guest.name} :{" "}
                                        {guest.attending
                                            ? "Attending"
                                            : "Not Attending"}
                                    </span>
                                </Container>
                            ))}

                            {plusOneGuestsMock.map((guest) => (
                                <Container
                                    key={guest.name}
                                    className="grid justify-items-center  border border-[#eaeaea] border-solid p-[20px]"
                                >
                                    <span className="justify-self-center font-semibold">
                                        {guest.name} : Attending
                                    </span>
                                </Container>
                            ))}
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default RsvpConfEmailPreview;
