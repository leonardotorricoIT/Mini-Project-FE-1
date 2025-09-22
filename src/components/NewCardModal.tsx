import { useState } from "react";
import { topics } from "../Data/mock";
import { useCards } from "../context/CardContext";
import type { Flashcard } from "../types/Flashcard";

function NewCardModal({
  onClose,
  editCard,
}: {
  onClose: () => void;
  editCard?: Flashcard;
}) {
  const { addCard, updateCard } = useCards();
  const [question, setQuestion] = useState(editCard?.question || "");
  const [answer, setAnswer] = useState(editCard?.answer || "");
  const [topicId, setTopicId] = useState(editCard?.topicId || topics[0].id);

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) return;

    if (editCard) {
      updateCard(editCard.id, {
        question: question.trim(),
        answer: answer.trim(),
        topicId,
      });
    } else {
      const newCard: Flashcard = {
        id: crypto.randomUUID(),
        question: question.trim(),
        answer: answer.trim(),
        topicId,
        learned: false,
      };
      addCard(newCard);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] w-96 p-6 space-y-4">
        <h2 className="text-xl font-bold">
          {editCard ? "Edit Card" : "New Card"}
        </h2>

        <input
          type="text"
          placeholder="Question"
          className="border-2 border-black rounded px-3 py-2 w-full shadow-[3px_3px_0px_0px_#000]"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <textarea
          placeholder="Answer"
          className="border-2 border-black rounded px-3 py-2 w-full h-24 shadow-[3px_3px_0px_0px_#000] resize-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />

        <select
          className="border-2 border-black rounded px-3 py-2 w-full shadow-[3px_3px_0px_0px_#000]"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
        >
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!question.trim() || !answer.trim()}
            className="px-4 py-2 bg-blue-500 text-white border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCardModal;
