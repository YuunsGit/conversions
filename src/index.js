import React from "react";
import ReactDOM from "react-dom/client";
import { Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Split from "./Split";
import Rotate from "./Rotate";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router>
        <Routes>
            <Route element={<Layout/>}/>
                <Route path="/" element={<Home/>}>
                <Route path="/rotate" element={<Rotate/>}>
                <Route path="/split" element={<Split/>}>
            </Route>
        </Routes>
    </Router>
);