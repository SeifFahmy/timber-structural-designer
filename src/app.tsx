import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./routes/home";

const App = () => {
    return (
        <div>
            Navbar
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </HashRouter>
        </div>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
