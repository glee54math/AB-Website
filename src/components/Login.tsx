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
    <form onSubmit={handleLogin} className="space-y-4 p-4">
      <div className="relative flex w-64 h-12 bg-gray-200 rounded-full p-1 mb-6">
        <div // This creates the blue sliding button
          className={`absolute top-1 left-1 h-10 w-1/2 bg-blue-500 rounded-full transition-all duration-300 ${
            signInOrSignUp === "SignUp" ? "translate-x-full" : ""
          }`}
        ></div>
        <button
          onClick={() => setSignInOrSignUp("SignIn")}
          className={`flex-1 z-10 text-center font-semibold ${
            signInOrSignUp === "SignIn" ? "text-white" : "text-gray-700"
          }`}
          value={signInOrSignUp}
        >
          Sign In
        </button>
        <button
          onClick={() => setSignInOrSignUp("SignUp")}
          className={`flex-1 z-10 text-center font-semibold ${
            signInOrSignUp === "SignUp" ? "text-white" : "text-gray-700"
          }`}
          value={signInOrSignUp}
        >
          Sign Up
        </button>
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          className="border px-2 py-1 rounded"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          className="border px-2 py-1 rounded"
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="text-sm text-blue-500 hover:underline mt-1"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? " Hide 🚫" : " Show 👁"}
        </button>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        type="submit"
        value={signInOrSignUp === "SignIn" ? "Sign In" : "Create Account"}
      >
        {signInOrSignUp === "SignIn" ? "Sign In" : "Create Account"}
      </button>
    </form>
  );
}
