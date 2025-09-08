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

export const OTPEmail = ({ name, otp }) => {
    const previewText = `Your one time pin`;

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
                            Your Requested One Time Pin
                        </Heading>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Hi {name},
                        </Text>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Your one time pin is:
                        </Text>
                        <Text className="flex flex-row justify-center w-full text-center text-[14px] text-black text-bf leading-[24px]">
                            {otp}
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default OTPEmail;
