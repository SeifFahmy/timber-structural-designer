import { Center, Stack, Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";

// const parentWindowName = "Code";
const robotData = [
    {
        id: 1,
        momentMajor: 45,
        momentMinor: 0,
        shearMajor: 123,
        shearMinor: 123,
        axial: 0,
        length: 3,
    },
    {
        id: 2,
        momentMajor: 60,
        momentMinor: 0,
        shearMajor: 150,
        shearMinor: 150,
        axial: 150,
        length: 5,
    },
];

const Design = () => {
    const [result, setResult] = useState("");
    const [parentWindowName, setWindowName] = useState("");

    useEffect(() => {
        (async () => {
            const name = await (window as any).api.getProcessName();
            setWindowName(name);
        })();
    }, []);

    const handleTeddsDesign = async () => {
        try {
            // Call the C# executable via Electron's main process
            const teddsDesign = await (window as any).api.teddsDesign(
                parentWindowName,
                JSON.stringify(robotData)
            );
            setResult(`Result: ${teddsDesign}`);
        } catch (error) {
            setResult(`Error: ${error}`);
        }
        // console.log(JSON.stringify(robotData));
        // console.log(parentWindowName);
    };
    return (
        <Center h="100%">
            <Stack className="mainContentContainer">
                <Text>
                    Send the Robot model data to design in Tedds by clicking the
                    button below.
                </Text>
                <Button
                    onClick={handleTeddsDesign}
                    variant="filled"
                    color="teal"
                >
                    Design Structure
                </Button>
                {result && <Text>{result}</Text>}
            </Stack>
        </Center>
    );
};

export default Design;
