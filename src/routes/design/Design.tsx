import { Button, Center, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useTeddsStore } from "../../hooks/useTeddsStore";

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
    const [errorMessage, setErrorMessage] = useState("");
    const [parentWindowName, setWindowName] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const updateTeddsData = useTeddsStore((state) => state.updateTeddsData);

    const numMembers = robotData.length;
    let totalTimeEstimate = "";
    const timeEstimatePerDesign = 10;
    if (numMembers * timeEstimatePerDesign < 60) {
        totalTimeEstimate = `${numMembers * timeEstimatePerDesign}s`;
    } else {
        totalTimeEstimate = `${
            Math.round(numMembers * timeEstimatePerDesign * 100) / 100
        }min`;
    }

    useEffect(() => {
        (async () => {
            const name = await (window as any).api.getProcessName();
            setWindowName(name);
        })();
    }, []);

    const handleTeddsDesign = async () => {
        setButtonDisabled(true);
        try {
            // Call the C# executable via Electron's main process
            const teddsDesign = await (window as any).api.teddsDesign(
                parentWindowName,
                JSON.stringify(robotData)
            );
            const teddsDesignJson = JSON.parse(teddsDesign);
            updateTeddsData(teddsDesignJson);
        } catch (error) {
            setErrorMessage(
                `Something went wrong. Please make sure Tekla Tedds is installed, then try again. 
                If the problem persists, please contact me through the Contact page.`
            );
        }
        setButtonDisabled(false);
    };

    return (
        <Center h="100%">
            <Stack className="mainContentContainer">
                <Text>
                    Send the Robot model data to design in Tedds by clicking the
                    button below. There are {numMembers} members to design, so
                    it's expected this will take {totalTimeEstimate} to
                    complete.
                </Text>
                <Button
                    onClick={handleTeddsDesign}
                    variant="filled"
                    color="teal"
                    disabled={buttonDisabled}
                >
                    Design Structure
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

export default Design;
