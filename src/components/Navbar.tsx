// src/components/NavbarWithModal.tsx
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "../components/button";
import { motion } from "framer-motion";
import Login from "./Login";

export default function NavbarWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    "Home",
    "How It Works",
    "For Parents",
    "For Teachers",
    "Pricing",
  ];

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
      {/* Spacer for under fixed navbar */}
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
            <Login />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
