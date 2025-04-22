import { useState } from "react";
import type { Skill } from "./SkillSelector"; // Skill is a type
import SkillSelector from "./SkillSelector"; // SkillSelector is the JSX component

export type AvatarProps = {
  correctCount: number;
  skills: Skill[];
};

export default function Avatar({ correctCount, skills }: AvatarProps) {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]?.name || "");
  const mood = correctCount < 3 ? "😐" : correctCount < 7 ? "😊" : "🤩";

  return (
    <div className="text-4xl mb-4" title={`Correct answers: ${correctCount}`}>
      {mood}
      <SkillSelector
        skills={skills}
        selectedSkill={selectedSkill}
        onSelectSkill={setSelectedSkill}
      />
    </div>
  );
}
