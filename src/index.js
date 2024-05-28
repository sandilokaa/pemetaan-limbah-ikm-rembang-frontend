import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/home/Home";
import LoginAdmin from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Approval from "./pages/dashboard/Approval";

const roots = document.getElementById("root");
const root = createRoot(roots);

root.render(
  <Router>
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginAdmin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/approval" element={<Approval />}></Route>
      </Routes>
    </SnackbarProvider>
  </Router>
);
