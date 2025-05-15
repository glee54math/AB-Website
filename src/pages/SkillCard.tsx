import { useEffect, useState } from "react";
import ProblemView from "../components/ProblemView";
import {
  generateAdditionProblem,
  generateSubtractionProblem,
  generateMultiplicationProblem,
  generateDivisionProblem,
} from "../utils/problemGenerators";
import type { MathProblem } from "../utils/problemGenerators";
import User from "../components/User";
import { skills } from "../components/User";
import type { Skill } from "../components/SkillSelector";
import ProgressBar from "../components/ProgressBar";
import fireGif from "../assets/gifs/fire.gif";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { updateSkillProgress } from "../utils/writeUserData";

type SkillCardProps = {
  skillName: string;
  skillData: {
    numberCorrect: number;
    totalAttempted: number;
  };
  userID: string;
};

export default function SkillCard({
  skillName,
  skillData,
  userID,
}: SkillCardProps) {
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [activeSkill, setActiveSkill] = useState<string>(skillName);
  const [usersSkills, setUsersSkills] = useState<Skill[]>(skills);
  const [pendingSkill, setPendingSkill] = useState<string>(skillName);
  const [numCorrectThisSession, setNumCorrectThisSession] = useState<{
    skill: Skill;
    count: number;
  }>({
    skill: skills[0],
    count: 0,
  });
  const baseWidth = 300;
  const baseHeight = 350;
  const [appSize, setAppSize] = useState({
    width: baseWidth,
    height: baseHeight,
  });

  const scale = Math.min(
    appSize.width / baseWidth,
    appSize.height / baseHeight
  ); // Need to think about decoupling?

  const handleCorrectAnswer = () => {
    setCorrectCount((prev) => prev + 1); // This may be redundant, but if I remove, then I need to make sure I remove it elsewhere.
    setStreakCount((prev) => prev + 1);
    setNumCorrectThisSession((prev) => ({
      ...prev,
      count: prev.count + 1,
    })); // add to number of correct answers. Need to make sure to send to database later. Need better place. For testing now, it's fine.
    updateSkillProgress(
      userID,
      activeSkill,
      numCorrectThisSession.count,
      correctCount + incorrectCount
    );
    // session(skill).correctCount++
  };

  const handleIncorrectAnswer = () => {
    setIncorrectCount((prev) => prev + 1);
    setStreakCount(0);
  };

  const getProblemGenerator = (skill: string): (() => MathProblem) => {
    switch (skill) {
      case "Addition":
        return generateAdditionProblem;
      case "Subtraction":
        return generateSubtractionProblem;
      case "Multiplication":
        return generateMultiplicationProblem;
      case "Division":
        return generateDivisionProblem;
      default:
        return generateAdditionProblem;
    }
  };

  const getHint = (problem: MathProblem) => {
    return problem.hint;
  };

  const styles = {
    card: {
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ResizableBox
        width={appSize.width}
        height={appSize.height}
        minConstraints={[200, 300]}
        maxConstraints={[400, 600]}
        onResizeStop={(e, data) => {
          setAppSize({ width: data.size.width, height: data.size.height });
        }}
        resizeHandles={["se"]}
        className="bg-white rounded-xl shadow-xl p-4 overflow-hidden"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${baseWidth}px`,
            height: `${baseHeight}px`,
          }}
        >
          <h1 className="text-xl font-bold mb-2">{activeSkill}</h1>
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
            onIncorrect={handleIncorrectAnswer}
          />
          <div className="mt-4">
            Correct Answers: {correctCount} &emsp;&emsp; Streak: {streakCount}
            {streakCount >= 5 && (
              <img src={fireGif} alt="fire" className="h-5 inline-block" />
            )}
          </div>
          <ProgressBar correctCount={correctCount} streakCount={streakCount} />
          <User correctCount={correctCount} />
        </div>
      </ResizableBox>
    </div>
  );
}
