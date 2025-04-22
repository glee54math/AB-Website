import { useState } from "react";
import ProblemView from "../components/ProblemView";
import {
  generateAdditionProblem,
  generateSubtractionProblem,
  MathProblem,
} from "../utils/problemGenerators";
import Avatar from "../components/Avatar";
import type { AvatarProps } from "../components/Avatar";

function App() {
  const [correctCount, setCorrectCount] = useState(0);
  const [skill, setSkill] = useState<"addition" | "subtraction">("addition");
  const [usersSkills, setUsersSkills] = useState<String[]>([]);
  const handleCorrectAnswer = () => {
    setCorrectCount((prev) => prev + 1);
  };

  const getGenerator = (): (() => MathProblem) => {
    switch (skill) {
      case "addition":
        return generateAdditionProblem;
      case "subtraction":
        return generateSubtractionProblem;
      default:
        return generateAdditionProblem;
    }
  };

  const getHint = (problem: MathProblem) => {
    return problem.hint;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Math Practice App</h1>
      <div className="mb-4">
        <label htmlFor="skill">Choose a skill: </label>
        <select
          id="skill"
          value={skill}
          onChange={(e) =>
            setSkill(e.target.value as "addition" | "subtraction")
          }
        >
          <option value="addition">Addition</option>
          <option value="subtraction">Subtraction</option>
        </select>
      </div>
      <ProblemView generator={getGenerator()} onCorrect={handleCorrectAnswer} />
      <div className="mt-4">Correct Answers: {correctCount}</div>
      {/* <Avatar correctCount={correctCount} skills={}/> */}
    </div>
  );
}

export default App;
