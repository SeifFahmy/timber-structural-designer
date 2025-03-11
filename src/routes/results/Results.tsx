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
import useAnalyseResults from "../../hooks/useAnalyseResults";
import { useTeddsStore } from "../../hooks/useTeddsStore";

const Results = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const teddsData = useTeddsStore((state) => state.teddsData);
    const memberResults = teddsData.memberData;
    const { overview, barSections } = useAnalyseResults(memberResults);

    const handleRobotUpdate = async () => {
        setButtonDisabled(true);
        try {
            // Call the C# executable via Electron's main process
            // const sectionData = useSectionStore((state) => state.sectionData);
            await (window as any).api.robotUpdate(
                JSON.stringify({
                    MemberSections: barSections,
                    MaterialData: teddsData.materialData,
                })
            );
        } catch (error) {
            setErrorMessage(
                `Something went wrong. Please make sure Robot is open and element IDs have not been changed, then try again. 
                If the problem persists, please contact me through the Contact page.`
            );
        }
        setButtonDisabled(false);
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
                                {overview.map((entry, index) => (
                                    <Text
                                        key={index}
                                        size="md"
                                        p={0}
                                        ta="center"
                                    >
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
                            disabled={buttonDisabled}
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
                    <ResultsTable memberResults={memberResults} />
                </Stack>
            </Stack>
        </Center>
    );
};

export default Results;
