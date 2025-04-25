// src/routes.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import App from "./pages/SkillCard";
import Dashboard from "./pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
