import { topics } from "../../Data/mock";

function TopicBadge({ topicId }: { topicId: string }) {
  const topic = topics.find((t) => t.id === topicId);
  return (
    <span className={`text-xs px-2 py-1 rounded font-medium ${topic?.color}`}>
      {topic?.name}
    </span>
  );
}

export default TopicBadge;
