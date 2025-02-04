import { Center, List, ListItem, Stack, Text } from "@mantine/core";

const Contact = () => {
    return (
        <Center h="100%">
            <Stack className="mainContentContainer">
                <Text>
                    For help using this software, or if you want to suggest new
                    features or bug fixes, please get in touch with me using the
                    details below:
                    <List withPadding pt="0.5rem">
                        <List.Item>Name: Seif Fahmy</List.Item>
                        <List.Item>Email: s.fahmy@cundall.com</List.Item>
                    </List>
                </Text>
            </Stack>
        </Center>
    );
};

export default Contact;
