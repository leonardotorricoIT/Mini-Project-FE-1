import { useState } from "react";
import { useCards } from "../context/CardContext";
import type { Flashcard } from "../types/Flashcard";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
  XCircle,
} from "lucide-react";
import ProgressBar from "../components/ProgressBar";
import { topics } from "../Data/mock";

export function StudyMode({
  cards,
  onExit,
}: {
  cards: Flashcard[];
  onExit: () => void;
}) {
  const { updateCard } = useCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [studyCards, setStudyCards] = useState(cards);
  const [sessionStarted, setSessionStarted] = useState(false);

  const currentCard = studyCards[currentIndex];

  const shuffleDeck = () => {
    const shuffled = [...studyCards].sort(() => Math.random() - 0.5);
    setStudyCards(shuffled);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const nextCard = () => {
    if (currentIndex < studyCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setFlipped(false);
    }
  };

  const markAsLearned = () => {
    updateCard(currentCard.id, { learned: true });
    setStudyCards((prev) =>
      prev.map((card) =>
        card.id === currentCard.id ? { ...card, learned: true } : card
      )
    );
    setTimeout(() => {
      if (currentIndex < studyCards.length - 1) {
        nextCard();
      }
    }, 1000);
  };

  const markAsNeedRevision = () => {
    updateCard(currentCard.id, { learned: false });
    setStudyCards((prev) =>
      prev.map((card) =>
        card.id === currentCard.id ? { ...card, learned: false } : card
      )
    );
    setTimeout(() => {
      if (currentIndex < studyCards.length - 1) {
        nextCard();
      }
    }, 1000);
  };

  if (studyCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
        <h2 className="text-2xl font-bold">No cards to study</h2>
        <button
          onClick={onExit}
          className="bg-blue-500 text-white border-2 border-black rounded-md px-6 py-2 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
        >
          <ChevronLeft size={16} />
          Exit Study Mode
        </button>

        {!sessionStarted && (
          <button
            onClick={() => {
              shuffleDeck();
              setSessionStarted(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
          >
            <Shuffle size={16} />
            Shuffle Deck
          </button>
        )}

        <div className="text-sm text-gray-600">
          Card {currentIndex + 1} of {studyCards.length}
        </div>
      </div>

      <ProgressBar cards={studyCards} />

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
                <span
                  className={`px-3 py-1 rounded font-medium ${
                    topics.find((t) => t.id === currentCard.topicId)?.color
                  }`}
                >
                  {topics.find((t) => t.id === currentCard.topicId)?.name}
                </span>
                {currentCard.learned && (
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <CheckCircle size={16} /> Learned
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold leading-relaxed">
                {currentCard.question}
              </h2>
            </div>

            <button
              onClick={() => setFlipped(true)}
              className="self-center bg-blue-500 text-white px-6 py-3 rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
            >
              Show Answer
            </button>
          </div>

          <div
            className="absolute inset-0 p-8 flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded font-medium">
                  Answer
                </span>
                {currentCard.learned && (
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <CheckCircle size={16} /> Learned
                  </span>
                )}
              </div>
              <p className="text-lg leading-relaxed text-gray-700">
                {currentCard.answer}
              </p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={markAsNeedRevision}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
              >
                <XCircle size={16} />
                Need Revision
              </button>
              <button
                onClick={() => setFlipped(false)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
              >
                <RotateCcw size={16} />
                Back
              </button>
              <button
                onClick={markAsLearned}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
              >
                <CheckCircle size={16} />
                Learned
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <button
          onClick={nextCard}
          disabled={currentIndex >= studyCards.length - 1}
          className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
