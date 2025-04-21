// src/routes.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import App from "./pages/App";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<App />} />
    </Routes>
  );
}
