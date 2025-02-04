import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, ScrollArea, Text, Table } from "@mantine/core";
import { TeddsData } from "../../hooks/useTeddsStore";
import styles from "./ResultsTable.module.css";

// id: number;
// width: number;
// depth: number;
// result: number;
// designMessage: string;
// util: number;
// material: string;
// strength: string;
// outputRtf: string;

const members = [
    { id: 1, section: 12.011, result: "C", util: "Carbon" },
    { id: 2, section: 14.007, result: "N", util: "Nitrogen" },
    { id: 3, section: 88.906, result: "Y", util: "Yttrium" },
    { id: 4, section: 137.33, result: "Ba", util: "Barium" },
    { id: 5, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 6, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 7, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 8, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 9, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 10, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 11, section: 140.12, result: "Ce", util: "Cerium" },
    { id: 12, section: 140.12, result: "Ce", util: "Cerium" },
];

const ResultsTable = () => {
    const TableRow = ({ member }: { member: any }) => {
        const [opened, { open, close }] = useDisclosure(false);
        return (
            <>
                <Modal
                    key={member.id + 10000}
                    opened={opened}
                    onClose={close}
                    title={`Breakdown of Member ${member.id}`}
                    centered
                    size="lg"
                    scrollAreaComponent={ScrollArea.Autosize}
                    overlayProps={{
                        backgroundOpacity: 0.4,
                        blur: 4,
                    }}
                >
                    <Text>{member.id}</Text>
                </Modal>

                <Table.Tr
                    key={member.id}
                    onClick={open}
                    className={styles.tableRow}
                >
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
                    <Table.Tbody>
                        {members.map((member) => (
                            <TableRow member={member} />
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};

export default ResultsTable;
