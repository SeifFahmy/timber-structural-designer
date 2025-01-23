import styles from "./Home.module.css";
import { Button, Center, Container, Stack, Text } from "@mantine/core";

const Home = () => {
    return (
        <Center h="100%">
            <Stack className={styles.root}>
                <Text>
                    Import the loads on the timber structure from Robot using the
                    button below to get started.
                </Text>
                <Button>Import Robot Loads</Button>
            </Stack>
        </Center>
    );
};

export default Home;
