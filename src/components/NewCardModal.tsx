import { useState } from "react";
import { topics } from "../Data/mock";
import { useCards } from "../context/CardContext";
import type { Flashcard } from "../types/Flashcard";

type Props = {
  onClose: () => void;
};

function NewCardModal({ onClose }: Props) {
  const { addCard } = useCards();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [topicId, setTopicId] = useState(topics[0].id);

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) return;

    const newCard: Flashcard = {
      id: crypto.randomUUID(),
      question,
      answer,
      topicId,
      learned: false,
    };

    addCard(newCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white/90 border-2 border-black rounded-lg shadow-[6px_6px_0px_0px_#000] w-96 p-6 space-y-4">
        <h2 className="text-xl font-bold">New Card</h2>

        <input
          type="text"
          placeholder="Question"
          className="border-2 border-black rounded px-3 py-2 w-full shadow-[3px_3px_0px_0px_#000]"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          type="text"
          placeholder="Answer"
          className="border-2 border-black rounded px-3 py-2 w-full shadow-[3px_3px_0px_0px_#000]"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
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
            className="px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCardModal;
