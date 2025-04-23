// src/components/SkillSelector.tsx

import React from "react";
import ProgressBar from "./ProgressBar";

interface SkillSelectorProps {
  skills: Skill[];
  // progress: ProgressBar;
  selectedSkill: string;
  onSelectSkill: (skill: string) => void;
}

export type Skill = {
  name: string;
  accuracyLevel: number;
};

const SkillSelector: React.FC<SkillSelectorProps> = ({
  skills,
  selectedSkill,
  onSelectSkill,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Choose a Skill:</label>
      <select
        value={selectedSkill}
        onChange={(e) => onSelectSkill(e.target.value)}
        className="border rounded p-2"
      >
        {skills.map((skill) => (
          <option key={skill.name} value={skill.name}>
            {skill.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SkillSelector;
