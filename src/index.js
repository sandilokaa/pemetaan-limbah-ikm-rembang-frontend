import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import LoginAdmin from "./pages/auth/Login";

const roots = document.getElementById("root");
const root = createRoot(roots);

root.render(
  <Router>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginAdmin />}></Route>
      </Routes>
  </Router>
);