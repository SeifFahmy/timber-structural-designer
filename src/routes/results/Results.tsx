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

const overviewData = [
    { title: "Max utilisation", content: 0.8 },
    { title: "Design status", content: "PASS" },
    { title: "Material", content: "Glulam" },
    { title: "Max section", content: "360x1000" },
];

// id: number;
// width: number;
// depth: number;
// result: number;
// designMessage: string;
// util: number;
// material: string;
// strength: string;
// outputRtf: string;

const elements = [
    { id: 6, section: 12.011, result: "C", util: "Carbon" },
    { id: 7, section: 14.007, result: "N", util: "Nitrogen" },
    { id: 39, section: 88.906, result: "Y", util: "Yttrium" },
    { id: 56, section: 137.33, result: "Ba", util: "Barium" },
    { id: 58, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 58, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 58, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 58, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 58, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 58, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 58, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 58, section: 140.12, result: "Ce", util: "Cerium" },
];

const Results = () => {
    const handleRobotUpdate = () => {
        console.log("updated robot");
    };

    const showMemberModal = (data: any) => {
        console.log("showed modal");
    };

    const rows = elements.map((member) => (
        <Table.Tr key={member.id} onClick={() => showMemberModal(member)}>
            <Table.Td>{member.id}</Table.Td>
            <Table.Td>{member.section}</Table.Td>
            <Table.Td>{member.result}</Table.Td>
            <Table.Td>{member.util}</Table.Td>
        </Table.Tr>
    ));

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
                    <Table.ScrollContainer minWidth={500} h="13rem">
                        <Table stickyHeader>
                            <Table.Thead bg="var(--mantine-color-gray-2)">
                                <Table.Tr className={styles.tableHeader}>
                                    <Table.Th
                                        style={{
                                            borderRadius:
                                                "var(--mantine-radius-md) 0 0 0",
                                        }}
                                    >
                                        ID
                                    </Table.Th>
                                    <Table.Th>Section</Table.Th>
                                    <Table.Th>Result</Table.Th>
                                    <Table.Th
                                        style={{
                                            borderRadius:
                                                "0 var(--mantine-radius-md) 0 0",
                                        }}
                                    >
                                        Utilisation
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Stack>
            </Stack>
        </Center>
    );
};

export default Results;
