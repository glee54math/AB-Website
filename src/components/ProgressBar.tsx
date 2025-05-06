type ProgressBarProps = {
  correctCount: number;
  streakCount: number;
  targetCount?: number; // Optional for leveling/goal features
};

export default function ProgressBar({
  correctCount,
  streakCount,
  targetCount = 10,
}: ProgressBarProps) {
  const percentage = Math.min((correctCount / targetCount) * 100, 100);
  const streakPercentage = 0;

  return (
    <div className="mb-4">
      <div className="h-4 w-64 bg-gray-300 rounded-full">
        <div
          className="h-4 bg-green-500 rounded-full transition-all duration-300 w-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm mt-1">
        {correctCount} / {targetCount} correct
      </p>
    </div>
  );
}
