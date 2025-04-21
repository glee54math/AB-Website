type ProgressBarProps = {
  correctCount: number;
  targetCount?: number; // Optional for leveling/goal features
};

export default function ProgressBar({
  correctCount,
  targetCount = 10,
}: ProgressBarProps) {
  const percentage = Math.min((correctCount / targetCount) * 100, 100);

  return (
    <div className="mb-4">
      <div className="h-4 bg-gray-300 rounded-full">
        <div
          className="h-4 bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm mt-1">
        {correctCount} / {targetCount} correct
      </p>
    </div>
  );
}
