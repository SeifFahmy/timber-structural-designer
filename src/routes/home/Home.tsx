import { Button, Center, Stack, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useRobotStore } from "../../hooks/useRobotStore";
import { Form, useForm } from "@mantine/form";

const Home = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const updateRobotData = useRobotStore((state) => state.updateRobotData);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            caseIds: "",
        },

        validate: {
            caseIds: (value) =>
                /^\s*(\d+|\d+to\d+|\d+to\d+By\d+|all)(\s+(\d+|\d+to\d+|\d+to\d+By\d+|all))*\s*$/.test(
                    value
                )
                    ? null
                    : "Invalid ID format",
        },
    });

    const handleRobotImport = async () => {
        setButtonDisabled(true);
        const caseIds = form.getValues().caseIds;
        try {
            // Call the C# executable via Electron's main process
            const robotModel = await (window as any).api.robotImport(caseIds);
            const robotModelJson = JSON.parse(robotModel);
            console.log(robotModelJson);
            updateRobotData(robotModelJson);
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
                <Form form={form} onSubmit={handleRobotImport}>
                    <TextInput
                        withAsterisk
                        label="Robot case IDs"
                        placeholder="e.g. 1to7By2 or all"
                        key={form.key("caseIds")}
                        {...form.getInputProps("caseIds")}
                        mb="1rem"
                    />
                    <Button
                        type="submit"
                        variant="filled"
                        color="teal"
                        disabled={buttonDisabled}
                        fullWidth
                    >
                        Import Robot Loads
                    </Button>
                </Form>
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
