import type { Skill } from "./SkillSelector"; // Skill is a type

export type UserProps = {
  correctCount: number;
};

export const skills: Skill[] = [
  { name: "Addition", accuracyLevel: 0.0 },
  { name: "Subtraction", accuracyLevel: 0.0 },
  { name: "Multiplication", accuracyLevel: 0.0 },
  { name: "Division", accuracyLevel: 0.0 },
];

export default function User({ correctCount }: UserProps) {
  const mood = correctCount < 3 ? "😐" : correctCount < 7 ? "😊" : "🤩";

  return (
    <div className="text-4xl mb-4" title={`Correct answers: ${correctCount}`}>
      {mood}
    </div>
  );
}
