import type { Flashcard } from "../types/Flashcard";

function ProgressBar({ cards }: { cards: Flashcard[] }) {
  const learnedCount = cards.filter((card) => card.learned).length;
  const total = cards.length;
  const percentage = total > 0 ? Math.round((learnedCount / total) * 100) : 0;

  return (
    <div className="bg-white border-2 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_#000]">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Study Progress</span>
        <span className="text-sm text-gray-600">
          {learnedCount}/{total} cards learned
        </span>
      </div>
      <div className="w-full bg-gray-200 border border-black rounded-full h-4">
        <div
          className="bg-green-500 h-full rounded-full border-r border-black transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-center mt-1 text-sm font-medium">
        {percentage}% Complete
      </div>
    </div>
  );
}

export default ProgressBar;
