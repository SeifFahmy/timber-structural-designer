import { Button, Center, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useTeddsStore } from "../../hooks/useTeddsStore";
import { useRobotStore } from "../../hooks/useRobotStore";

// const robotData = [
//     {
//         id: 1,
//         momentMajor: 45,
//         momentMinor: 0,
//         shearMajor: 123,
//         shearMinor: 123,
//         axial: 0,
//         length: 3,
//     },
//     {
//         id: 2,
//         momentMajor: 60,
//         momentMinor: 0,
//         shearMajor: 150,
//         shearMinor: 150,
//         axial: 150,
//         IsAxialMember: false,
//     },
// ];

// [
//     {
//         "Id": 1,
//         "MomentMajor": -0.56,
//         "MomentMinor": -0.37,
//         "ShearMajor": 0.15,
//         "ShearMinor": 0.08,
//         "Axial": 10.24,
//         "IsAxialMember": false
//     },
//     {
//         "Id": 2,
//         "MomentMajor": -0.35,
//         "MomentMinor": -0.19,
//         "ShearMajor": 0.12,
//         "ShearMinor": 0.04,
//         "Axial": 210.01,
//         "IsAxialMember": false
//     },
//     {
//         "Id": 3,
//         "MomentMajor": 0.57,
//         "MomentMinor": 0.5,
//         "ShearMajor": 0.15,
//         "ShearMinor": 0.14,
//         "Axial": 7.57,
//         "IsAxialMember": false
//     },
//     {
//         "Id": 4,
//         "MomentMajor": 0.36,
//         "MomentMinor": -0.36,
//         "ShearMajor": 0.12,
//         "ShearMinor": 0.11,
//         "Axial": 207.41,
//         "IsAxialMember": false
//     },
//     {
//         "Id": 5,
//         "MomentMajor": 3.8,
//         "MomentMinor": -0.04,
//         "ShearMajor": 3.26,
//         "ShearMinor": 0.02,
//         "Axial": 0.06,
//         "IsAxialMember": false
//     }
// ]

const Design = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [parentWindowName, setWindowName] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const updateTeddsData = useTeddsStore((state) => state.updateTeddsData);
    const robotData = useRobotStore((state) => state.robotData);

    const numMembers = robotData.length;
    let totalTimeEstimate = "";
    const timeEstimatePerDesign = 10;
    if (numMembers * timeEstimatePerDesign < 60) {
        totalTimeEstimate = `${numMembers * timeEstimatePerDesign}s`;
    } else {
        totalTimeEstimate = `${
            Math.round(numMembers * timeEstimatePerDesign * 100) / 100 / 60
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
