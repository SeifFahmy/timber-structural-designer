import "@mantine/charts/styles.layer.css";
import "@mantine/core/styles.layer.css";
import '@mantine/tiptap/styles.css';

import { Container, MantineProvider, Stack } from "@mantine/core";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./routes/home";
import Navbar from "./components/Navbar/Navbar";
import Design from "./routes/design";
import Results from "./routes/results";
import Contact from "./routes/contact";

const App = () => {
    return (
        <MantineProvider>
            <Stack h="100vh" p="2rem" gap={0} mx="auto">
                <HashRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/design" element={<Design />} />
                        <Route path="/results" element={<Results />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </HashRouter>
            </Stack>
        </MantineProvider>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
