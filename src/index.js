import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Split from "./Split/Split";
import Rotate from "./Rotate";
import Convert from "./Convert";
import Stamp from "./Stamp";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <HashRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/split" element={<Split />} />
                <Route path="/rotate" element={<Rotate />} />
                <Route path="/stamp" element={<Stamp />} />
                <Route path="/convert" element={<Convert />} />
            </Route>
        </Routes>
    </HashRouter>
);
