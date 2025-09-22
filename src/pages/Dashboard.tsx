import { useState } from "react";
import { topics } from "../Data/mock";
import NewCardModal from "../components/NewCardModal";
import { useCards } from "../context/CardContext";
import CardItem from "../components/CardItem";
import type { Flashcard } from "../types/Flashcard";
import { StudyMode } from "./StudyMode";
import ProgressBar from "../components/ProgressBar";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

function Dashboard() {
  const { cards, deleteCard } = useCards();
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | "all">("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [deletingCard, setDeletingCard] = useState<Flashcard | null>(null);
  const [studyMode, setStudyMode] = useState(false);

  const filteredCards = cards.filter((card) => {
    const matchesTopic =
      selectedTopic === "all" || card.topicId === selectedTopic;
    const matchesSearch =
      card.question.toLowerCase().includes(search.toLowerCase()) ||
      card.answer.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const handleDeleteCard = () => {
    if (deletingCard) {
      deleteCard(deletingCard.id);
      setDeletingCard(null);
    }
  };

  if (studyMode) {
    return (
      <div className="p-6">
        <StudyMode cards={filteredCards} onExit={() => setStudyMode(false)} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search cards..."
          className="border-2 bg-white border-black rounded-md px-3 py-2 w-full md:w-1/3 shadow-[4px_4px_0px_0px_#000]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border-2 bg-white border-black rounded-md px-3 py-2 shadow-[4px_4px_0px_0px_#000]"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="all">All Topics</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-500 text-white border-2 border-black rounded-md px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
          onClick={() => setShowNewModal(true)}
        >
          + New Card
        </button>

        <button
          className="bg-green-500 text-white border-2 border-black rounded-md px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
          onClick={() => setStudyMode(true)}
          disabled={filteredCards.length === 0}
        >
          Study Mode
        </button>
      </div>

      <ProgressBar cards={cards} />

      {showNewModal && <NewCardModal onClose={() => setShowNewModal(false)} />}

      {editingCard && (
        <NewCardModal
          onClose={() => setEditingCard(null)}
          editCard={editingCard}
        />
      )}

      {deletingCard && (
        <DeleteConfirmModal
          card={deletingCard}
          onClose={() => setDeletingCard(null)}
          onConfirm={handleDeleteCard}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onEdit={() => setEditingCard(card)}
              onDelete={() => setDeletingCard(card)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No cards found</p>
            {cards.length === 0 && (
              <button
                onClick={() => setShowNewModal(true)}
                className="mt-4 bg-blue-500 text-white border-2 border-black rounded-md px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
              >
                Create your first card
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
