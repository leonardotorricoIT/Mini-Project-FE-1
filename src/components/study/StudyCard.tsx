import { CheckCircle, RotateCcw, XCircle } from "lucide-react";
import type { Flashcard } from "../../types/Flashcard";
import LearnedBadge from "../ui/LearnedBadge";
import TopicBadge from "../ui/TopicBadge";

function StudyCard({
  card,
  flipped,
  onFlip,
  onMarkLearned,
  onMarkRevision,
}: {
  card: Flashcard;
  flipped: boolean;
  onFlip: () => void;
  onMarkLearned: () => void;
  onMarkRevision: () => void;
}) {
  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] h-80 relative overflow-hidden">
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 p-8 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <TopicBadge topicId={card.topicId} />
              {card.learned && <LearnedBadge size={16} />}
            </div>
            <h2 className="text-xl font-semibold leading-relaxed">
              {card.question}
            </h2>
          </div>

          <button
            onClick={onFlip}
            className="self-center bg-blue-500 text-white px-6 py-3 rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
          >
            Show Answer
          </button>
        </div>

        <div
          className="absolute inset-0 p-8 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded font-medium">
                Answer
              </span>
              {card.learned && <LearnedBadge size={16} />}
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              {card.answer}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={onMarkRevision}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
            >
              <XCircle size={16} />
              Need Revision
            </button>
            <button
              onClick={() => onFlip()}
              className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
            >
              <RotateCcw size={16} />
              Back
            </button>
            <button
              onClick={onMarkLearned}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
            >
              <CheckCircle size={16} />
              Learned
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
