type AvatarProps = {
  correctCount: number;
};

export default function Avatar({ correctCount }: AvatarProps) {
  const mood = correctCount < 3 ? "😐" : correctCount < 7 ? "😊" : "🤩";

  return (
    <div className="text-4xl mb-4" title={`Correct answers: ${correctCount}`}>
      {mood}
    </div>
  );
}
