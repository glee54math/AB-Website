import { useState, useRef } from "react";
import { MathProblem } from "../utils/problemGenerators";

type ProblemViewProps = {
  generator: () => MathProblem;
  onCorrect: () => void;
};

export default function ProblemView({
  generator,
  onCorrect,
}: ProblemViewProps) {
  const [problem, setProblem] = useState<MathProblem>(generator());
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkAnswer = () => {
    if (userAnswer.trim() === "") return; // do nothing when it's empty.

    setHasSubmitted(true); // This means that the user's answer is not empty
    if (userAnswer.trim() === problem.answer.toString()) {
      setIsWrong(false);
      onCorrect(); // This function updates the total number of correct answers.

      // ✅ Clear red/green border and animation
      // I think I can remove this below.
      if (inputRef.current) {
        inputRef.current.classList.remove("border-red-500", "animate-shake");
        inputRef.current.classList.add("border-green-500");
      }

      // Move on to next problem or logic
      setTimeout(() => {
        setProblem(generator());
        setUserAnswer(""); // clear input
        if (inputRef.current) {
          inputRef.current.classList.remove("border-green-500");
        }
        setHasSubmitted(false);
      }, 1250); // 1.25 sec
    } else {
      setIsWrong(true);
    }
  };

  const handleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div>
      {/* Displays the Problem */}
      <p className="text-lg mb-2">{problem.question}</p>
      {/* Displays the TextBox */}
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
        className={`border-2 rounded p-2 w-24 text-center text-lg transition-all 
          ${
            isWrong
              ? "border-red-500 animate-shake"
              : hasSubmitted
              ? "border-green-500"
              : "border-gray-300"
          }`}
      />
      {!isWrong && hasSubmitted ? "✅" : !hasSubmitted ? "" : "❌"}

      {/* Displays the Get Hint */}
      <button onClick={handleHint} className="ml-2 border px-2 py-1 rounded">
        {showHint ? "Hide Hint" : "Get Hint"}
      </button>
      {/* Displays the Submit Button */}
      <button
        onClick={checkAnswer}
        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
      >
        Submit
      </button>
      {showHint && (
        <p className="mt-2 text-sm text-gray-600 italic">
          Hint: {problem.hint}
        </p>
      )}
    </div>
  );
}
