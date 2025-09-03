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

export const SmsForwardEmail = ({ name, from, body }) => {
    const previewText = `You're Invited to Ramy and Shazia's Wedding`;

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
                            You received a message
                        </Heading>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Message from {name},
                        </Text>

                        <Text className="text-[14px] text-black leading-[24px]">
                            {body}
                        </Text>

                        <Section className="mt-[32px] mb-[32px] text-center">
                            <Text className="text-[14px] text-black leading-[24px]">
                                Respond to : {from}
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default SmsForwardEmail;
