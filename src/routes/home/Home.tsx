import { Button, Center, Stack, Text } from "@mantine/core";
import { useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
    const [result, setResult] = useState("");

    const handleRobotImport = async () => {
        try {
            // Call the C# executable via Electron's main process
            const robotModel = await (window as any).api.robotImport();
            setResult(`Result: ${robotModel}`);
        } catch (error) {
            setResult(`Error: ${error}`);
        }
    };

    return (
        <Center h="100%">
            <Stack className={styles.root}>
                <Text>
                    Import the loads on the timber structure from Robot using
                    the button below to get started.
                </Text>
                <Button onClick={handleRobotImport} variant="filled" color="teal">Import Robot Loads</Button>
                {result && <Text>{result}</Text>}
            </Stack>
        </Center>
    );
};

export default Home;
