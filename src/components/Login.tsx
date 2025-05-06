// src/components/Login.tsx
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigateURLTo = useNavigate();
  const [signInOrSignUp, setSignInOrSignUp] = useState<"SignIn" | "SignUp">(
    "SignIn"
  );
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    try {
      if (signInOrSignUp === "SignIn") {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Signed in with email/password");
      } else if (signInOrSignUp === "SignUp") {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Account Created Successfully.");
      }
      navigateURLTo("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6 p-6 w-[400px] border rounded-lg shadow-md mx-auto"
    >
      {/* Toggle SignIn / SignUp Buttons */}
      <div className="relative flex h-12 bg-gray-200 rounded-full p-1 mb-6 overflow-hidden">
        {/* Blue sliding pill */}
        <div
          className={`absolute top-1 left-1 h-10 w-1/2 rounded-full transition-transform duration-300 bg-blue-500 z-0 ${
            signInOrSignUp === "SignUp" ? "translate-x-full" : ""
          }`}
        ></div>

        {/* Sign In button */}
        <button
          type="button"
          onClick={() => setSignInOrSignUp("SignIn")}
          className={`flex-1 text-center font-semibold z-10 relative ${
            signInOrSignUp === "SignIn" ? "text-white" : "text-gray-700"
          }`}
          style={{ backgroundColor: "transparent" }}
        >
          Sign In
        </button>

        {/* Sign Up button */}
        <button
          type="button"
          onClick={() => setSignInOrSignUp("SignUp")}
          className={`flex-1 text-center font-semibold z-10 relative ${
            signInOrSignUp === "SignUp" ? "text-white" : "text-gray-700"
          }`}
          style={{ backgroundColor: "transparent" }}
        >
          Sign Up
        </button>
      </div>

      {/* Email Field */}
      <div className="flex items-center justify-between">
        <label htmlFor="email" className="w-24 text-right pr-2 font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="flex-1 border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password Field */}
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="w-24 text-right pr-2 font-medium">
          Password:
        </label>
        <div className="flex-1 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full border px-3 py-2 rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:underline"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide 🚫" : "Show 👁"}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold"
        type="submit"
      >
        {signInOrSignUp === "SignIn" ? "Sign In" : "Create Account"}
      </button>
    </form>
  );
}
