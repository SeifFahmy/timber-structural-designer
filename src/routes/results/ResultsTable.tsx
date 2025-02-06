import { useDisclosure } from "@mantine/hooks";
import {
    Modal,
    Button,
    ScrollArea,
    Text,
    Table,
    Group,
    FocusTrap,
    Paper,
    SimpleGrid,
} from "@mantine/core";
import { TeddsData, useTeddsStore } from "../../hooks/useTeddsStore";
import styles from "./ResultsTable.module.css";

const ResultsTable = ({ memberResults }: { memberResults: TeddsData[] }) => {
    const TableRow = ({ member }: { member: TeddsData }) => {
        const [opened, { open, close }] = useDisclosure(false);
        const memberData = [
            { title: "Utilisation", content: member.util },
            { title: "Design status", content: member.result },
            { title: "Material", content: member.material },
            { title: "Section", content: member.section },
        ];

        return (
            <>
                <Modal
                    opened={opened}
                    onClose={close}
                    title={`Member ${member.id} Design Details`}
                    centered
                    size="lg"
                    scrollAreaComponent={ScrollArea.Autosize}
                    overlayProps={{
                        backgroundOpacity: 0.4,
                        blur: 4,
                    }}
                    classNames={{
                        content: styles.modal,
                        header: `${styles.modal} ${styles.modalHeader}`,
                    }}
                    styles={{ close: { color: "var(--mantine-color-teal-8)" } }}
                >
                    <FocusTrap.InitialFocus />
                    <Group
                        gap="2rem"
                        wrap="nowrap"
                        justify="flex-start"
                        pb="1rem"
                    >
                        <Text flex="1 1 0" ta="justify">
                            The Tedds calc carried out on this member is
                            presented below.
                        </Text>
                        <div className={styles.verticalDivider} />
                        <Button
                            onClick={() => console.log("saved pdf")}
                            variant="filled"
                            color="teal"
                            style={{
                                alignSelf: "center",
                            }}
                        >
                            Save as PDF
                        </Button>
                    </Group>
                    <Paper
                        mb="1.5rem"
                        p="md"
                        shadow="md"
                        bg="var(--teal-background)"
                        flex="1 1 0"
                    >
                        <SimpleGrid cols={2} spacing="xs">
                            {memberData.map((entry, index) => (
                                <Text key={index} size="md" p={0} ta="center">
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
                    <div
                        dangerouslySetInnerHTML={{ __html: member.outputHtml }}
                        style={{ color: "black" }}
                    />
                </Modal>

                <Table.Tr onClick={open} className={styles.tableRow}>
                    <Table.Td>{member.id}</Table.Td>
                    <Table.Td>{member.section}</Table.Td>
                    <Table.Td>{member.result}</Table.Td>
                    <Table.Td>{member.util}</Table.Td>
                </Table.Tr>
            </>
        );
    };

    return (
        <>
            <Table.ScrollContainer minWidth={500} h="13rem">
                <Table stickyHeader ta="center">
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
                    <Table.Tbody>
                        {memberResults.map((member) => (
                            <TableRow key={member.id} member={member} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};

export default ResultsTable;
