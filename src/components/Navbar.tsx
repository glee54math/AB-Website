// src/components/NavbarWithModal.tsx
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "../components/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
// Next imports below will move to Login.tsx
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";

export default function NavbarWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigateURLTo = useNavigate();

  const navItems = [
    "Home",
    "How It Works",
    "For Parents",
    "For Teachers",
    "Pricing",
  ];

  const handleLogin = () => {
    setIsModalOpen(false);
    navigateURLTo("/dashboard");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.h1
            className="text-2xl font-bold text-blue-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            AutoMATHically Better
          </motion.h1>

          <ul className="hidden md:flex space-x-6 text-sm font-semibold">
            {navItems.map((item, idx) => (
              <li
                key={idx}
                className="text-gray-700 hover:text-orange-500 cursor-pointer transition-colors duration-200"
              >
                {item}
              </li>
            ))}
          </ul>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Sign Up / Sign In
          </Button>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <Dialog.Title className="text-xl font-bold mb-4">
              Sign Up / Sign In
            </Dialog.Title>
            {/* <p className="text-sm text-gray-600 mb-4">
              This modal will contain sign-up and login forms later.
            </p> */}
            <Login />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button
                onClick={handleLogin}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Continue to Dashboard
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
