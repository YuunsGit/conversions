import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Split from "./operations/split/Split.jsx";
import Rotate from "./operations/rotate/Rotate.jsx";
import Convert from "./operations/convert/Convert.jsx";
import Stamp from "./operations/stamp/Stamp.jsx";
import ScrollToTop from "./components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <ScrollToTop />
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
