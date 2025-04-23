import { useCallback, useState } from "react";
import ProblemView from "../components/ProblemView";
import {
  generateAdditionProblem,
  generateSubtractionProblem,
  MathProblem,
} from "../utils/problemGenerators";
import User from "../components/User";
import { skills } from "../components/User";
import type { Skill } from "../components/SkillSelector";

function App() {
  const [correctCount, setCorrectCount] = useState(0);
  const [activeSkill, setActiveSkill] = useState<string>("Addition");
  const [usersSkills, setUsersSkills] = useState<Skill[]>(skills);
  const [pendingSkill, setPendingSkill] = useState<string>("Addition");
  //setPendingSkill(activeSkill); // This will be important if/when we use localStorage or backend.

  const handleCorrectAnswer = () => {
    setCorrectCount((prev) => prev + 1);
  };

  const getProblemGenerator = (skill: string): (() => MathProblem) => {
    switch (skill) {
      case "Addition":
        return generateAdditionProblem;
      case "Subtraction":
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
          value={pendingSkill}
          onChange={(e) => {
            setPendingSkill(e.target.value);
          }}
        >
          {usersSkills.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>

        {activeSkill !== pendingSkill && (
          <button
            onClick={() => setActiveSkill(pendingSkill)}
            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
          >
            Change
          </button>
        )}
      </div>
      <ProblemView
        problemType={activeSkill} // This should trigger a re-render if/when the user clicks the button
        generator={() => getProblemGenerator(activeSkill)()}
        onCorrect={handleCorrectAnswer}
      />
      <div className="mt-4">Correct Answers: {correctCount}</div>
      <User correctCount={correctCount} />
    </div>
  );
}

export default App;
