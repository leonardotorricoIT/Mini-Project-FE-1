import type { Flashcard } from "../types/Flashcard";
import { topics } from "../Data/mock";

type Props = {
  card: Flashcard;
};

function CardItem({ card }: Props) {
  const topic = topics.find((t) => t.id === card.topicId);

  return (
    <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm px-2 py-1 rounded ${topic?.color}`}>
          {topic?.name}
        </span>
        {card.learned && (
          <span className="text-xs text-green-600 font-bold">✔ Learned</span>
        )}
      </div>

      <h3 className="font-semibold">{card.question}</h3>
      <p className="text-gray-600 text-sm">{card.answer}</p>
    </div>
  );
}

export default CardItem;
