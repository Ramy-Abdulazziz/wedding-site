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

export const MagicLinkEmail = ({ magicLink, name }) => {
    const previewText = `Your'e Invited to Ramy and Shazia's Wedding`;

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
                    <Container className="mx-auto my=[40px] max-w-[465px] rounded border border-solid p-[20px]">
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
                            Join Ramy and Shazia
                        </Heading>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Hello {name},
                        </Text>

                        <Text className="text-[14px] text-black leading-[24px]">
                            Ramy and Shazia have invited you to their wedding.
                            To access their wedding site click the button below
                        </Text>

                        <Section className="mt-[32px] mb-[32px] text-center">
                            <Button
                                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                                href={magicLink}
                            >
                                Join Ramy and Shazia
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

const MagicLinkEmailPreview = () => {
    const previewText = `Your'e Invited to Ramy and Shazia's Wedding`;
    const name = "Ramy Abdulazziz";
    const magicLink = "https://google.com";
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
                    <Container className="mx-auto my=[40px] max-w-[465px] rounded border border-solid p-[20px]">
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
                            Join Ramy and Shazia
                        </Heading>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Hello {name},
                        </Text>

                        <Text className="text-[14px] text-black leading-[24px]">
                            Ramy and Shazia have invited you to their wedding.
                            To access their wedding site click the button below
                        </Text>

                        <Section className="mt-[32px] mb-[32px] text-center">
                            <Button
                                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                                href={magicLink}
                            >
                                Join Ramy and Shazia
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};


export default MagicLinkEmailPreview; 