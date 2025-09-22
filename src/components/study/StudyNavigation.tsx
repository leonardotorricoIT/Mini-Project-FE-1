import { ChevronLeft, ChevronRight } from "lucide-react";

function StudyNavigation({
  currentIndex,
  totalCards,
  onPrev,
  onNext,
}: {
  currentIndex: number;
  totalCards: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <button
        onClick={onNext}
        disabled={currentIndex >= totalCards - 1}
        className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default StudyNavigation;
