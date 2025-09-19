import { useState } from "react";
import { topics } from "../Data/mock";
import NewCardModal from "../components/NewCardModal";
import { useCards } from "../context/CardContext";
import CardItem from "../components/CardItem";

function Dashboard() {
  const { cards } = useCards();
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | "all">("all");
  const [showModal, setShowModal] = useState(false);

  const filteredCards = cards.filter((card) => {
    const matchesTopic =
      selectedTopic === "all" || card.topicId === selectedTopic;
    const matchesSearch =
      card.question.toLowerCase().includes(search.toLowerCase()) ||
      card.answer.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });

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
          className="bg-retro-blue text-white border-2 border-black rounded-md px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
          onClick={() => setShowModal(true)}
        >
          + New Card
        </button>

        <a className="bg-retro-green text-white border-2 border-black rounded-md px-4 py-2 text-center shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
          Study Mode
        </a>
      </div>

      {showModal && <NewCardModal onClose={() => setShowModal(false)} />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border-2 border-black rounded-md p-4 shadow-[4px_4px_0px_0px_#000]"
            >
              <CardItem card={card} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No cards found</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
