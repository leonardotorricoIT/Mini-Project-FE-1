import { useState } from "react";
import { useCards } from "../../context/CardContext";
import type { Flashcard } from "../../types/Flashcard";
import { ChevronLeft, Shuffle } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";
import StudyCard from "./StudyCard";
import StudyNavigation from "./StudyNavigation";

function StudyMode({
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

  const currentCard = studyCards[currentIndex];

  const shuffleDeck = () => {
    setStudyCards([...studyCards].sort(() => Math.random() - 0.5));
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

  const markCard = (learned: boolean) => {
    updateCard(currentCard.id, { learned });
    setStudyCards((prev) =>
      prev.map((card) =>
        card.id === currentCard.id ? { ...card, learned } : card
      )
    );
    setTimeout(() => {
      if (currentIndex < studyCards.length - 1) {
        nextCard();
      }
    }, 1000);
  };

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
      </div>

      <ProgressBar cards={studyCards} />

      <StudyCard
        card={currentCard}
        flipped={flipped}
        onFlip={() => setFlipped(!flipped)}
        onMarkLearned={() => markCard(true)}
        onMarkRevision={() => markCard(false)}
      />
      <div className="text-sm text-gray-600">
        Card {currentIndex + 1} of {studyCards.length}
      </div>
      <StudyNavigation
        currentIndex={currentIndex}
        totalCards={studyCards.length}
        onPrev={prevCard}
        onNext={nextCard}
      />
    </div>
  );
}

export default StudyMode;
