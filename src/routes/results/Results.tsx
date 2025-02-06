import {
    Button,
    Center,
    Group,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useState } from "react";
import styles from "./Results.module.css";
import ResultsTable from "./ResultsTable";

const overviewData = [
    { title: "Max utilisation", content: 0.8 },
    { title: "Design status", content: "PASS" },
    { title: "Material", content: "Glulam" },
    { title: "Max section", content: "360x1000" },
];

const sectionData = {
    "200x1000": [1, 2, 3, 4, 5],
};

const Results = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleRobotUpdate = async () => {
        try {
            // Call the C# executable via Electron's main process
            // const sectionData = useSectionStore((state) => state.sectionData);
            await (window as any).api.robotUpdate(JSON.stringify(sectionData));
        } catch (error) {
            setErrorMessage(
                `Something went wrong. Please make sure Robot is open and element IDs have not been changed, then try again. 
                If the problem persists, please contact me through the Contact page.`
            );
        }
    };

    return (
        <Center h="100%">
            <Stack className="mainContentContainer">
                <Stack w="100%" gap="0.5rem">
                    <Title order={2}>Overview</Title>
                    <Text>
                        The design results are summarised below. To update the
                        Robot model with the new section sizes, click the button
                        on the right.
                    </Text>
                    <Group gap="2rem" wrap="nowrap" justify="flex-start">
                        <Paper
                            p="md"
                            shadow="lg"
                            bg="var(--teal-background)"
                            flex="1 1 0"
                        >
                            <SimpleGrid cols={2} spacing="xs">
                                {overviewData.map((entry, index) => (
                                    <Text key={index} size="md" p={0}>
                                        <Text span fw={600}>
                                            {entry.title}:
                                        </Text>
                                        <Text span fs="italic">
                                            {" " + entry.content}
                                        </Text>
                                    </Text>
                                ))}
                            </SimpleGrid>
                        </Paper>
                        <div className={styles.verticalDivider} />
                        <Button
                            onClick={handleRobotUpdate}
                            variant="filled"
                            color="teal"
                            style={{
                                alignSelf: "center",
                            }}
                        >
                            Update Robot
                        </Button>
                    </Group>
                    {errorMessage && (
                        <Text c="red" fw={700}>
                            {errorMessage}
                        </Text>
                    )}
                </Stack>
                <Stack w="100%" gap="0.5rem">
                    <Title order={2}>Breakdown</Title>
                    <Text>
                        A breakdown of the design results for all members is
                        given below. Click on a member to inspect its results in
                        more detail.
                    </Text>
                    <ResultsTable />
                </Stack>
            </Stack>
        </Center>
    );
};

export default Results;
function useSectionStore(arg0: (state: any) => any) {
    throw new Error("Function not implemented.");
}
