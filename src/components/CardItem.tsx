import type { Flashcard } from "../types/Flashcard";
import { topics } from "../Data/mock";
import { useState } from "react";
import { Edit3, Trash2, CheckCircle } from "lucide-react";

function CardItem({
  card,
  onEdit,
  onDelete,
}: {
  card: Flashcard;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const topic = topics.find((t) => t.id === card.topicId);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(!flipped);
  };

  return (
    <div className="bg-white border-2 border-black rounded-md shadow-[4px_4px_0px_0px_#000] h-48 relative overflow-hidden group">
      <div className="absolute top-2 right-2 flex gap-1 z-10">
        <button
          onClick={handleEdit}
          className="p-1.5 bg-white/90 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded border border-gray-300 shadow-sm transition-all opacity-0 group-hover:opacity-100"
        >
          <Edit3 size={14} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 bg-white/90 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded border border-gray-300 shadow-sm transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div
        onClick={handleFlip}
        className="absolute inset-0 cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500 preserve-3d"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div
            className="absolute inset-0 p-4 flex flex-col justify-between backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div>
              <div className="flex justify-between items-start mb-3 pr-16">
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${topic?.color}`}
                >
                  {topic?.name}
                </span>
                {card.learned && (
                  <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                    <CheckCircle size={12} /> Learned
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-sm leading-tight pr-4">
                {card.question}
              </h3>
            </div>

            <div className="flex justify-center">
              <span className="text-xs bg-gray-100 px-3 py-1.5 rounded border font-medium">
                Click to reveal answer
              </span>
            </div>
          </div>

          <div
            className="absolute inset-0 p-4 flex flex-col justify-between backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div>
              <div className="flex justify-between items-start mb-3 pr-16">
                <span className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded font-medium">
                  Answer
                </span>
                {card.learned && (
                  <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                    <CheckCircle size={12} /> Learned
                  </span>
                )}
              </div>
              <p className="text-sm leading-tight text-gray-700 pr-4">
                {card.answer}
              </p>
            </div>

            <div className="flex justify-center">
              <span className="text-xs bg-gray-100 px-3 py-1.5 rounded border font-medium">
                Click to show question
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
