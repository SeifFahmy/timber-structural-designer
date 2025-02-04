import {
    Center,
    Stack,
    Button,
    Text,
    Title,
    Group,
    SimpleGrid,
    Paper,
    Table,
} from "@mantine/core";
import styles from "./Results.module.css";
import { TeddsData } from "../../hooks/useTeddsStore";
import { useDisclosure } from "@mantine/hooks";
import ResultsTable from "./ResultsTable";

const overviewData = [
    { title: "Max utilisation", content: 0.8 },
    { title: "Design status", content: "PASS" },
    { title: "Material", content: "Glulam" },
    { title: "Max section", content: "360x1000" },
];

const Results = () => {
    const handleRobotUpdate = () => {
        console.log("updated robot");
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
                            bg="rgba(18, 184, 134, 0.4)"
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
