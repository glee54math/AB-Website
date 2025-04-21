// src/components/SkillSelector.tsx

import React from "react";

interface SkillSelectorProps {
  skills: string[];
  selectedSkill: string;
  onSelectSkill: (skill: string) => void;
}

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
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SkillSelector;
