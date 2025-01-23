import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import { Container, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "@mantine/charts/styles.layer.css";

import Home from "./routes/home";

const App = () => {
    return (
        <MantineProvider>
            <Container h="100%">
                <HashRouter>
                    Navbar
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </HashRouter>
            </Container>
        </MantineProvider>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
