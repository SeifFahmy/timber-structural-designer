import { Button, Center, Group, Stack, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useRobotStore } from "../../hooks/useRobotStore";
import { Form, useForm } from "@mantine/form";
import { useNavbarStore } from "../../hooks/useNavbarStore";
import { useNavigate } from "react-router-dom";
import { NAVBARINDICES } from "../../components/Navbar/Navbar";

const Home = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const updateRobotData = useRobotStore((state) => state.updateRobotData);
    const updateLatestRoute = useNavbarStore(
        (state) => state.updateLatestRoute
    );
    const navigate = useNavigate();
    const robotCaseIdValidation = (value: string) =>
        /^\s*(\d+|\d+to\d+|\d+to\d+By\d+|all)(\s+(\d+|\d+to\d+|\d+to\d+By\d+|all))*\s*$/.test(
            value
        )
            ? null
            : "Invalid ID format";

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            ulsCaseIds: "",
            slsCaseIds: "",
        },

        validate: {
            ulsCaseIds: (value) => robotCaseIdValidation(value),
            slsCaseIds: (value) => robotCaseIdValidation(value),
        },
    });

    const handleRobotImport = async () => {
        setButtonDisabled(true);
        const ulsCaseIds = form.getValues().ulsCaseIds;
        const slsCaseIds = form.getValues().slsCaseIds;
        try {
            // Call the C# executable via Electron's main process
            const robotModel = await (window as any).api.robotImport(
                ulsCaseIds,
                slsCaseIds
            );
            const robotModelJson = JSON.parse(robotModel);
            updateRobotData(robotModelJson);
            updateLatestRoute(NAVBARINDICES.DESIGN);
            navigate("/design");
        } catch (error) {
            setErrorMessage(
                `Something went wrong. Please make sure Robot is open and contains timber elements, then try again.
                If the problem persists, please contact me through the Contact page.`
            );
        }
        setButtonDisabled(false);
    };

    return (
        <Center h="100%">
            <Stack className="mainContentContainer" gap="0">
                <Text>
                    Import the loads on the timber structure from Robot using
                    the button below to get started. Please specify which cases
                    you want to deisgn for, or just write "all" if you want to
                    consider all cases.
                </Text>
                <form onSubmit={form.onSubmit(() => handleRobotImport())}>
                    <Stack gap={0} align="center">
                        <Group pt="md" gap="xl" mb="1rem">
                            <TextInput
                                withAsterisk
                                label="Robot ULS case IDs"
                                placeholder="e.g. 1to7By2 or all"
                                key={form.key("ulsCaseIds")}
                                {...form.getInputProps("ulsCaseIds")}
                            />
                            <TextInput
                                withAsterisk
                                label="Robot SLS case IDs"
                                placeholder="e.g. 1to7By2 or all"
                                key={form.key("slsCaseIds")}
                                {...form.getInputProps("slsCaseIds")}
                            />
                        </Group>
                        <Button
                            type="submit"
                            variant="filled"
                            color="teal"
                            disabled={buttonDisabled}
                        >
                            Import Robot Loads
                        </Button>
                    </Stack>
                </form>
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
