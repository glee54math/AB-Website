import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return <div className="text-center mt-10">Loading...</div>; // or a spinner
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard userID={user.uid} /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
