export type Topic = { id: string; name: string; color: string };
export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  topicId: string;
  learned: boolean;
};
