import { Button, Center, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useRobotStore } from "../../hooks/useRobotStore";

const Home = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const handleRobotImport = async () => {
        try {
            // Call the C# executable via Electron's main process
            const robotModel = await (window as any).api.robotImport();
            useRobotStore((state) => state.updateRobotData(robotModel));
        } catch (error) {
            setErrorMessage(
                `Something went wrong. Please make sure Robot is open and contains timber elements, then try again. 
                If the problem persists, please contact me through the Contact page.`
            );
        }
    };

    return (
        <Center h="100%">
            <Stack className="mainContentContainer">
                <Text>
                    Import the loads on the timber structure from Robot using
                    the button below to get started.
                </Text>
                <Button
                    onClick={handleRobotImport}
                    variant="filled"
                    color="teal"
                >
                    Import Robot Loads
                </Button>
                {errorMessage && (
                    <Text c="red" fw={700}>
                        {errorMessage}
                    </Text>
                )}
            </Stack>
        </Center>
    );
};

export default Home;
