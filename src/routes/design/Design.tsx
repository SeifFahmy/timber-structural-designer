import { Button, Center, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAVBAR_ROUTES } from "../../components/Navbar/Navbar";
import { useNavbarStore } from "../../hooks/useNavbarStore";
import { useRobotStore } from "../../hooks/useRobotStore";
import { useTeddsStore } from "../../hooks/useTeddsStore";

const Design = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [parentWindowName, setWindowName] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const updateTeddsData = useTeddsStore((state) => state.updateTeddsData);
    const robotData = useRobotStore((state) => state.robotData);
    const updateLatestRoute = useNavbarStore(
        (state) => state.updateLatestRoute
    );
    const navigate = useNavigate();

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

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            deflectionLimit: "",
        },

        validate: {
            deflectionLimit: (value) =>
                /^\s*\d+\s*$/.test(value)
                    ? null
                    : "Invalid deflection limit format",
        },
    });

    useEffect(() => {
        (async () => {
            const name = await (window as any).api.getProcessName();
            setWindowName(name);
        })();
    }, []);

    const handleTeddsDesign = async () => {
        setButtonDisabled(true);
        const deflectionLimit = form.getValues().deflectionLimit;
        try {
            // Call the C# executable via Electron's main process
            const teddsDesign = await (window as any).api.teddsDesign(
                parentWindowName,
                JSON.stringify(robotData),
                deflectionLimit.toString()
            );
            const teddsDesignJson = JSON.parse(teddsDesign);
            updateTeddsData(teddsDesignJson);
            updateLatestRoute(NAVBAR_ROUTES.RESULTS);
            navigate("/results");
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
                    button below, but first, please specify the deflection limit
                    ratio to design to (e.g. span / 250) by writing the
                    denominator in the field below. There are {numMembers}{" "}
                    member(s) to design, so it's expected this will take{" "}
                    {totalTimeEstimate} to complete.
                </Text>
                <form onSubmit={form.onSubmit(() => handleTeddsDesign())}>
                    <TextInput
                        withAsterisk
                        label="Deflection limit"
                        placeholder="e.g. 250"
                        key={form.key("deflectionLimit")}
                        {...form.getInputProps("deflectionLimit")}
                        mb="1rem"
                    />
                    <Button
                        type="submit"
                        variant="filled"
                        color="teal"
                        disabled={buttonDisabled}
                        fullWidth
                    >
                        Design Structure
                    </Button>
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

export default Design;
