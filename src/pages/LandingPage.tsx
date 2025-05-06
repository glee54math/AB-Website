// src/pages/LandingPage.tsx
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />

      {/* Real landing content here */}
      <section className="border border-red-500 px-8 py-20 text-center text-gray-800 w-full">
        <h2 className="text-4xl text-center font-bold mb-4">
          Make Math Fun, Fast, and Rewarding 🎉
        </h2>
        <p className="text-lg mb-6">
          AutoMATHically Better helps K–12 students master math with gamified
          AI-tailored practice, instant feedback, and progress tracking.
        </p>
        <a
          href="#features"
          className="text-orange-500 font-semibold underline hover:text-orange-700 transition"
        >
          Learn more ↓
        </a>
      </section>

      {/* Features */}
      <section id="features" className="mt-16 px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-100 p-6 rounded-xl shadow">
            🎯 AI-Powered Hints
          </div>
          <div className="bg-green-100 p-6 rounded-xl shadow">
            🏆 Gamified Rewards
          </div>
          <div className="bg-yellow-100 p-6 rounded-xl shadow">
            📊 Progress Reports
          </div>
        </div>
      </section>
    </div>
  );
}
