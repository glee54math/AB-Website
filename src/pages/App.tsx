import { useEffect, useState } from "react";
import ProblemView from "../components/ProblemView";
import {
  generateAdditionProblem,
  generateSubtractionProblem,
  MathProblem,
} from "../utils/problemGenerators";
import User from "../components/User";
import { skills } from "../components/User";
import type { Skill } from "../components/SkillSelector";
import ProgressBar from "../components/ProgressBar";
import fireGif from "../assets/gifs/fire.gif"
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function App() {
  const [correctCount, setCorrectCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [activeSkill, setActiveSkill] = useState<string>("Addition");
  const [usersSkills, setUsersSkills] = useState<Skill[]>(skills);
  const [pendingSkill, setPendingSkill] = useState<string>("Addition");
  //setPendingSkill(activeSkill); // This will be important if/when we use localStorage or backend.
  const baseWidth = 300;
  const baseHeight = 350;
  const [appSize, setAppSize] = useState({width:baseWidth, height:baseHeight})
  
  const scale = Math.min(appSize.width / baseWidth, appSize.height / baseHeight); // Need to think about decoupling? 

  const handleCorrectAnswer = () => {
    setCorrectCount((prev) => prev + 1);
    setStreakCount((prev) => prev + 1);
  };

  const handleIncorrectAnswer = () => {
    setStreakCount(0);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ResizableBox 
        width={appSize.width} 
        height={appSize.height}
        minConstraints={[200,300]} 
        maxConstraints={[400,600]}
        onResizeStop={(e, data) => {
          setAppSize({ width: data.size.width, height: data.size.height });
        }}
        resizeHandles={['se']}
        className="bg-white rounded-xl shadow-xl p-4 overflow-hidden"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${baseWidth}px`,
            height: `${baseHeight}px`,
          }}
        >
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
            onIncorrect={handleIncorrectAnswer}
          />
          <div className="mt-4">
            Correct Answers: {correctCount} &emsp;&emsp; Streak: {streakCount} 
            {streakCount >= 5 && <img src={fireGif} alt="fire" className="h-5 inline-block" />}
          </div>
          <ProgressBar correctCount={correctCount} streakCount={streakCount} />
          <User correctCount={correctCount} />
        </div>
      </ResizableBox>
    </div>
  );
}

export default App;
